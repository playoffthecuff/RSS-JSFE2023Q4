import { createElement } from "./createElement.js";
import { restartButton, saveButton } from "./createLayout.js";
import { clearCellAudio, countTime, fillCellAudio, finishGame, gameSection, markCellAudio, pastSeconds, startGameAudio } from "./gameProcess.js";

function createCell (row, column) {
  const element = createElement('div', 'cell');
  element.dataset['row'] = row;
  element.dataset['column'] = column;
  return element;
}

export const GameField = {
  solution: [],
  state: [],
  isStart: false,

  fillCell: (event) => {
    if (!GameField.isStart) {
      countTime(new Date(), pastSeconds);
      GameField.isStart = true;
      startGameAudio.play();
      restartButton.classList.remove('no-interactive');
      restartButton.firstElementChild.classList.remove('no-interactive');
    }
    saveButton.classList.remove('no-interactive');
    saveButton.firstElementChild.classList.remove('no-interactive');
    event.currentTarget.classList.remove('marked');
    event.currentTarget.classList.toggle('filled');
    const row = event.target.dataset.row;
    const column = event.target.dataset.column;
    GameField.state[row][column] = !(GameField.state[row][column]);
    if (GameField.state[row][column]) {
      fillCellAudio.play();
    } else {
      clearCellAudio.play();
    }
    if (GameField.isWin()) finishGame();
  },

  markCell: (event) => {
    event.currentTarget.classList.remove('filled');
    event.currentTarget.classList.toggle('marked');
    event.preventDefault();
    const row = event.target.dataset.row;
    const column = event.target.dataset.column;
    if (event.currentTarget.classList.contains('marked')) {
      markCellAudio.play();
    } else {
      clearCellAudio.play();
    }
    GameField.state[row][column] = false;
  },

  countRowSequences(arr) {
    const result = [];
    for (let row = 0; row < arr.length; row += 1) {
      result.push([]);
      let counter = 0;
      for (let column = 0; column < arr.length; column += 1) {
        if (arr[row][column] === false && counter !== 0) {
          result[row].push(counter);
          counter = 0;
        }
        if (arr[row][column] === true) counter += 1;
        if (column === arr.length - 1 && counter !== 0) result[row].push(counter);
      }
    }
    return result;
  },

  countColumnSequences(arr) {
    const result = [];
    for (let column = 0; column < arr.length; column += 1) {
      result.push([]);
    };
    for (let column = 0; column < arr.length; column += 1) {
      let counter = 0;
      for (let row = 0; row < arr.length; row += 1) {
        if (arr[row][column] === false && counter !== 0) {
          result[column].push(counter);
          counter = 0;
        }
        if (arr[row][column] === true) counter += 1;
        if (row === arr.length - 1 && counter !== 0) result[column].push(counter);
      }
    }
    return result;
  },

  createGameSubField(arr) {
    const size = arr.length;
    const relSize = 100 / (size) + '%';
    const gameSubField = createElement('div', 'game-subfield', 'main-field');
    gameSubField.style.flexGrow = size;
    for (let row = 0; row < size; row += 1) {
      this.solution.push(arr[row]);
      this.state.push([]);
      for (let column = 0; column < size; column += 1) {
        this.state[row].push(false);
        const cell = createCell(row, column);
        if ((column + 1) % 5 === 0) cell.classList.add('border-right');
        if ((row + 1) % 5 === 0) cell.classList.add('border-bottom');
        if (arr[row][column]) {
          cell.textContent = 1;
        } else {
          cell.textContent = 0;
        }
        const style = cell.style;
        style.flexBasis = relSize;
        cell.addEventListener('click', this.fillCell);
        cell.addEventListener('contextmenu', this.markCell);
        gameSubField.append(cell);
      }
    }
    return gameSubField;
  },

  createSideHintField() {
    const arr = this.countRowSequences(this.solution);
    let size = 0;
    for (const subArr of arr) {
      size = Math.max(size, subArr.length);
    };
    const modifiedArr = arr.map((subArr) => {
      if (subArr.length < size) {
        subArr.unshift(0);
        return subArr;
      }
      return subArr;
    })
    const relSize = 100 / (size) + '%';
    const sideHintSubField = createElement('div', 'game-subfield', 'hint-field');
    sideHintSubField.style.flexGrow = size;
    for (let row = 0; row < arr.length; row += 1) {
      for (let column = 0; column < size; column += 1) {
        const cell = createCell(row, column);
        cell.textContent = modifiedArr[row][column];
        if (!modifiedArr[row][column]) cell.classList.add('hidden-content');
        const style = cell.style;
        style.flexBasis = relSize;
        sideHintSubField.append(cell);
      }
    }
    return sideHintSubField;
  },
  
  createAboveHintField() {
    const arr = this.countColumnSequences(this.solution);
    const reverseArr = arr.map((subArr) => subArr.reverse());
    let size = 0;
    for (const subArr of arr) {
      size = Math.max(size, subArr.length);
    };
    const relSize = 100 / (arr.length) + '%';
    const aboveHintSubField = createElement('div', 'game-subfield', 'hint-field');
    aboveHintSubField.style.flexGrow = arr.length;
    for (let row = size; row > 0; row -= 1) {
      for (let column = 0; column < arr.length; column += 1) {
        const cell = createCell(row, column);
        if (reverseArr[column][row - 1]) {
          cell.textContent = reverseArr[column][row - 1];
        } else {
          cell.textContent = 0;
          cell.classList.add('hidden-content');
        }
        const style = cell.style;
        style.flexBasis = relSize;
        aboveHintSubField.append(cell);
      }
    }

    return aboveHintSubField;
  },

  createCrossField() {
    let rowsQty = 0;
    let columnsQty = 0;
    for (const subArr of this.countColumnSequences(this.solution)) {
      rowsQty = Math.max(rowsQty, subArr.length);
    };
    for (const subArr of this.countRowSequences(this.solution)) {
      columnsQty = Math.max(columnsQty, subArr.length);
    };
    const relSize = 100 / (columnsQty) + '%';
    const crossField = createElement('div', 'game-subfield', 'hint-field');
    crossField.style.flexGrow = columnsQty;
    for (let row = 0; row < rowsQty; row += 1) {
      for (let column = 0; column < columnsQty; column += 1) {
        const cell = createCell(row, column);
        cell.classList.add('hidden-content');
        cell.style.flexBasis = relSize;
        cell.textContent = 0;
        crossField.append(cell);
      }
    }
    return crossField;
  },

  isWin: () => {
    const win = GameField.state.every((row, rowIndex) => row.every((element, columnIndex) => element === GameField.solution[rowIndex][columnIndex]));
    return win;
  },

  clearState() {
    this.state.forEach((subArr) => subArr.fill(false));
  },
}