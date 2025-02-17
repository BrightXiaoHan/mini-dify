import { app, protocol } from "electron";
import { createHandler } from "next-electron-rsc";

const appPath = app.getAppPath();
const isDev = process.env.NODE_ENV === "development";
const localhostUrl = "http://localhost:3000"; // must match Next.js dev server

// change to your path, make sure it's added to Electron Builder files
const standaloneDir = path.join(appPath, ".next", "standalone", "demo");

const { createInterceptor } = createHandler({
  standaloneDir,
  staticDir,
  localhostUrl,
  protocol,
});

function createWindow() {
  if (!isDev) createInterceptor({ session: mainWindow.webContents.session });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("before-quit", () => {
  if (nextProcess) {
    nextProcess.kill();
  }
});
