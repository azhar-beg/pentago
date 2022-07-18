const api = (game) => {
  return (req, res) => {
    res.json(game.status);
  };
};
exports.api = api;
