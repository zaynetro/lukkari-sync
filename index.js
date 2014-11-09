/**
 * App main file
 */

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var ipc = require('ipc');
var config = require('./config');
var watcher = require('./libs/watcher');

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var win = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if(process.platform != 'darwin') app.quit();
});

// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  win = new BrowserWindow(config.browserWindow);

  // Open developer tools (ONLY FOR DEVELOPMENT)
  if(process.env.DEBUG == 'true') win.openDevTools();

  // and load the index.html of the app.
  win.loadUrl(config.baseFile);

  ipc.on('listento', function (e, dir) {
    watcher(dir);
  });

  // Emitted when the window is closed.
  win.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });
});