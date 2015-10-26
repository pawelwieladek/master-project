import low from 'lowdb'
import ids from './learn/dbs/ids'
import games from './learn/dbs/games'
import networks from './learn/dbs/networks'

ids('results').remove({ id: 1445354047405 });
games('results').remove({ id: 1445354047405 });
networks('results').remove({ id: 1445354047405 });
