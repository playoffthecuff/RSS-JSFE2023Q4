import { main, menu, timerBlock } from "./createLayout";
import { modalContainer } from "./modalWindow";
import { GameField } from './gameField.js';
import { Nonograms } from "./nonograms.js";
import { createElement } from "./createElement.js";

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
  main.append(createGameField(Nonograms[targetId]));
}

export function finishGame() {
  GameField.isStart = false;
  clearInterval(timerId);
  timerBlock.textContent = '00:00:00';
  modalContainer.classList.remove('hidden');
}

export function restart() {
  modalContainer.classList.add('hidden');
  menu.classList.remove('hidden');
  main.removeChild(gameSection);
  GameField.solution = [];
  GameField.state = [];
  GameField.isStart = false;
}

let timerId;
export function countTime(startDate) {
  timerId = setInterval(function () {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;
    let difference = new Date() - startDate;
    hours = Math.floor(difference / 3600000 % 60);
    minutes = Math.floor(difference / 60000 % 60);
    seconds = Math.floor(difference / 1000 % 60);
    timerBlock.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }, 1000)
};

