import { createElement } from './createElement.js';
import { Nonograms, generateSVG } from './nonograms.js';
import { loadGame, resetGame, saveGame, startGame } from './gameProcess.js';

export let theme = '';

function toggleTheme() {
  themeButton.firstElementChild.classList.toggle('hidden');
  themeButton.lastElementChild.classList.toggle('hidden');
  document.body.classList.toggle('dark-mode');
  if (theme === 'day') {
    theme = 'night';
  } else {
    theme = 'day';
  }
  localStorage.setItem('theme', theme);
}

const header = createElement('header');
export const themeButton = createElement('div', 'button');
themeButton.addEventListener('click', toggleTheme);
const sunIcon = '<svg class="icon right-offset" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><rect fill="none" height="24" width="24"/><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>';
const moonIcon = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"  viewBox="0 0 24 24"><rect fill="none" height="24" width="24"/><path d="M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z"/></svg>'
themeButton.innerHTML = sunIcon + moonIcon;
if (theme === 'day') {
  themeButton.firstElementChild.classList.add('hidden');
} else {
  themeButton.lastElementChild.classList.add('hidden');
}
(function () {
  if (localStorage.getItem('theme')) {
    theme = localStorage.getItem('theme');
  } else {
    theme = 'day';
    localStorage.setItem('theme', theme);
  }
  if (theme === 'night') {
    themeButton.firstElementChild.classList.toggle('hidden');
    themeButton.lastElementChild.classList.toggle('hidden');
    document.body.classList.toggle('dark-mode');
  }
}());
header.append(themeButton);
export const main = createElement('main');
export const menu = createElement('section', 'select-container');
export const controlPanel = createElement('section', 'select-container');
export const restartButton = createElement('div', 'button', 'no-interactive');
restartButton.innerHTML = '<svg class="icon no-interactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M483.077-200q-117.25 0-198.625-81.339-81.375-81.34-81.375-198.539 0-117.199 81.375-198.661Q365.827-760 483.077-760q71.308 0 133.538 33.884 62.231 33.885 100.308 94.577V-740q0-8.5 5.758-14.25T736.95-760q8.512 0 14.243 5.75 5.73 5.75 5.73 14.25v156.923q0 13.731-9.288 23.02-9.289 9.288-23.019 9.288H567.692q-8.5 0-14.25-5.758t-5.75-14.269q0-8.512 5.75-14.242 5.75-5.731 14.25-5.731h128q-31.231-59.846-87.884-94.539Q551.154-720 483.077-720q-100 0-170 70t-70 170q0 100 70 170t170 70q71.468 0 130.849-38.731 59.382-38.73 88.074-102.884 3.385-7.846 10.962-11.039 7.577-3.192 15.505-.5 8.456 2.693 11.226 11 2.769 8.308-.616 16.154-33.308 75.385-102.388 120.693Q567.609-200 483.077-200Z"/></svg>';
restartButton.addEventListener('click', resetGame);
export const timerBlock = createElement('div', 'timer');
timerBlock.textContent = '00:00';
export const saveButton = createElement('div', 'button', 'no-interactive');
saveButton.innerHTML = '<svg class="icon no-interactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M224.615-160Q197-160 178.5-178.5 160-197 160-224.615v-510.77Q160-763 178.5-781.5 197-800 224.615-800h411.616q12.923 0 25.115 5.231 12.193 5.23 20.885 13.923l98.615 98.615q8.693 8.692 13.923 20.885Q800-649.154 800-636.231v411.616Q800-197 781.5-178.5 763-160 735.385-160h-510.77ZM760-646 646-760H224.615q-10.769 0-17.692 6.923T200-735.385v510.77q0 10.769 6.923 17.692T224.615-200h510.77q10.769 0 17.692-6.923T760-224.615V-646ZM480-298.461q33.077 0 56.539-23.462Q560-345.384 560-378.461T536.539-435Q513.077-458.462 480-458.462T423.461-435Q400-411.538 400-378.461t23.461 56.538q23.462 23.462 56.539 23.462Zm-176.923-270.77h232.308q13.923 0 23.115-9.192 9.193-9.192 9.193-23.115v-55.385q0-13.923-9.193-23.116-9.192-9.192-23.115-9.192H303.077q-13.923 0-23.116 9.192-9.192 9.193-9.192 23.116v55.385q0 13.923 9.192 23.115 9.193 9.192 23.116 9.192ZM200-646v446-560 114Z"/></svg>';
saveButton.addEventListener('click', saveGame);
export const loadButton = createElement('div', 'button');
loadButton.innerHTML = '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480.769-160q-66.598 0-124.761-25.038-58.162-25.039-101.662-68.539-43.5-43.5-68.539-101.648-25.038-58.149-25.038-124.731 0-66.583 25.038-124.775 25.039-58.192 68.539-101.692 43.5-43.5 101.662-68.539Q414.171-800 480.769-800q68.923 0 131.27 28.461 62.346 28.462 108.73 79.385v-75.538q0-8.5 5.758-14.25t14.27-5.75q8.511 0 14.242 5.75 5.731 5.75 5.731 14.25v113.846q0 13.731-9.289 23.019-9.288 9.289-23.019 9.289H614.616q-8.501 0-14.251-5.758t-5.75-14.269q0-8.512 5.75-14.242 5.75-5.731 14.251-5.731h79.23q-41.769-46-96.384-72.231Q542.846-760 480.769-760q-117 0-198.5 81.5t-81.5 198.5q0 117 81.5 198.5t198.5 81.5q98.846 0 175-62t97.846-157.385q2.693-9.076 9.154-14 6.462-4.923 15.003-3.692 9.074 1.231 13.305 8.731T792.846-412Q770-301.461 683-230.731 596-160 480.769-160Zm20-328.308 120 120q5.616 5.616 6 13.769.385 8.154-6 14.539-6.384 6.385-14.154 6.385-7.769 0-14.154-6.385l-122-122q-5.23-5.231-7.461-10.975t-2.231-11.871V-660q0-8.5 5.758-14.25t14.269-5.75q8.512 0 14.243 5.75 5.73 5.75 5.73 14.25v171.692Z"/></svg>';
if (!localStorage.getItem('totalSeconds')) {
  loadButton.classList.add('no-interactive');
  loadButton.firstElementChild.classList.add('no-interactive');
};
loadButton.addEventListener('click', loadGame);
controlPanel.append(restartButton, timerBlock, saveButton, loadButton);

(function () {
  for (let game in Nonograms) {
    const gameSelectButton = createElement('div', 'card');
    gameSelectButton.innerHTML = generateSVG(Nonograms[game]);
    gameSelectButton.id = game;
    gameSelectButton.addEventListener('click', startGame);
    menu.append(gameSelectButton);
  }
}());

document.body.append(header);
main.append(menu);
main.append(controlPanel);

