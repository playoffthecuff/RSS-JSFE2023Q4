import { loadButton, main, records, restartButton, saveButton, showSolutionButton, timerBlock, updateRecordsTable } from "./createLayout";
import { modalContainer, verdict } from "./modalWindow";
import { GameField } from './gameField.js';
import { NonogramsEasy, NonogramsHard, NonogramsMedium, generateSVG } from "./nonograms.js";
import { createElement } from "./createElement.js";

export const fillCellAudio = new Audio('/audio/button-26_1.mp3');
export const markCellAudio = new Audio('/audio/button-30_1.mp3');
export const clearCellAudio = new Audio('/audio/button-27_1.mp3');
const restartGameAudio = new Audio('/audio/1346[kb]windows-95-startup.wav.mp3');
export const startGameAudio = new Audio('/audio/117[kb]Gong.wav_1.mp3');
const winGameAudio = new Audio('/audio/95_kb_Fanfare-Lydian.wav.mp3');

export let gameSection;

export function disableButton(button) {
  button.classList.add('no-interactive');
  button.firstElementChild.classList.add('no-interactive');
}

export function enableButton(button) {
  button.classList.remove('no-interactive');
  button.firstElementChild.classList.remove('no-interactive');
}

export function toggleButton(button) {
  button.classList.toggle('no-interactive');
  button.firstElementChild.classList.toggle('no-interactive');
}

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

let level = '';

export function startGame(event) {
  enableButton(showSolutionButton);
  disableButton(restartButton);
  disableButton(saveButton);
  stopAndClearTimer();
  if (main.querySelector('.game-container')) main.removeChild(gameSection);
  GameField.solution = [];
  GameField.state = [];
  GameField.isStart = false;
  const id = event.currentTarget.id;
  level = id.slice(0, id.length - 1);
  let gamesArr;
  switch (level) {
    case 'easy':
      gamesArr = NonogramsEasy;
      break;
    case 'medium':
      gamesArr = NonogramsMedium;
      break;
    case 'hard':
      gamesArr = NonogramsHard;
      break;
  }
  const targetId = event.currentTarget.id;
  if (!modalContainer.classList.contains('hidden')) modalContainer.classList.add('hidden');
  main.append(createGameField(gamesArr[targetId]));
  console.log(GameField.solution);
}

export function finishGame() {
  winGameAudio.play();
  writeEntryRecord();
  GameField.isStart = false;
  clearInterval(timerId);
  verdict.textContent = `Great! You have solved the nonogram in ${totalSeconds} seconds!`;
  totalSeconds = 0;
  timerBlock.textContent = '00:00';
  modalContainer.classList.remove('hidden');
  updateRecordsTable();
}

export function saveGame() {
  disableButton(saveButton);
  enableButton(loadButton);
  localStorage.setItem('state', JSON.stringify(GameField.state));
  localStorage.setItem('solution', JSON.stringify(GameField.solution));
  localStorage.setItem('totalSeconds', totalSeconds);
  localStorage.setItem('gameSection', gameSection.outerHTML);
}

export function loadGame() {
  enableButton(restartButton);
  enableButton(showSolutionButton);
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
  const _minutes = Math.floor(_totalSeconds / 60);
  const _seconds = _totalSeconds - _minutes * 60;
  pastSeconds = _totalSeconds;
  timerBlock.textContent = `${String(_minutes).padStart(2, '0')}:${String(_seconds).padStart(2, '0')}`;
  GameField.state = JSON.parse(localStorage.getItem('state'));
  GameField.solution = JSON.parse(localStorage.getItem('solution'));
  clearInterval(timerId);
  console.log(GameField.solution);
}

export function restart() {
  toggleButton(restartButton);
  toggleButton(saveButton);
  disableButton(showSolutionButton);
  restartGameAudio.play();
  stopAndClearTimer();
  modalContainer.classList.add('hidden');
  main.removeChild(gameSection);
  GameField.solution = [];
  GameField.state = [];
  GameField.isStart = false;
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
    timerBlock.textContent = secondsToMinSecFormat(totalSeconds);
  }, 1000)
}

function secondsToMinSecFormat(seconds) {
  const _minutes = Math.floor(seconds / 60 % 60);
  const _seconds = Math.floor(seconds % 60);
  return `${String(_minutes).padStart(2, '0')}:${String(_seconds).padStart(2, '0')}`
}

function stopAndClearTimer() {
  clearInterval(timerId);
  pastSeconds = 0;
  timerBlock.textContent = '00:00';
}

export function resetGame() {
  disableButton(restartButton);
  disableButton(saveButton);
  enableButton(showSolutionButton);
  GameField.isStart = false;
  stopAndClearTimer();
  GameField.clearState();
  gameSection.querySelector('.main-field').childNodes.forEach((node) => {
    node.classList.remove('marked');
    node.classList.remove('filled');
    node.classList.remove('disabled');
  });
}

export function startRandomGame() {
  enableButton(showSolutionButton);
  stopAndClearTimer();
  let nonogramLevel;
  let level;
  if (Math.random() * 3 < 1) {
    nonogramLevel = NonogramsEasy;
    level = 'easy';
  } else if (1 < Math.random() * 3 && Math.random() * 3 < 2) {
    nonogramLevel = NonogramsMedium;
    level = 'medium';
  } else {
    nonogramLevel = NonogramsHard;
    level = 'hard';
  };
  const nonogramNumber = Math.floor(Math.random() * 6 + 1);
  const nonogram = level + nonogramNumber;
  if (main.querySelector('.game-container')) main.removeChild(gameSection);
  GameField.solution = [];
  GameField.state = [];
  GameField.isStart = false;
  main.append(createGameField(nonogramLevel[nonogram]));
  console.log(GameField.solution);
}

export function showSolution() {
  disableButton(saveButton);
  disableButton(showSolutionButton);
  enableButton(restartButton);
  const arr = GameField.solution;
  const gameSubField = gameSection.querySelector('.main-field');
  const cells = gameSubField.children;
  for (let i = 0; i < cells.length; i += 1) {
    const cell = cells[i];
    cell.classList.remove('filled', 'marked');
    cell.classList.add('disabled');
  }
  for (let row = 0; row < arr.length; row += 1) {
    for (let column = 0; column < arr.length; column += 1) {
      if (arr[row][column]) {
        const cell = gameSubField.querySelector(`[data-row="${row}"][data-column="${column}"]`);
        if (!cell.classList.contains('filled')) cell.classList.add('filled');
      }
    }
  }
}

export function writeEntryRecord() {
  const entry = {};
  entry.time = totalSeconds;
  entry.svg = generateSVG(GameField.solution);
  entry.level = getLevel();
  if (records.unshift(entry) > 5) records.pop();
  localStorage.setItem('records', JSON.stringify(records));
}

export function getLevel() {
  let level;
  if (GameField.solution.length < 6) {
    level = 'Easy';
  } else if (GameField.solution.length < 11) {
    level = 'Medium';
  } else {
    level = 'Hard';
  }
  return level;
}

export function createRecordsTable() {
  let recordsCopy = [...records];
  recordsCopy.sort((a, b) => a.time - b.time);
  const table = createElement('div', 'content');
  for (let record of recordsCopy) {
  const wrapper = createElement('div', 'row');
  const picture = createElement('div');
  picture.innerHTML = record.svg;
  picture.firstElementChild.classList.add('icon');
  const level = createElement('div');
  level.textContent = record.level;
  const time = createElement('div', 'time');
  time.textContent = secondsToMinSecFormat(record.time);
  wrapper.append(picture, level, time);
  table.append(wrapper);
  }
  return table;
}