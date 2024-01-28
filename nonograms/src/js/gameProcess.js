import { main, menu, restartButton, timerBlock } from "./createLayout";
import { modalContainer, verdict } from "./modalWindow";
import { GameField } from './gameField.js';
import { Nonograms } from "./nonograms.js";
import { createElement } from "./createElement.js";

export const fillCellAudio = new Audio('/audio/button-26_1.mp3');
export const markCellAudio = new Audio('/audio/button-30_1.mp3');
export const clearCellAudio = new Audio('/audio/button-27_1.mp3');
const loadGameAudio = new Audio('/audio/1346[kb]windows-95-startup.wav.mp3');
export const startGameAudio = new Audio('/audio/117[kb]Gong.wav_1.mp3');
const winGameAudio = new Audio('/audio/95_kb_Fanfare-Lydian.wav.mp3');

const replayButton = document.querySelector('.replay-icon');
let gameSection = {};

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
  restartButton.classList.remove('no-interactive');
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

export function restart() {
  GameField.isStart = false;
  clearInterval(timerId);
  timerBlock.textContent = '00:00';
  modalContainer.classList.add('hidden');
  menu.classList.remove('hidden');
  main.removeChild(gameSection);
  GameField.solution = [];
  GameField.state = [];
  GameField.isStart = false;
  restartButton.classList.toggle('no-interactive');
}

let timerId;
let totalSeconds = 0;
export function countTime(startDate) {
  timerId = setInterval(function () {
    let minutes = 0;
    let seconds = 0;
    let difference = new Date() - startDate;
    minutes = Math.floor(difference / 60000 % 60);
    seconds = Math.floor(difference / 1000 % 60);
    totalSeconds = Math.floor(difference / 1000);

    timerBlock.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000)
};