import { createElement } from "./createElement.js";

export const keyboard = {
  keys: [],
  disabledKeys: [],
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
    const key = document.getElementById(id);
    key.classList.add('disabled');
    this.disabledKeys.push(key);
  },
  enableKeyboard() {
    const {length} = this.disabledKeys;
    for (let i = 0; i < length; i += 1) {
      this.disabledKeys.shift().classList.remove('disabled');
    }
  }
}