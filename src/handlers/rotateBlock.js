const rotateBlock = (game) => {
  return (req, res) => {
    if (!game.isActionValid('rotate', req.session.name)) {
      res.status(405);
      res.end();
      return;
    }
    const { quad, direction } = req.body;
    game.rotate(+quad - 1, direction);
    game.changeCurrentPlayer();
    res.end();
    game.changeAction();
  };
};
exports.rotateBlock = rotateBlock;
