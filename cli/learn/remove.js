import low from 'lowdb'
import stdio from 'stdio'
import ids from './dbs/ids'
import games from './dbs/games'
import networks from './dbs/networks'

let options = stdio.getopt({
  id: {
    key: 'i',
    description: 'Id',
    args: 1,
    mandatory: true
  }
});

let id = parseInt(options.id);

ids('results').remove({ id });
games('results').remove({ id });
networks('results').remove({ id });
