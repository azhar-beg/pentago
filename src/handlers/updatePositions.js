const updatePositions = (game) => {
  return (req, res) => {
    if (!game.isActionValid('update', req.session.name)) {
      res.status(405);
      res.end();
      return;
    }
    const { quad, cell } = req.body;
    game.updatePositions(+quad, +cell);
    res.end();
    game.changeAction();
  };
};
exports.updatePositions = updatePositions;
