const { app, BrowserWindow } = require("electron");
const path = require("path");
const { fork } = require("child_process");

let backendProcess = null;

function startBackend() {
  // Base path of the app (different in dev vs packaged)
  const basePath = app.isPackaged
    ? path.join(process.resourcesPath, "app")
    : path.join(__dirname, "..");

  const backendPath = path.join(basePath, "backend", "index.js");

  console.log("Starting backend from:", backendPath);

  backendProcess = fork(backendPath, {
    cwd: path.join(basePath, "backend"),
    stdio: "inherit",
  });

  backendProcess.on("error", (err) => {
    console.error("Backend ERROR:", err);
  });
}

function createWindow() {
  // In dev, npm run electron already starts backend
  if (app.isPackaged) {
    startBackend();
  }

  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (!app.isPackaged) {
    // DEV: Parcel
    win.loadURL("http://localhost:1234");
    win.webContents.openDevTools();
  } else {
    // PROD: load built frontend from resources/app/frontend/dist/index.html
    const basePath = path.join(process.resourcesPath, "app");
    const indexPath = path.join(basePath, "frontend", "dist", "index.html");

    console.log("Loading frontend from:", indexPath);
    win.loadFile(indexPath);
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  app.quit();
});
