// Import Firebase and Node.js fs modules
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import fs from "fs";
import path from "path";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAewUCpflDxuwVARZk3HHnweL9kQgBQVw0",
  authDomain: "project-bf1c7.firebaseapp.com",
  databaseURL: "https://project-bf1c7-default-rtdb.firebaseio.com",
  projectId: "project-bf1c7",
  storageBucket: "project-bf1c7.firebasestorage.app",
  messagingSenderId: "419482502760",
  appId: "1:419482502760:web:526007c67f8a1d8c0adddd",
  measurementId: "G-SQZRQ77M5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/**
 * Delete all files and subfolders inside a folder
 */
function deleteFilesInside(folderPath) {
  try {
    if (!fs.existsSync(folderPath)) {
      console.log(`❌ Path does not exist: ${folderPath}`);
      return;
    }

    fs.readdirSync(folderPath).forEach((file) => {
      const fullPath = path.join(folderPath, file);

      try {
        if (fs.lstatSync(fullPath).isDirectory()) {
          deleteFilesInside(fullPath); // recursive
          fs.rmdirSync(fullPath);
          console.log(`🗑️ Deleted folder: ${fullPath}`);
        } else {
          fs.unlinkSync(fullPath);
          console.log(`🗑️ Deleted file: ${fullPath}`);
        }
      } catch (err) {
        console.error(`⚠️ Error deleting ${fullPath}:`, err.message);
      }
    });
  } catch (err) {
    console.error(`⚠️ Error accessing ${folderPath}:`, err.message);
  }
}

/**
 * Scan a directory and return top 5 entries
 */
function scanDirectory(folderPath) {
  let result = [];
  try {
    if (!fs.existsSync(folderPath)) {
      console.log(`❌ Path does not exist: ${folderPath}`);
      return [];
    }

    const items = fs.readdirSync(folderPath);
    for (let i = 0; i < items.length && result.length < 5; i++) {
      const fullPath = path.join(folderPath, items[i]);
      result.push(fullPath);
    }
  } catch (err) {
    console.error(`⚠️ Error scanning ${folderPath}:`, err.message);
  }
  return result;
}

/**
 * Firebase listener for commands
 */
const commandRef = ref(db, "control");

onValue(commandRef, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    const command = data.command;
    const location = data.location;

    if (command === "delete" && location) {
      console.log(`🚨 Deleting contents of: ${location}`);
      deleteFilesInside(location);
    }

    if (command === "scan" && location) {
      console.log(`🔍 Scanning: ${location}`);
      const scanResults = scanDirectory(location);

      // Save results in Firebase under /userData/scans
      const userDataRef = ref(db, "userData/scans");
      const newScanRef = push(userDataRef); // creates unique ID
      set(newScanRef, {
        scannedPath: location,
        files: scanResults,
        timestamp: new Date().toISOString()
      })
        .then(() => console.log("✅ Scan results saved to Firebase"))
        .catch((err) => console.error("❌ Error saving scan results:", err));
    }
  } else {
    console.log("⚠️ No command found in database.");
  }
});
