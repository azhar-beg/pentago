const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const { initGame } = require('./handlers/initGame.js');
const { updatePositions } = require("./handlers/updatePositions");
const { rotateBlock } = require("./handlers/rotateBlock");
const { api } = require("./handlers/api");
const cookieSession = require('cookie-session');



const gameRouter = game => {
  const router = express.Router();
  router.post('/positions', updatePositions(game));
  router.post('/rotate', rotateBlock(game));
  router.get('/api', api(game));
  return router;
};

const createApp = (game) => {
  const app = express();
  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(cookieSession({
    name: 'sessionId',
    keys: ['key']
  }))

  app.post('/start', initGame(game));

  app.use('/play', gameRouter(game))
  app.use(express.static('public'));
  return app;
};

module.exports = { createApp };
