const { createApp } = require("../src/app.js");
const request = require('supertest');
const { Game } = require("../src/game.js");

describe('path: /start ', () => {
  it('should redirect to game page', (done) => {
    const game = new Game();
    const sessions = {};
    request(createApp(game, sessions))
      .post('/start')
      .send("name=ab")
      .expect(302, done)
  });


  it('should give an error if two users are connected to server', (done) => {
    const game = new Game();
    const sessions = { a: 1, b: 1 };
    request(createApp(game, sessions))
      .post('/start')
      .send("name=ab")
      .expect(405, done)
  });
});

describe('path: /play', () => {
  it('should update given position of current player', (done) => {
    const game = new Game();
    game.addPlayer('a');
    game.addPlayer('b');
    const expected = JSON.stringify([["black", null, null, null], [null, null, null, null], [null, null, null, null], [null, null, null, null]]);
    const sessions = { 1: { name: 'a' }, 2: { name: 'b' } };
    request(createApp(game, sessions))
      .post('/play/positions')
      .send("block=1&cell=1")
      .set('Cookie', ['sessionId=1'])
      .expect(expected)
      .expect(200, done)
  });
});

describe('path: /rotate', () => {
  it('should rotate given block', (done) => {
    const game = new Game();
    game.addPlayer('a');
    game.addPlayer('b');
    game.updatePositions(1, 1);
    const expected = JSON.stringify([[null, null, null, 'black'], [null, null, null, null], [null, null, null, null], [null, null, null, null]]);
    const sessions = { 1: { name: 'a' }, 2: { name: 'b' } };
    request(createApp(game, sessions))
      .post('/play/rotate')
      .send("block=1&direction=left")
      .set('Cookie', ['sessionId=1'])
      .expect(expected)
      .expect(200, done)
  });
});

