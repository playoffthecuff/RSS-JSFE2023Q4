import { words } from './words.js';
import { hangman } from './gallows-img.js';
import { keyboard } from './keyboard.js';
import { modal } from './modal.js';
import { mainElement } from './createContent.js';
import { modalContainer } from './createContent.js';

const bodyElement = document.body;
bodyElement.appendChild(mainElement);
bodyElement.appendChild(modalContainer);

// eslint-disable-next-line consistent-return
function inputHandler(letter) {
  if (!words.showGuessedLetters(letter)) {
    hangman.showBodyPart();
    words.updateCounter();
  };
  const gameStatus = words.gameStatus();
  if (gameStatus !== 'gaming') return finishGame(gameStatus);
}

// eslint-disable-next-line consistent-return
function clickHandler (event) {
  const letter = keyboard.keys[Number(event.currentTarget.id.slice(3))];
  const keyID = event.currentTarget.id;
  keyboard.disableKey(keyID);
  return inputHandler(letter);
}

function keyupHandler(event) {
  if (event.key.length !== 1 || !event.key.match(/[a-z]/i)) return;
  const letter = event.key.toUpperCase();
  const keyID = `key${keyboard.keys.indexOf(letter)}`;
  keyboard.disableKey(keyID);
  // eslint-disable-next-line consistent-return
  return inputHandler(letter);
}

const startNewGame = () => {
  document.addEventListener('keyup', keyupHandler);
  words.newSecretWord();
  hangman.hideDude();
  keyboard.enableKeyboard();
  words.updateLetters();
  words.incorrectCount = 0;
  words.updateCounter();
  modal.hideModal();
}

const finishGame = (result) => {
  document.removeEventListener('keyup', keyupHandler);
  modal.showModal(result);
}

const replayButtonElement = document.querySelector('.replay-button');

document.addEventListener('keyup', keyupHandler);
replayButtonElement.addEventListener('click', startNewGame);
keyboard.keysElements.forEach((key) =>
  key.addEventListener('click', clickHandler)
);
