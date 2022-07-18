const injectSession = (sessions) => {
  return (req, res, next) => {
    if (!req.cookies) {
      next();
      return
    }
    const { sessionId } = req.cookies;
    req.session = sessions[sessionId];
    next();
  }
}

const initGame = (sessions, game) => {
  return (req, res) => {
    if (Object.keys(sessions).length === 2) {
      res.status(405);
      res.end('not allowed');
      return;
    }

    req.session.name = req.body.name
    game.addPlayer(req.body.name);
    res.redirect('/game.html');
  };
};

module.exports = { injectSession, initGame };
