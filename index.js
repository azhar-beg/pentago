const { createApp } = require('./src/app.js');
const { Game } = require('./src/game.js');

const game = new Game();
const app = createApp({}, game);
app.listen(8282, () => { console.log('listening on http://localhost:8282'); });
