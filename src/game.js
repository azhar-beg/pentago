class Game {
  #player1;
  #player2;
  #board;
  #currentPlayer;
  #action;
  constructor() {
    this.#player1 = {};
    this.#player2 = {};
    this.#currentPlayer = this.#player1;
    this.#action = 'update';
  }

  #initBoard() {
    const block = [null, null, null, null];
    this.#board = [block.slice(), block.slice(), block.slice(), block];
  }

  addPlayer(name) {
    let player = this.#player1;
    let color = 'black';
    this.#initBoard();

    if (player.name) {
      player = this.#player2;
      color = 'white';
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
    this.#board[block][cell] = player.color;
  }

  #rotateLeft(block) {
    return block.concat([block[0]]).slice(1);
  }

  #rotateRight(block) {
    const lastIndex = block.length - 1;
    return block[lastIndex].concat(block).slice(0, -1);
  }

  rotate(blockNum, direction) {
    let block = this.#board[blockNum];
    if (direction === 'left') {
      this.#board[blockNum] = this.#rotateLeft(block);
      return;
    }
    this.#board[blockNum] = this.#rotateRight(block);
  }

  isActionValid(action, name) {
    return this.#action === action && this.#currentPlayer.name === name;
  }

  changeAction() {
    this.#action = this.#action === 'update' ? 'rotate' : 'update';
  }

  get status() {
    return this.#board;
  }
}

module.exports = { Game };
