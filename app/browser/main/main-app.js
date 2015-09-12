var app = require('app');
var ipc = require('ipc');
var cp = require('child_process');
var BrowserWindow = require('browser-window');
var assign = require("object-assign");

export default class MainApp {
    constructor(params) {
        params = params || {};
        this.dirname = params.dirname;
        this.width = params.width || 800;
        this.height = params.height || 600;
        this.title = params.title || 'Untitled';
        this.state = {};
        this.mainWindow = null;
    }

    setState(state) {
        this.state = assign(this.state, state);
    }

    use(middleware) {
        middleware(this);
    }

    register(action, registry) {
        ipc.on(action, (event, ...args) => {
            let child = cp.fork(this.dirname + '/child.js');
            child.on('message', message => {
                try {
                    let send = response => {
                        event.sender.send(message.action, response);
                    };
                    var handler = registry.getHandler(message.action);
                    handler(send, message.response);
                } catch (e) {
                    console.log(e);
                }
            });
            let childContext = { state: this.state, action, args: [...args] };
            child.send(childContext);
        });
    }

    run() {
        app.on('window-all-closed', () => {
            app.quit();
        });
        app.on('ready', () => {
            this.mainWindow = new BrowserWindow({
                width: this.width,
                height: this.height,
                center: true,
                title: this.title
            });
            this.mainWindow.loadUrl('file://' + this.dirname +'/app/index.html');
            this.mainWindow.openDevTools();
            this.mainWindow.on('closed', () => {
                this.mainWindow = null;
            });
        });
    }
}