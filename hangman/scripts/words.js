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
  createQuestionElement() {
    const question = createElement('div', 'question');
    question.textContent = this.questions[this.dictionary.indexOf(this.secretWord.toLowerCase())];
    return question;
  },
  createWordElement() {
    this.newSecretWord();
    const word = createElement('div', 'word');
    const lettersArr = this.createLettersElements();
    for (let i = 0; i < lettersArr.length; i += 1) {
      word.appendChild(lettersArr[i]);
    }
    return word;
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
  updateQuestion() {
    const questionElement = document.querySelector('.question');
    questionElement.textContent = this.questions[this.dictionary.indexOf(this.secretWord.toLowerCase())];
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

  questions: [
    'a greater interest in or desire for somebody/something than somebody/something else',
    'the act of remembering who somebody is when you see them, or of identifying what something is',
    'the leader of a country',
    'a place where planes land and take off and that has buildings for passengers to wait in',
    'the act of keeping something in good condition by checking or repairing it regularly',
    'a gift or payment that is made to a person or an organization in order to help pay for something',
    'the activities that are done in order to plan, organize and run a business, school or other institution',
    'sound or pictures that have been recorded on computer files or on CD, DVD, video, etc',
    'the fact that somebody/something is able to do something',
    'the state of feeling nervous or worried that something bad is going to happen',
    'a group of people who form a business, club, etc. together in order to achieve a particular aim',
    'a thing or things that are owned by somebody',
    'a situation in which people do not trust each other',
    'a way of solving a problem or dealing with a difficult situation',
    'the activity of presenting, advertising and selling a company’s products in the best way',
    'medical treatment of injuries or diseases that involves cutting open a person’s body',
    'the fact of being in a particular place',
    'the group of people who have gathered to watch or listen to something',
    'the legal relationship between two people who are married to each other',
    'a thing that is added to something else',
    'a person who is studying at a university or college',
    'the way in which two people, groups or countries behave towards each other or deal with each other',
    'a person who is paid to work for somebody',
    'the act of paying somebody/something or of being paid',
    ' a belief or feeling that something is true or that something will happen, although there is no proof',
    'something that connects two facts, ideas, etc',
    'an electronic machine that can store, organize and find information, do processes with numbers and other data',
    'a statement that somebody makes saying that they are not satisfied',
    'the money that a government receives from taxes or that an organization, etc. receives from its business',
    'a machine that carries people or goods up and down to different levels in a building or a mine',
    'a place where you can buy and eat a meal',
    'a place where students go to study or to receive training after they have left school',
    'a person who works in an office, working for another person, dealing with mail and phone calls, etc',
    'a special event that people organize in order to celebrate something',
    'an image in a mirror, on a shiny surface, on water, etc',
    'a punishment for breaking a law, rule or contract',
    'the standard of something when it is compared to other things like it',
    'an environment where something is located; the place at which something happens',
    'the opinion that people have about what somebody/something is like, based on what has happened in the past',
    'an arrangement, a promise or a contract made with somebody',
    'a combination of different things',
    'the programs used by a computer for doing particular jobs',
    'the study of the nature and meaning of the universe and of human life',
    'drinks such as beer, wine, etc. that can make people drunk',
    'advice, criticism or information about how good or useful something or somebody’s work is',
    'a ceremony, often a religious one, for burying or cremating (= burning) a dead person',
    'something that you say or write that gives information or an opinion',
    'the process of making air, water, soil, etc. dirty; the state of being dirty',
    'a problem; a thing or situation that causes problems',
    'the scientific study of the structure of substances, how they react when combined or in contact with one another',
  ],

}