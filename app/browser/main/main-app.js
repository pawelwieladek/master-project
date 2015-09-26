var app = require('app');
var ipc = require('ipc');
var cp = require('child_process');
var BrowserWindow = require('browser-window');
var assign = require("object-assign");

import commonIntents from '../intents/common-intents.js';

export default class MainApp {
    constructor(params) {
        params = params || {};
        this.dirname = params.dirname;
        this.width = params.width || 800;
        this.height = params.height || 600;
        this.title = params.title || 'Untitled';
        this.state = {};
        this.mainWindow = null;
        this.childProcess = null;

        ipc.on(commonIntents.killChildProcessIntent, event => {
            if (this.childProcess) {
                this.childProcess.kill();
            }
        });

        ipc.on(commonIntents.getStateIntent, event => {
            event.sender.send(commonIntents.getStateIntent, this.state);
        });
    }

    setState(state) {
        this.state = assign(this.state, state);
    }

    use(middleware) {
        middleware(this);
    }

    register(intent, registry) {
        ipc.on(intent, (event, ...args) => {
            this.childProcess = cp.fork(this.dirname + '/child.js');
            this.childProcess.on('message', message => {
                try {
                    let send = response => {
                        event.sender.send(message.intent, response);
                    };
                    var handler = registry.getHandler(message.intent);
                    handler(send, message.response);
                } catch (e) {
                    console.log(e);
                }
            });
            this.childProcess.on('close', () => {
                this.childProcess = null;
            });
            let childContext = { state: this.state, intent, args: [...args] };
            this.childProcess.send(childContext);
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
                center: true
            });
            this.mainWindow.loadUrl('file://' + this.dirname +'/app/index.html');
            this.mainWindow.openDevTools();
            this.mainWindow.on('closed', () => {
                this.mainWindow = null;
            });
        });
    }
}