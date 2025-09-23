# electron-project-day-1
This project is educational purpose only Minimal Electron app that automatically captures desktop screenshots and saves them as sequential PNG files.

🔹 Recommended Topics / Tags
electron, screenshots, screenshot-desktop, nodejs, desktop-automation, starter-project

🔹 README.md
# Screensnap – Desktop Screenshot Taker

A minimal *Electron* app that automatically captures desktop screenshots and saves them as sequential PNG files.  
The app opens a small window, shows simple progress updates, and stores screenshots in the project directory.

---

## ✨ Features
- 🚀 Launches a lightweight Electron window and begins capturing screenshots automatically.  
- 💾 Saves images as PNG files in the app folder:


screenshot-1.png
screenshot-2.png
screenshot-3.png
...

- 🖥️ Uses [screenshot-desktop](https://www.npmjs.com/package/screenshot-desktop) for cross-platform screen capture.  
- 🔔 Displays progress updates in the renderer window.  

---

## 📂 Project Structure


screensnap/
├── package.json # Scripts, dependencies, and Electron setup
├── main.js # Main process: creates BrowserWindow & runs screenshot loop
├── index.html # Renderer UI for progress updates


---

## ⚙️ Prerequisites
- [Node.js](https://nodejs.org/) *v18+*  
- npm (bundled with Node.js)

---

## 📦 Installation
Clone the repo and install dependencies:
```bash
git clone https://github.com/your-username/screensnap.git
cd screensnap
npm install


This installs:

electron (as a dev dependency)

screenshot-desktop (runtime dependency)

▶️ Run in Development
npm start


Opens the Electron app window

Starts taking screenshots automatically

🔍 How It Works

Main process creates a 500×200 BrowserWindow.

After loading the renderer, takeScreenshots(5) runs (default: 5 shots).

Each file is saved as screenshot-N.png in the app directory.

Renderer receives progress messages via webContents.send.

⚙️ Configuration

Edit main.js:

Window size → update width / height in BrowserWindow.

Screenshot count → change takeScreenshots(5).

Save location → replace path.join(__dirname, ...) with a custom directory.

📜 Scripts

npm start → Run the app in development

📦 Dependencies

electron
 (devDependency) – Desktop app runtime

screenshot-desktop
 – Cross-platform screen capture

🐛 Known Issues

Error: Cannot find module 'screenshot-desktop'
→ Ensure npm install finished and that it’s listed under dependencies.

Windows: 'electron' is not recognized…
→ Always use npm start (uses local binary).

🔒 Security Note

This demo enables Node integration and disables contextIsolation for simplicity.
For production apps:

Disable Node integration

Enable contextIsolation

Move privileged logic to the main process or preload scripts

📄 License

Licensed under the ISC License. See package.json for details.

🔑 Quick Reference

Start app: npm start
