var app = require('app');  // Module to control application life.
var ipc = require('ipc');
var cp = require('child_process');
var BrowserWindow = require('browser-window');

Object.assign = Object.assign || require('object-assign');

function ElectronApp(params) {
    params = params || {};
    this.dirname = params.dirname;
    this.state = {};
    this.mainWindow = null;
}

ElectronApp.prototype.setState = function(state) {
    console.log('main set state', state);
    this.state = Object.assign(this.state, state);
};

ElectronApp.prototype.register = function(action, registry) {
    ipc.on(action, function(event, args) {
        console.log('ipc received action', action);
        console.log('ipc received event', action);
        console.log('ipc received args', args);
        var child = cp.fork(this.dirname + '/child.js');
        child.on('message', function(message) {
            try {
                console.log('main received message', message);
                var send = function(response) {
                    console.log('main send response', message.action, response);
                    event.sender.send(message.action, response);
                };
                var handler = registry.getHandler(message.action);
                handler.call(this, send, message.response);
            } catch (e) {
                console.log(e);
            }
        }.bind(this));
        var childMessage = { state: this.state, action: action, args: args };
        child.send(childMessage);
        console.log('ipc send message', childMessage);
    }.bind(this));
};

ElectronApp.prototype.run = function() {
    app.on('window-all-closed', function() {
        app.quit();
    });

    // This method will be called when Electron has done everything
    // initialization and ready for creating browser windows.
    app.on('ready', function() {
        // Create the browser window.
        this.mainWindow = new BrowserWindow({ width: 800, height: 600 });

        // and load the index.html of the app.
        this.mainWindow.loadUrl('file://' + this.dirname +'/app/index.html');

        // Open the devtools.
        this.mainWindow.openDevTools();

        // Emitted when the window is closed.
        this.mainWindow.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            this.mainWindow = null;
        }.bind(this));
    }.bind(this));
};

module.exports = ElectronApp;