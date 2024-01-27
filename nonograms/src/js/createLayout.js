import { GameField } from './gameField.js';
import { createElement } from './createElement.js';
import { easy1 } from './nonograms.js';


export const main = createElement('main');
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


