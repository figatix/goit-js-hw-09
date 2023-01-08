const DELAY = 1000;

const startEl = document.querySelector('button[data-start]')
const stopEl = document.querySelector('button[data-stop]')
const bodyEl = document.querySelector('body')

let intervalId = null;

function onStartClick(e) {
  bodyEl.style.backgroundColor = getRandomHexColor();
  intervalId = setInterval((() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }), DELAY)

  e.target.disabled = true;
  stopEl.disabled = false
}

function onStopClick(e) {

  clearInterval(intervalId)

  e.target.disabled = true
  startEl.disabled = false
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startEl.addEventListener('click', onStartClick)
stopEl.addEventListener('click', onStopClick)