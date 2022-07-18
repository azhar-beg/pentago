const { createApp } = require("../src/app.js");
const request = require('supertest');
const { Game } = require("../src/game.js");

describe('path: /start ', () => {
  it('should redirect to game page', (done) => {
    const game = new Game();
    const sessions = {};
    request(createApp(sessions, game))
      .post('/start')
      .send("name=ab")
      .expect(302, done)
  });


  it('should give an error if two users are connected to server', (done) => {
    const game = new Game();
    const sessions = { a: 1, b: 1 };
    request(createApp(sessions, game))
      .post('/start')
      .send("name=ab")
      .expect(405, done)
  });
});

describe('path: /play', () => {
  it.only('should update given position of current player', (done) => {
    const game = new Game();
    const sessions = {};
    request(createApp(sessions, game))
      .post('/start')
      .send("name=a")
      .expect(302)
      .end((err, res) => {
        const id = res.headers['set-cookie'][0].split(';')[0];
        request(createApp(sessions, game))
          .post('/play/positions')
          .set('Cookie', id)
          .send('quad=0&cell=0')
          .expect(200, done)
      })
  });
});

describe('path: /rotate', () => {
  it('should rotate given quad', (done) => {
    const game = new Game();
    game.addPlayer('a');
    game.addPlayer('b');
    game.updatePositions(0, 0);
    game.changeAction();
    const sessions = { 1: { name: 'a' }, 2: { name: 'b' } };
    request(createApp(sessions, game))
      .post('/play/rotate')
      .send("quad=1&direction=left")
      .set('Cookie', ['sessionId=1'])
      .expect(200, done)
  });
});

