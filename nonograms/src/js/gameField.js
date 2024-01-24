import { createElement } from "./createElement.js";

function createCell (row, column) {
  const element = createElement('div', 'cell');
  element.dataset['row'] = row;
  element.dataset['column'] = column;
  return element;
}

export const GameField = {
  answer: [],
  state: [],

  fillCell: (event) => {
    event.currentTarget.classList.remove('marked');
    event.currentTarget.classList.toggle('filled');
    const row = event.target.dataset.row;
    const column = event.target.dataset.column;
    GameField.state[row][column] = !(GameField.state[row][column]);
    const win = GameField.state.every((row, rowIndex) => row.every((element, columnIndex) => element === GameField.answer[rowIndex][columnIndex]));
    console.log(win);
  },

  markCell: (event) => {
    event.currentTarget.classList.remove('filled');
    event.currentTarget.classList.toggle('marked');
    event.preventDefault();
    console.log(this.state);
  },

  countRowSequences (arr) {
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

  countColumnSequences (arr) {
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


  createGameField (arr) {
    const size = arr.length;
    const relSize = 100 / (size) + '%';
    const gameField = createElement('section', 'game-field');
    for (let row = 0; row < size; row += 1) {
      this.answer.push(arr[row]);
      this.state.push([]);
      for (let column = 0; column < size; column += 1) {
        this.state[row].push(false);
        const cell = createCell(row, column);
        const style = cell.style;
        style.flexBasis = relSize;
        cell.addEventListener('click', this.fillCell);
        cell.addEventListener('contextmenu', this.markCell);
        gameField.append(cell);
      }
    }
    console.log(this.answer);
    return gameField;
  }
}