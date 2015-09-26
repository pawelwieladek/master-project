import ipc from 'ipc';
import Reflux from 'reflux'
import SearchPlayerActions from '../actions/search-player-actions'
import SearchIntents from '../../../browser/intents/search-intents'

export default Reflux.createStore({
    listenables: SearchPlayerActions,
    init() {
        this.params = {};
        ipc.on(SearchIntents.createPlayerIntent, () => {
            this.trigger();
        });
    },
    createPlayerAction(params) {
        this.params = params || {};
        ipc.send(SearchIntents.createPlayerIntent, this.params);
    }
});