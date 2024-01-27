import '../styles/main.scss';
import { GameField } from './gameField.js';
import { createElement } from './createElement.js';
import { easy1 } from './nonograms.js';



const body = document.body;
const main = createElement('main');
body.append(main);
const gameField = createElement('section', 'game-field');
const aboveField =  createElement('section', 'game-field')
const gameSubField = GameField.createGameSubField(easy1);
const sideHintSubField = GameField.createSideHintField();
const aboveHintSubField = GameField.createAboveHintField();
const crossField = GameField.createCrossField();
aboveField.append(crossField);
aboveField.append(aboveHintSubField);
gameField.append(sideHintSubField);
gameField.append(gameSubField);
main.append(aboveField);
main.append(gameField);


// console.log(GameField.createGameField(1));