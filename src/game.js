class Game {
  #player1;
  #player2;
  #board;
  #currentPlayer;
  #action;
  #winner;
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
    return [block[lastIndex], ...(block).slice(0, -1)];
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

  hasWon() {
    const horizontal = [[0, 1, 4], [1, 4, 5], [3, 2, 7], [2, 7, 6], [8, 9, 12], [9, 12, 13], [11, 10, 15], [10, 15, 14]];
    const vertical = [[0, 3, 8], [3, 8, 11], [1, 2, 9], [2, 9, 10], [4, 7, 12], [7, 12, 15], [5, 6, 13], [6, 13, 14]];
    const winningComb = horizontal.concat(vertical);
    const board = this.#board.flat();
    return winningComb.find(combination => {
      return combination.every(index => {
        return board[combination[0]] === board[index] &&
          board[index] !== null
      });
    });
  }
}

module.exports = { Game };
