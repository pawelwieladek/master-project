var app = require('app');
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
    this.state = Object.assign(this.state, state);
};

ElectronApp.prototype.register = function(action, registry) {
    ipc.on(action, function(event, args) {
        var child = cp.fork(this.dirname + '/child.js');
        child.on('message', function(message) {
            try {
                var send = function(response) {
                    event.sender.send(message.action, response);
                };
                var handler = registry.getHandler(message.action);
                handler.call(this, send, message.response);
            } catch (e) {
                console.log(e);
            }
        }.bind(this));
        var childContext = { state: this.state, action: action, args: args };
        child.send(childContext);
    }.bind(this));
};

ElectronApp.prototype.run = function() {
    app.on('window-all-closed', function() {
        app.quit();
    });
    app.on('ready', function() {
        this.mainWindow = new BrowserWindow({ width: 800, height: 600 });
        this.mainWindow.loadUrl('file://' + this.dirname +'/app/index.html');
        this.mainWindow.openDevTools();
        this.mainWindow.on('closed', function() {
            this.mainWindow = null;
        }.bind(this));
    }.bind(this));
};

module.exports = ElectronApp;