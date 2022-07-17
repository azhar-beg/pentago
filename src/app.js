const cookieParser = require('cookie-parser');
const express = require('express');
const { injectSession, initGame } = require('./handlers/initGame');
const { injectCookies } = require('./handlers/injectCookies');

const updatePositions = (game) => {
  return (req, res) => {
    const { block, cell } = req.body;
    game.updatePositions(+block, +cell);
    res.json(game.status)
  }
};

const rotateBlock = (game) => {
  return (req, res) => {
    const { block, direction } = req.body;
    game.rotate(+block, direction);
    game.changeCurrentPlayer();
    res.json(game.status);
  }
};

const createApp = (game, sessions) => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(injectSession(sessions));
  app.post('/start', initGame(sessions, game));
  app.post('/play/positions', updatePositions(game));
  app.post('/play/rotate', rotateBlock(game));
  app.use(express.static('public'));
  return app;
};

module.exports = { createApp };
