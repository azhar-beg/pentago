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
  it('should update given position of current player', (done) => {
    const game = new Game();
    const sessions = {};
    request(createApp(sessions, game))
      .post('/start')
      .send("name=a")
      .expect(302)
      .end((err, res) => {
        const id = res.headers['set-cookie'];
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
    const sessions = {};
    request(createApp(sessions, game))
      .post('/start')
      .send("name=a")
      .expect(302)
      .end((err, res) => {
        game.updatePositions(0, 0);
        game.changeAction();
        const id = res.headers['set-cookie'];
        request(createApp(sessions, game))
          .post('/play/rotate')
          .send("quad=1&direction=left")
          .set('Cookie', id)
          .expect(200, done)
      });
  });
});

