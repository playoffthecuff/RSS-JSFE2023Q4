import { gallowsImg } from './gallows-img.js';
import { createElement } from './createElement.js';
import { keyboard } from './keyboard.js';
import { modal } from './modal.js';
import { words } from './words.js';




export const mainElement = createElement('main');
const sectionGallowsElement = createElement('section', 'gallows');
sectionGallowsElement.innerHTML = gallowsImg;
mainElement.appendChild(sectionGallowsElement);

const sectionQuizElement = createElement('section', 'quiz');
mainElement.appendChild(sectionQuizElement);

const wordElement = words.createWordElement();
sectionQuizElement.appendChild(wordElement);
words.letters = wordElement.querySelectorAll('.letter');

const tryBoardElement = words.createTryBoardElement();
sectionQuizElement.appendChild(tryBoardElement);

words.incorrectCountElement = tryBoardElement.querySelector('.counter');

const keyBoardElement = keyboard.createKeyboard();
sectionQuizElement.appendChild(keyBoardElement);

keyboard.keysElements = keyBoardElement.querySelectorAll('.key');

export const modalContainer = modal.createModalContainer();
