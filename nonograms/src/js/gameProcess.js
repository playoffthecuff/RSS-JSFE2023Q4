import { modalContainer } from "./modalWindow";

const replayButton = document.querySelector('.replay-icon');

export function finishGame() {
  modalContainer.classList.remove('hidden');
}

export function startGame() {
  modalContainer.classList.add('hidden');
}