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

const createSession = ({ name }) => {
  const time = new Date();
  const sessionId = time.getTime();
  return { name, time, sessionId };
};

const initGame = (sessions, game) => {
  return (req, res) => {
    if (Object.keys(sessions).length === 2) {
      res.status(405);
      res.end('not allowed');
      return;
    }

    const session = createSession(req.body);
    game.addPlayer(session.name);
    const { sessionId } = session;
    sessions[sessionId] = session;
    res.cookie('sessionId', sessionId);
    res.redirect('/game.html');
  };
};

module.exports = { injectSession, initGame };
