const initGame = (game) => {
  return (req, res) => {
    req.session.name = req.body.name
    game.addPlayer(req.body.name);
    res.redirect('/game.html');
  };
};

module.exports = { initGame };
