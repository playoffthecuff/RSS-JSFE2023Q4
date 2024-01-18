import { createElement } from "./createElement.js";

const keysIDs = new Set();

export const keyboard = {
  keys: [],
  disabledKeys: [],
  disabledLetters: [],
  createKeyboard() {
    const keyBoard = createElement('div', 'keyboard');
    for (let i = 65; i < 91; i += 1) {
      const key = createElement('div', 'key');
      key.id = `key${i - 65}`;
      key.textContent = String.fromCharCode(i);
      keyBoard.appendChild(key);
      this.keys.push(String.fromCharCode(i));
    }
    return keyBoard;
  },
  disableKey(keyId) {
    const id = keyId;
    const index = Number(keyId.slice(3));
    const key = document.getElementById(id);
    key.classList.add('disabled');
    this.disabledKeys.push(key);
    keysIDs.add(index);
  },
  enableKeyboard() {
    const {length} = this.disabledKeys;
    for (let i = 0; i < length; i += 1) {
      this.disabledKeys.shift().classList.remove('disabled');
    }
    keysIDs.clear();
  },
  isKeyDisabled(letter) {
    const index = this.keys.indexOf(letter);
    return keysIDs.has(index);
  }
}