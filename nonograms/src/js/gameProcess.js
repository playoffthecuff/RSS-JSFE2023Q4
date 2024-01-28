import { loadButton, main, menu, restartButton, saveButton, timerBlock } from "./createLayout";
import { modalContainer, verdict } from "./modalWindow";
import { GameField } from './gameField.js';
import { Nonograms } from "./nonograms.js";
import { createElement } from "./createElement.js";

export const fillCellAudio = new Audio('/audio/button-26_1.mp3');
export const markCellAudio = new Audio('/audio/button-30_1.mp3');
export const clearCellAudio = new Audio('/audio/button-27_1.mp3');
const restartGameAudio = new Audio('/audio/1346[kb]windows-95-startup.wav.mp3');
export const startGameAudio = new Audio('/audio/117[kb]Gong.wav_1.mp3');
const winGameAudio = new Audio('/audio/95_kb_Fanfare-Lydian.wav.mp3');

export let gameSection;

function createGameField(arr) {
  gameSection = createElement('section', 'game-container');
  const gameField = createElement('div', 'game-field');
  const aboveField =  createElement('div', 'game-field');
  const gameSubField = GameField.createGameSubField(arr);
  const sideHintSubField = GameField.createSideHintField();
  const aboveHintSubField = GameField.createAboveHintField();
  const crossField = GameField.createCrossField();
  aboveField.append(crossField);
  aboveField.append(aboveHintSubField);
  gameField.append(sideHintSubField);
  gameField.append(gameSubField);
  gameSection.append(aboveField, gameField);
  return gameSection;
}

export function startGame(event) {
  const targetId = event.currentTarget.id;
  if (!modalContainer.classList.contains('hidden')) modalContainer.classList.add('hidden');
  menu.classList.add('hidden');
  main.append(createGameField(Nonograms[targetId]));
}

export function finishGame() {
  GameField.isStart = false;
  clearInterval(timerId);
  verdict.textContent = `Great! You have solved the nonogram in ${totalSeconds} seconds!`;
  totalSeconds = 0;
  timerBlock.textContent = '00:00';
  modalContainer.classList.remove('hidden');
  winGameAudio.play();
}

export function saveGame() {
  localStorage.setItem('state', JSON.stringify(GameField.state));
  localStorage.setItem('solution', JSON.stringify(GameField.solution));
  localStorage.setItem('totalSeconds', totalSeconds);
  localStorage.setItem('gameSection', gameSection.outerHTML);
  saveButton.classList.add('no-interactive');
  saveButton.firstElementChild.classList.add('no-interactive');
  loadButton.classList.remove('no-interactive');
  loadButton.firstElementChild.classList.remove('no-interactive');
}

export function loadGame() {
  if (main.querySelector('.game-container')) main.removeChild(gameSection);
  GameField.isStart = false;
  const gameSectionString = localStorage.getItem('gameSection');
  const tempContainer = document.createElement('div');
  tempContainer.innerHTML = gameSectionString;
  gameSection = tempContainer.firstChild;
  gameSection.querySelectorAll('.cell').forEach((cell) => {
    cell.addEventListener('click', GameField.fillCell);
    cell.addEventListener('contextmenu', GameField.markCell);
  });
  main.append(gameSection);
  const _totalSeconds = Number(localStorage.getItem('totalSeconds'));
  console.log(_totalSeconds);
  const _minutes = Math.floor(_totalSeconds / 60);
  const _seconds = _totalSeconds - _minutes * 60;
  pastSeconds = _totalSeconds;
  timerBlock.textContent = `${String(_minutes).padStart(2, '0')}:${String(_seconds).padStart(2, '0')}`;
  GameField.state = JSON.parse(localStorage.getItem('state'));
  GameField.solution = JSON.parse(localStorage.getItem('solution'));
  clearInterval(timerId);
  restartButton.classList.remove('no-interactive');
  restartButton.firstElementChild.classList.remove('no-interactive');
}

export function restart() {
  GameField.isStart = false;
  restartGameAudio.play();
  clearInterval(timerId);
  pastSeconds = 0;
  timerBlock.textContent = '00:00';
  modalContainer.classList.add('hidden');
  menu.classList.remove('hidden');
  main.removeChild(gameSection);
  GameField.solution = [];
  GameField.state = [];
  GameField.isStart = false;
  restartButton.classList.toggle('no-interactive');
  restartButton.firstElementChild.classList.toggle('no-interactive');
  saveButton.classList.toggle('no-interactive');
  saveButton.firstElementChild.classList.toggle('no-interactive');
}

let timerId;
let totalSeconds = 0;
export let pastSeconds = 0;
export function countTime(startDate, pastSeconds = 0) {
  timerId = setInterval(function () {
    let minutes = 0;
    let seconds = 0;
    let difference = new Date() - startDate + pastSeconds * 1000;
    minutes = Math.floor(difference / 60000 % 60);
    seconds = Math.floor(difference / 1000 % 60);
    totalSeconds = Math.floor(difference / 1000);

    timerBlock.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000)
};

export function resetGame() {
  GameField.isStart = false;
  clearInterval(timerId);
  pastSeconds = 0;
  timerBlock.textContent = '00:00';
  GameField.clearState();
  restartButton.classList.add('no-interactive');
  restartButton.firstElementChild.classList.add('no-interactive');
  saveButton.classList.add('no-interactive');
  saveButton.firstElementChild.classList.add('no-interactive');
  document.querySelector('.main-field').childNodes.forEach((node) => {
    node.classList.remove('marked');
    node.classList.remove('filled');
  });
}
