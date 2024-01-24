import '../styles/main.scss';
import { GameField } from './gameField.js';
import { createElement } from './createElement.js';
import { easy1 } from './nonograms.js';



const body = document.body;
const main = createElement('main');
body.append(main);
const gameField = GameField.createGameField(easy1);
console.log(GameField.countColumnSequences(easy1));
main.append(gameField);
// console.log(GameField.createGameField(1));