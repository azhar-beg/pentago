class Game {
  #player1;
  #player2;
  #board;
  #currentPlayer;
  constructor() {
    this.#player1 = {};
    this.#player2 = {};
    this.#currentPlayer = this.#player1;
  }

  #initBoard() {
    const block = [null, null, null, null];
    this.#board = [block.slice(), block.slice(), block.slice(), block];
  }

  addPlayer(name) {
    let player = this.#player2;
    let color = 'white';

    if (!player.name) {
      this.#initBoard();
      player = this.#player1;
      color = 'black';
    }

    player.name = name;
    player.color = color;
  };

  changeCurrentPlayer() {
    const player1 = this.#player1;
    const player2 = this.#player2;
    this.#currentPlayer = this.#currentPlayer === player1 ? player2 : player1;
  }

  updatePositions(block, cell) {
    const player = this.#currentPlayer;
    this.#board[block - 1][cell - 1] = player.color;
  }

  #rotateLeft(block) {
    return block.concat([block[0]]).slice(1);
  }

  #rotateRight(block) {
    const lastIndex = block.length - 1;
    return block[lastIndex].concat(block).slice(0, -1);
  }

  rotate(blockNum, direction) {
    let block = this.#board[blockNum - 1];
    if (direction === 'left') {
      this.#board[blockNum - 1] = this.#rotateLeft(block);
      return;
    }
    this.#board[blockNum - 1] = this.#rotateRight(block);
  }

  get status() {
    return this.#board;
  }
}

module.exports = { Game };
