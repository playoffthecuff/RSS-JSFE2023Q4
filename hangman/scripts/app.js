import { words } from './words.js';
import { gallowsImg } from './gallows-img.js';

const mainElement = document.createElement('main');

const sectionGallowsElement = document.createElement('section');
sectionGallowsElement.classList.add('gallows');

sectionGallowsElement.innerHTML = gallowsImg;
const gallowsImgElement = sectionGallowsElement.querySelector('.gallows-img');

const sectionQuizElement = document.createElement('section');
sectionQuizElement.classList.add('quiz');
const divWordElement = document.createElement('div');
divWordElement.classList.add('word');

const bodyElement = document.body;

bodyElement.appendChild(mainElement);

mainElement.appendChild(sectionGallowsElement);
mainElement.appendChild(sectionQuizElement);
sectionQuizElement.appendChild(divWordElement);

let secretWord = '';
const getNewSecretWord = () => {
  if (secretWord !== words[Math.floor(Math.random() * words.length)].toUpperCase()) {
    return words[Math.floor(Math.random() * words.length)].toUpperCase();
  }
    return getNewSecretWord();
};

secretWord = getNewSecretWord();

for (let i = 0; i < secretWord.length; i += 1) {
  const element = document.createElement('div');
  element.classList.add('letter');
  element.textContent = '_';
  divWordElement.appendChild(element);
}
let letters = divWordElement.querySelectorAll('.letter');

const totalAttempts = 6;

const tryBoardElement = document.createElement('div');
tryBoardElement.classList.add('try-board');
tryBoardElement.innerHTML = `<div class="guess">Incorrect guesses:</div>
<div class="guess counter"></div>
<div class="guess counter">/</div>
<div class="guess counter">${totalAttempts}</div>`;
sectionQuizElement.appendChild(tryBoardElement);

const incorrectCountElement = tryBoardElement.querySelector('.counter');
let incorrectCount = 0;
incorrectCountElement.textContent = incorrectCount;
const keyBoardElement = document.createElement('div');
keyBoardElement.classList.add('keyboard');
sectionQuizElement.appendChild(keyBoardElement);

for (let i = 65; i < 91; i += 1) {
  const element = document.createElement('div');
  element.classList.add('key');
  element.textContent = String.fromCharCode(i);
  keyBoardElement.appendChild(element);
}

const head = gallowsImgElement.getElementById('head');
const body = gallowsImgElement.getElementById('body');
const leftArm = gallowsImgElement.getElementById('left-arm');
const rightArm = gallowsImgElement.getElementById('right-arm');
const leftLeg = gallowsImgElement.getElementById('left-leg');
const rightLeg = gallowsImgElement.getElementById('right-leg');

const keysElements = keyBoardElement.querySelectorAll('.key');

const modalContainerElement = document.createElement('div');
modalContainerElement.classList.add('modal-container', 'hidden');
modalContainerElement.innerHTML = `<div class="modal-window hidden">
<div class="verdict-wrapper">
  <span class="verdict-message"></span>
  <span class="highlight"></span>
</div>
<div class="answer">
  The secret word is 
</div>
<div class="secret-word">
</div>
<div class="replay-button">
  <svg class="replay-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
    <path d="M480-80q-75 0-140.5-28T225-185q-49-49-77-114.5T120-440h60q0 125 87.5 212.5T480-140q125 0 212.5-87.5T780-440q0-125-85-212.5T485-740h-23l73 73-41 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735-695q49 49 77 114.5T840-440q0 75-28 140.5T735-185q-49 49-114.5 77T480-80Z"/>
  </svg>
</div>
</div>
`;
const modalWindowElement = modalContainerElement.querySelector('.modal-window');

bodyElement.appendChild(modalContainerElement);
const verdictMessagePreElement =
  modalContainerElement.querySelector('.verdict-message');
const verdictMessagePostElement =
  modalContainerElement.querySelector('.highlight');
const secretWordElement = modalContainerElement.querySelector('.secret-word');
const replayButtonElement =
  modalContainerElement.querySelector('.replay-button');

let closeToWin = secretWord.length;
const keyStates = {};

const startNewGame = () => {
  Object.keys(keyStates).forEach((key) => {
    delete keyStates[key];
  });
  secretWord = getNewSecretWord();
  closeToWin = secretWord.length;
  head.classList.remove('visible');
  body.classList.remove('visible');
  leftArm.classList.remove('visible');
  rightArm.classList.remove('visible');
  leftLeg.classList.remove('visible');
  rightLeg.classList.remove('visible');
  for (let i = 0; i < keysElements.length; i += 1) {
    keysElements[i].classList.remove('disabled');
  }
  incorrectCount = 0;
  incorrectCountElement.textContent = incorrectCount;
  divWordElement.innerHTML = '';
  for (let i = 0; i <  secretWord.length; i += 1) {
    const element = document.createElement('div');
    element.classList.add('letter');
    element.textContent = '_';
    divWordElement.appendChild(element);
  }
  letters = divWordElement.querySelectorAll('.letter');
  modalContainerElement.classList.add('hidden');
  modalWindowElement.classList.add('hidden');
}

const finishGame = (result) => {
  verdictMessagePreElement.textContent =
    result === 'win' ? 'Congratulations: ' : 'Sorry: ';
  verdictMessagePostElement.textContent =
    result === 'win' ? 'You Win!' : 'You Lose!';
  secretWordElement.textContent = secretWord;
  modalContainerElement.classList.remove('hidden');
  modalWindowElement.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  replayButtonElement.addEventListener('click', startNewGame);
};

const keyboardPushOrTapHandler = (event) => {
  const keyCode = event.code;
  if (!keyCode) {
    if (event.currentTarget.classList.contains('key')) {
      event.currentTarget.classList.add('disabled');
    }
  }
  if (keyCode) {
    if (event.key.length !== 1 || !event.key.match(/[a-z]/i)) return;
    if (keyStates[keyCode]) {
      return;
    }
    for (let i = 0; i < keysElements.length; i += 1) {
      if (keysElements[i].textContent === event.key.toUpperCase())
      keysElements[i].classList.add('disabled');
    }
    keyStates[keyCode] = true;
  }
  let checkResult = 1;
  for (let i = 0; i < secretWord.length; i += 1) {
    if (event.currentTarget.textContent === secretWord[i] || (event.key || '0').toUpperCase() === secretWord[i]) {
      letters[i].textContent = secretWord[i];
      checkResult = 0;
      closeToWin -= 1;
    }
  }
  incorrectCount += checkResult;
  incorrectCountElement.textContent = incorrectCount;
  switch (incorrectCount) {
    case 1:
      head.classList.add('visible');
      break;
    case 2:
      body.classList.add('visible');
      break;
    case 3:
      leftArm.classList.add('visible');
      break;
    case 4:
      rightArm.classList.add('visible');
      break;
    case 5:
      leftLeg.classList.add('visible');
      break;
    case 6:
      rightLeg.classList.add('visible');
      break;
    default:
      // eslint-disable-next-line no-console
      console.log('WooHoo, slamming them tonight!');
  }
  // eslint-disable-next-line consistent-return
  if (closeToWin === 0) return finishGame('win');
  // eslint-disable-next-line consistent-return
  if (incorrectCount === 6) return finishGame('lose');
};

keysElements.forEach((key) =>
  key.addEventListener('click', keyboardPushOrTapHandler)
);

document.addEventListener('keyup', keyboardPushOrTapHandler);
