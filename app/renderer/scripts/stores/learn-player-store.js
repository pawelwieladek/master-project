import ipc from 'ipc';
import Reflux from 'reflux'
import LearnPlayerActions from '../actions/learn-player-actions.js'
import LearnIntents from '../../../browser/intents/learn-intents'

export default Reflux.createStore({
    listenables: LearnPlayerActions,
    init() {
        this.learningRate = null;
        this.results = [];
        ipc.on(LearnIntents.createPlayerIntent, () => {
            this.trigger();
        });
        ipc.on(LearnIntents.notifyLearnProgressIntent, didWin => {
            this.results.push(didWin);
            this.trigger();
        });
    },
    createPlayerAction(learningRate) {
        this.results = [];
        this.learningRate = learningRate;
        ipc.send(LearnIntents.createPlayerIntent, learningRate);
    },
    learnAction(iterations) {
        ipc.send(LearnIntents.learnIntent, iterations);
    }
});