import { createElement } from "./createElement.js";
import { words } from "./words.js";

export const modal = {
  answerPreMessage: 'The secret word is',
  winPreMessage: 'Congratulations: ',
  winPostMessage: 'You Win!',
  losePreMessage: 'Sorry: ',
  losePostMessage: 'You Lose!',
  createModalContainer() {
    const modalContainer = createElement('div', 'modal-container', 'hidden');
    const modalWindow = createElement('div', 'modal-window', 'hidden');
    modalContainer.appendChild(modalWindow);
    const verdictWrapper = createElement('div', 'verdict-wrapper');
    modalWindow.appendChild(verdictWrapper);
    const verdictMessage = createElement('span', 'verdict-message');
    verdictWrapper.appendChild(verdictMessage);
    const highlightSpan = createElement('span', 'highlight');
    verdictWrapper.appendChild(highlightSpan);
    const answerMessage = createElement('div', 'answer');
    answerMessage.textContent = this.answerPreMessage;
    modalWindow.appendChild(answerMessage);
    const secretWordMessage = createElement('div', 'secret-word');
    secretWordMessage.textContent = words.secretWord;
    modalWindow.appendChild(secretWordMessage);
    const replayButton = createElement('div', 'replay-button');
    replayButton.innerHTML = `<svg class="replay-icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
    <path d="M480-80q-75 0-140.5-28T225-185q-49-49-77-114.5T120-440h60q0 125 87.5 212.5T480-140q125 0 212.5-87.5T780-440q0-125-85-212.5T485-740h-23l73 73-41 42-147-147 147-147 41 41-78 78h23q75 0 140.5 28T735-695q49 49 77 114.5T840-440q0 75-28 140.5T735-185q-49 49-114.5 77T480-80Z"/>
  </svg>`;
    modalWindow.appendChild(replayButton);
    return modalContainer;
  },
  showModal(result) {
    document.querySelector('.verdict-message').textContent = result === 'win' ? this.winPreMessage : this.losePreMessage;
    document.querySelector('.highlight').textContent = result === 'win' ? this.winPostMessage : this.losePostMessage;
    document.querySelector('.secret-word').textContent = words.secretWord;
    document.querySelector('.modal-container').classList.remove('hidden');
    document.querySelector('.modal-window').classList.remove('hidden');
    document.body.classList.add('no-scroll');
  },
  hideModal() {
    document.querySelector('.modal-container').classList.add('hidden');
    document.querySelector('.modal-window').classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
}