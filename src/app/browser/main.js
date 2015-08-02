var app = require('app');  // Module to control application life.
var ipc = require('ipc');
var cp = require('child_process');

var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
var mainWindow = null;

var player = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    mainWindow.loadUrl('file://' + __dirname + '/index.html');

    // Open the devtools.
    mainWindow.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
});

ipc.on('message', function(event, message) {
    var child = cp.fork(__dirname + '/child.js');
    child.on('message', function(message) {
        switch(message.type) {
            case 'create':
                player = message.response;
                event.sender.send('response', message);
                break;
            case 'play':
                event.sender.send('response', message);
                break;
            case 'progress':
                event.sender.send('response', message);
                break;
            default:
                throw new Error('Message type not recognized');
        }
    });
    message.player = player;
    child.send(message);
});