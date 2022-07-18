const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const { initGame } = require('./handlers/initGame.js');
const { updatePositions } = require("./handlers/updatePositions");
const { rotateBlock } = require("./handlers/rotateBlock");
const { api } = require("./handlers/api");
const cookieSession = require('cookie-session');

const createApp = (sessions, game) => {
  const app = express();
  app.use(morgan('tiny'));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(cookieSession({
    name: 'sessionId',
    keys: ['key']
  }))

  app.post('/start', initGame(sessions, game));
  app.post('/play/positions', updatePositions(game));
  app.post('/play/rotate', rotateBlock(game));
  app.get('/play/api', api(game));
  app.use(express.static('public'));
  return app;
};

module.exports = { createApp };
