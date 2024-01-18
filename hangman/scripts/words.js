import { createElement } from "./createElement.js";

export const words = {
  dictionary: [
    'preference',
    'recognition',
    'president',
    'airport',
    'maintenance',
    'contribution',
    'administration',
    'recording',
    'ability',
    'anxiety',
    'organization',
    'property',
    'tension',
    'solution',
    'marketing',
    'surgery',
    'presence',
    'audience',
    'marriage',
    'addition',
    'student',
    'relationship',
    'employee',
    'payment',
    'assumption',
    'connection',
    'computer',
    'complaint',
    'revenue',
    'elevator',
    'restaurant',
    'college',
    'secretary',
    'celebration',
    'reflection',
    'penalty',
    'quality',
    'setting',
    'reputation',
    'agreement',
    'mixture',
    'software',
    'philosophy',
    'alcohol',
    'feedback',
    'funeral',
    'statement',
    'pollution',
    'difficulty',
    'chemistry',
  ],

  secretWord: '',
  totalAttempts: 6,
  incorrectCount: 0,
  explanationTryBoardCounter: 'Incorrect guesses:',
  dividerTryBoardCounter: '/',
  closeToWin: 0,
  getSecretWordLength() {
    return this.secretWord.length;
  },
  newSecretWord() {
    this.secretWord = this.dictionary[Math.floor(Math.random() * this.dictionary.length)].toUpperCase();
    this.closeToWin = this.secretWord.length;
  },
  createWordElement() {
    this.newSecretWord();
    const word = createElement('div', 'word');
    const lettersArr = this.createLettersElements();
    for (let i = 0; i < lettersArr.length; i += 1) {
      word.appendChild(lettersArr[i]);
    }
    return (word);
  },
  createLettersElements() {
    const letters = [];
    for (let i = 0; i < words.secretWord.length; i += 1) {
      const letter = createElement('div', 'letter');
      letter.textContent = '_';
      letters.push(letter);
    }
    return letters;
  },
  updateLetters() {
    const lettersArr = this.createLettersElements();
    const wordElement = document.querySelector('.word');
    wordElement.textContent = '';
    for (let i = 0; i < lettersArr.length; i += 1) {
      wordElement.appendChild(lettersArr[i]);
    };
  },
  showGuessedLetters(letter) {
    let isGuessed = false;
    const letters = document.querySelectorAll('.letter');
    for (let i = 0; i < words.secretWord.length; i += 1) {
      if (letter === words.secretWord[i]) {
        letters[i].textContent = words.secretWord[i];
        isGuessed = true;
        this.closeToWin -= 1;
      };
    }
    if (!isGuessed) this.incorrectCount += 1;
    return isGuessed;
  },
  createTryBoardElement() {
    const tryBoard = createElement('div', 'try-board');
    const explanation = createElement('div', 'guess');
    explanation.textContent = this.explanationTryBoardCounter;
    const counter = createElement('div', 'guess', 'counter');
    counter.textContent = this.incorrectCount;
    const divider = createElement('div', 'guess', 'counter');
    divider.textContent = this.dividerTryBoardCounter;
    const overallAttempts = createElement('div', 'guess', 'counter');
    overallAttempts.textContent = this.totalAttempts;
    tryBoard.appendChild(explanation);
    tryBoard.appendChild(counter);
    tryBoard.appendChild(divider);
    tryBoard.appendChild(overallAttempts);
    return tryBoard;
  },
  updateCounter() {
    document.querySelector('.counter').textContent = this.incorrectCount;
  },
  gameStatus() {
    if (this.closeToWin === 0) return 'win';
    if (this.incorrectCount === this.totalAttempts) return 'lose';
    return 'gaming';
  },
}