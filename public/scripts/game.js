const setColor = quads => {
  quads.forEach((quad, qIndex) => {
    quad.forEach((cell, cellIndex) => {
      const element = document.getElementById(qIndex + '-' + cellIndex);
      if (!cell) {
        element.style.backgroundColor = '';
        return;
      }
      element.style.backgroundColor = cell;
    })
  });
};

const updatePositions = event => {
  if (event.target.className !== 'circle') {
    return
  }
  const circle = event.target;
  const xhr = new XMLHttpRequest();
  const [quad, cell] = (circle.id.split('-'))
  xhr.open('POST', '/play/positions', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  const params = `quad=${quad}&cell=${cell}`;
  xhr.send(params);
};

const rotate = event => {
  if (event.target.id !== 'submit') {
    return;
  }
  const form = document.querySelector('#direction');
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'play/rotate');
  xhr.send(new URLSearchParams(new FormData(form)));
};

const main = () => {
  const game = document.querySelector('#game')
  game.onclick = updatePositions;
  document.onclick = rotate;
  setInterval(() => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'play/api');
    xhr.onload = (xhr) => {
      const quads = JSON.parse(xhr.currentTarget.response);
      setColor(quads);
    }
    xhr.send();
  }, 500);
};

window.onload = main;
