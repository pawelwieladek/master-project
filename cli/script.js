// import fs from 'fs';
import path from 'path';
import low from 'lowdb';
//
let idsDb = low(path.join(__dirname, `../results/learn/ids.json`), {
    autosave: true,
    async: false
});
let gamesDb = low(path.join(__dirname, `../results/learn/games.json`), {
    autosave: true,
    async: false
});
let networksDb = low(path.join(__dirname, `../results/learn/networks.json`), {
    autosave: true,
    async: false
});
//
// fs.readFile(path.resolve(path.join(__dirname, '../results/learn.txt')), 'utf8', (err, data) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   data = data.split('\n');
//   if (data[data.length - 1] === '') delete data[data.length - 1];
//   data = data.map(datum => JSON.parse(datum));
//   data.forEach(datum => {
//     console.log({
//       id: datum.id,
//       learningRate: datum.learningRate
//     });
//     idsDb('results').push({
//       id: datum.id,
//       learningRate: datum.learningRate
//     });
//     gamesDb('results').push({
//       id: datum.id,
//       games: datum.results
//     });
//     networksDb('results').push({
//       id: datum.id,
//       games: datum.network
//     });
//   });
// });

idsDb('results').remove({ id: 1445360595682 });
gamesDb('results').remove({ id: 1445360595682 });
networksDb('results').remove({ id: 1445360595682 });
