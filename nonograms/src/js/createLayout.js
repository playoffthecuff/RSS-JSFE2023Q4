import { createElement } from "./createElement.js";
import {
  NonogramsEasy,
  NonogramsHard,
  NonogramsMedium,
  generateSVG,
} from "./nonograms.js";
import {
  clearCellAudio,
  createRecordsTable,
  disableButton,
  enableButton,
  fillCellAudio,
  loadGame,
  markCellAudio,
  resetGame,
  restartGameAudio,
  saveGame,
  showSolution,
  startGame,
  startGameAudio,
  startRandomGame,
  winGameAudio,
} from "./gameProcess.js";

export let theme = "";
export let records = [];
if (localStorage.getItem("records"))
  records = JSON.parse(localStorage.getItem("records"));

function toggleThemeButton() {
  themeButton.firstElementChild.classList.toggle("hidden");
  themeButton.lastElementChild.classList.toggle("hidden");
}

function toggleTheme() {
  toggleThemeButton();
  document.body.classList.toggle("dark-mode");
  if (theme === "day") {
    theme = "night";
  } else {
    theme = "day";
  }
  localStorage.setItem("theme", theme);
}

function toggleVolumeButton() {
  volumeButton.firstElementChild.classList.toggle("hidden");
  volumeButton.lastElementChild.classList.toggle("hidden");
}

function toggleSound() {
  toggleVolumeButton();
  fillCellAudio.muted = !fillCellAudio.muted;
  markCellAudio.muted = !markCellAudio.muted;
  clearCellAudio.muted = !clearCellAudio.muted;
  restartGameAudio.muted = !restartGameAudio.muted;
  startGameAudio.muted = !startGameAudio.muted;
  winGameAudio.muted = !winGameAudio.muted;
}

const header = createElement("header");
export const themeButton = createElement("div", "button");
themeButton.addEventListener("click", toggleTheme);
const sunIcon =
  '<svg style="stroke:none" class="icon mode right-offset rotor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"><path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z"/></svg>';
const moonIcon =
  '<svg style="stroke:none" class="icon mode rotor" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"  viewBox="0 0 24 24"><path d="M11.01,3.05C6.51,3.54,3,7.36,3,12c0,4.97,4.03,9,9,9c4.63,0,8.45-3.5,8.95-8c0.09-0.79-0.78-1.42-1.54-0.95 c-0.84,0.54-1.84,0.85-2.91,0.85c-2.98,0-5.4-2.42-5.4-5.4c0-1.06,0.31-2.06,0.84-2.89C12.39,3.94,11.9,2.98,11.01,3.05z"/></svg>';
themeButton.innerHTML = sunIcon + moonIcon;
if (theme === "day") {
  themeButton.lastElementChild.classList.add("hidden");
} else {
  themeButton.firstElementChild.classList.add("hidden");
}
(function () {
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  } else {
    theme = "day";
    localStorage.setItem("theme", theme);
  }
  if (theme === "night") {
    toggleThemeButton();
    document.body.classList.toggle("dark-mode");
  }
})();
const volumeButton = createElement("div", "button", "left-offset");
volumeButton.addEventListener("click", toggleSound);
const volumeUpIcon =
  '<svg class="icon mode right-offset hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M747.692-481q0-81.995-44.417-149.665-44.418-67.67-119.121-101.258-8.077-3.923-12-11.116-3.923-7.192-.671-14.748 3.902-8.059 12.863-10.444 8.962-2.385 18.039 1.538Q686.308-727.539 737-650.991q50.693 76.548 50.693 169.962 0 93.414-50.693 169.991-50.692 76.577-134.615 115.731-9.077 3.923-18.039 1.538-8.961-2.385-12.863-10.444-3.252-7.556.671-14.748 3.923-7.193 12-11.116 74.703-33.588 119.121-101.258 44.417-67.67 44.417-149.665Zm-438.461 81H204.615q-13.731 0-23.019-9.288-9.289-9.289-9.289-23.019v-95.386q0-13.73 9.289-23.019Q190.884-560 204.615-560h104.616l107.384-107.385q9.77-9.769 22.731-4.486 12.962 5.284 12.962 18.871v346q0 13.587-12.962 18.871-12.961 5.283-22.731-4.486L309.231-400Zm323.077-79.913q0 32.856-12.077 62.192-12.077 29.337-33.771 50.875-6.998 5.385-15.191 1.808-8.192-3.577-8.192-12.5v-206.924q0-8.923 8.192-12.5 8.193-3.577 15.191 1.679 21.694 21.898 33.771 52.206 12.077 30.308 12.077 63.164ZM412.308-606l-86 86h-114v80h114l86 86v-252Zm-100 126Z"/></svg>';
const muteIcon =
  '<svg class="icon mode" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" transform="translate(-10,0)"><path d="M456.923-400H352.307q-13.73 0-23.019-9.288Q320-418.577 320-432.307v-95.386q0-13.73 9.288-23.019Q338.577-560 352.307-560h104.616l107.385-107.385q9.769-9.769 22.731-4.486Q600-666.587 600-653v346q0 13.587-12.961 18.871-12.962 5.283-22.731-4.486L456.923-400ZM360-440h114l86 86v-252l-86 86H360v80Zm100-40Z"/></svg>';
volumeButton.innerHTML = volumeUpIcon + muteIcon;
header.append(volumeButton, themeButton);

export const main = createElement("main");
export const levelPicker = createElement("section", "container");
export const recordsTable = createElement(
  "section",
  "container",
  "border",
  "hidden"
);
const recordsTableHeader = createElement("div", "header");
const closeButton = createElement("div", "button");
closeButton.innerHTML =
  '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-437.847 277.076-234.924q-8.307 8.308-20.884 8.5-12.576.193-21.268-8.5-8.693-8.692-8.693-21.076t8.693-21.076L437.847-480 234.924-682.924q-8.308-8.307-8.5-20.884-.193-12.576 8.5-21.268 8.692-8.693 21.076-8.693t21.076 8.693L480-522.153l202.924-202.923q8.307-8.308 20.884-8.5 12.576-.193 21.268 8.5 8.693 8.692 8.693 21.076t-8.693 21.076L522.153-480l202.923 202.924q8.308 8.307 8.5 20.884.193 12.576-8.5 21.268-8.692 8.693-21.076 8.693t-21.076-8.693L480-437.847Z" /></svg>';
recordsTableHeader.append(closeButton);
let recordsTableContent = createRecordsTable();
recordsTable.append(recordsTableHeader, recordsTableContent);
export const randomGameButton = createElement("div", "button");
randomGameButton.innerHTML =
  '<svg version="1.1" class = "icon rotor" viewBox="0 0 768 768" xmlns="http://www.w3.org/2000/svg"><g id="g14" transform="translate(83.249857,62.175506)"><path d="m 283.59033,27.338416 c 24.87566,-1.092603 49.18988,1.913195 72.94265,9.017502 61.5227,22.278534 123.0443,44.557067 184.567,66.835602 26.86278,12.3614 42.88806,32.69534 48.07584,61.00075 0.73716,83.80972 0.73716,167.61944 0,251.42916 -4.72028,35.41863 -21.11358,64.5929 -49.18103,87.52281 -63.18049,36.86461 -126.17641,73.9955 -188.98777,111.39267 -32.27158,17.13007 -64.69128,17.48335 -97.25686,1.06089 C 185.51785,575.92291 116.99597,536.67025 48.184528,497.83983 27.123997,475.76711 14.782323,449.77549 11.16061,419.86496 11.347387,332.15862 12.452579,244.45864 14.476185,156.76609 19.473861,130.76279 34.393948,112.19735 59.236445,101.06976 117.81159,80.205376 176.38675,59.34206 234.9619,38.477683 c 15.9435,-5.4192 32.15335,-9.132289 48.62843,-11.139267 z" id="path3" style="stroke-width:34.6499; fill:none" /> <path d="m 440.5,127.5 c 12.821,-1.245 25.154,0.588 37,5.5 14.819,5.504 21.652,16.004 20.5,31.5 -4.298,10.296 -11.798,17.129 -22.5,20.5 -23.668,8.394 -45.668,5.394 -66,-9 -11.673,-13.938 -10.339,-26.604 4,-38 8.435,-5.228 17.435,-8.728 27,-10.5 z" id="path4" transform="translate(-150,-40.719488)" /><path d="m 664.5,172.5 c 18.323,0.488 26.49,9.822 24.5,28 -1.647,4.656 -4.48,8.489 -8.5,11.5 -63.123,30.728 -126.123,61.728 -189,93 -8.037,5.899 -13.204,13.733 -15.5,23.5 -0.333,96.333 -0.667,192.667 -1,289 -4.267,14.893 -14.1,20.726 -29.5,17.5 -8.112,-3.112 -12.945,-8.946 -14.5,-17.5 -0.333,-95 -0.667,-190 -1,-285 -3.867,-12.858 -11.7,-22.358 -23.5,-28.5 -64.452,-28.726 -128.785,-57.726 -193,-87 -12.779,-11.749 -13.113,-23.749 -1,-36 5.578,-3.301 11.578,-4.301 18,-3 64,29.333 128,58.667 192,88 18.75,6.164 37.416,5.831 56,-1 61.968,-31.151 123.968,-61.984 186,-92.5 z" id="path5" transform="translate(-150,-40.719488)" /><path d="m 229.5,250.5 c 14.975,-0.762 25.808,5.571 32.5,19 10.534,24.048 8.2,46.715 -7,68 -15.958,12.223 -29.958,10.223 -42,-6 -12.898,-23.279 -12.565,-46.279 1,-69 4.211,-5.394 9.377,-9.394 15.5,-12 z" id="path6" transform="translate(-150,-40.719488)" /><path d="m 657.5,250.5 c 15.897,-0.613 27.063,6.387 33.5,21 8.448,21.497 6.782,42.164 -5,62 -10.657,13.352 -23.157,15.519 -37.5,6.5 -11.849,-12.369 -17.516,-27.202 -17,-44.5 0.155,-16.139 6.155,-29.639 18,-40.5 2.891,-1.274 5.558,-2.774 8,-4.5 z" id="path7" transform="translate(-150,-40.719488)" /><path d="m 591.5,362.5 c 11.496,-0.669 20.663,3.664 27.5,13 13.998,23.315 13.998,46.649 0,70 -10.103,12.85 -22.27,15.35 -36.5,7.5 -15.027,-15.084 -20.86,-33.251 -17.5,-54.5 2.645,-16.778 11.478,-28.778 26.5,-36 z" id="path10" transform="translate(-150,-40.719488)" /><path d="m 371.5,485.5 c 11.496,-0.669 20.663,3.664 27.5,13 11.538,18.654 13.538,38.321 6,59 -3.865,11.305 -11.365,18.805 -22.5,22.5 -5.089,0.826 -10.089,0.492 -15,-1 -13.768,-9.019 -21.268,-21.852 -22.5,-38.5 -2.899,-19.973 2.934,-36.806 17.5,-50.5 3.092,-1.546 6.092,-3.046 9,-4.5 z" id="path12" transform="translate(-150,-40.719488)" /><path d="m 528.5,485.5 c 9.446,-0.463 17.613,2.537 24.5,9 15.28,21.219 17.613,43.885 7,68 -9.168,17.664 -22.668,22.164 -40.5,13.5 -14.777,-14.762 -20.611,-32.595 -17.5,-53.5 2.231,-17.351 11.064,-29.684 26.5,-37 z" id="path13" transform="translate(-150,-40.719488)" /></g></svg>';
export const easyLevelButton = createElement("div", "button", "no-interactive");
easyLevelButton.innerHTML =
  '<svg class="icon no-interactive" viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M 480,-300 Z" id="path8" /><path d="m 477.692,-675.433 q 12.21431,0 21.10716,-8.89284 8.89284,-8.89285 8.89284,-21.10716 0,-12.21431 -8.89284,-21.10716 -8.89285,-8.89284 -21.10716,-8.89284 -12.21431,0 -21.10716,8.89284 -8.89284,8.89285 -8.89284,21.10716 0,12.21431 8.89284,21.10716 8.89285,8.89284 21.10716,8.89284 z" id="path6" /><path d="m 702.5,-546.25 q 12.21431,0 21.10716,-8.89284 8.89284,-8.89285 8.89284,-21.10716 0,-12.21431 -8.89284,-21.10716 Q 714.71431,-606.25 702.5,-606.25 q -12.21431,0 -21.10716,8.89284 -8.89284,8.89285 -8.89284,21.10716 0,12.21431 8.89284,21.10716 8.89285,8.89284 21.10716,8.89284 z" id="path4-0" /><ellipse style="fill:none;stroke-width:40.0156;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" id="path12" cx="486.18475" cy="479.11279" rx="339.98758" ry="339.99637" transform="matrix(0.99996972,-0.00778243,-0.0092068,-0.99995762,0,0)" /><ellipse style="stroke-width:41.7331;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" id="path15" cx="481.75754" cy="-482.87619" rx="39.13343" ry="39.133442" /><path style="fill:none;stroke-width:40;stroke-linecap:round;stroke-linejoin:round" d="m 307.539,-212.308 c 57.11872,-22.19974 114.23633,-44.39906 171.72446,-44.39906 57.48813,0 115.34226,22.19931 173.19754,44.39906" id="path18" transform="translate(3.32416,13.551527)" /><path style="stroke-width:40;stroke-linecap:round;stroke-linejoin:round" d="M 481.75892,-482.8762 277.692,-562.308" id="path3" /></svg>';
export const mediumLevelButton = createElement("div", "button");
mediumLevelButton.innerHTML =
  '<svg class="icon" viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M 480,-300 Z" id="path8" /><path d="m 677.692,-532.308 q 12.21431,0 21.10716,-8.89284 8.89284,-8.89285 8.89284,-21.10716 0,-12.21431 -8.89284,-21.10716 -8.89285,-8.89284 -21.10716,-8.89284 -12.21431,0 -21.10716,8.89284 -8.89284,8.89285 -8.89284,21.10716 0,12.21431 8.89284,21.10716 8.89285,8.89284 21.10716,8.89284 z" id="path6" /><path d="m 277.692,-532.308 q 12.21431,0 21.10716,-8.89284 8.89284,-8.89285 8.89284,-21.10716 0,-12.21431 -8.89284,-21.10716 -8.89285,-8.89284 -21.10716,-8.89284 -12.21431,0 -21.10716,8.89284 -8.89284,8.89285 -8.89284,21.10716 0,12.21431 8.89284,21.10716 8.89285,8.89284 21.10716,8.89284 z" id="path4" /><ellipse style="fill:none;stroke-width:40.0156;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" id="path12" cx="486.18475" cy="479.11279" rx="339.98758" ry="339.99637" transform="matrix(0.99996972,-0.00778243,-0.0092068,-0.99995762,0,0)" /><ellipse style="stroke-width:41.7331;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" id="path15" cx="481.75754" cy="-482.87619" rx="39.13343" ry="39.133442" /><path style="fill:none;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" d="m 307.539,-212.308 c 57.11872,-22.19974 114.23633,-44.39906 171.72446,-44.39906 57.48813,0 115.34226,22.19931 173.19754,44.39906" id="path18" /><path style="fill:none;stroke-width:40;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:none" d="m 481.75896,-482.8762 -10e-4,-254.38516" id="path20" /></svg>';
export const hardLevelButton = createElement("div", "button");
hardLevelButton.innerHTML =
  '<svg class="icon" viewBox="0 -960 960 960" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M 480,-300 Z" id="path8" /><path d="m 477.692,-675.433 q 12.21431,0 21.10716,-8.89284 8.89284,-8.89285 8.89284,-21.10716 0,-12.21431 -8.89284,-21.10716 -8.89285,-8.89284 -21.10716,-8.89284 -12.21431,0 -21.10716,8.89284 -8.89284,8.89285 -8.89284,21.10716 0,12.21431 8.89284,21.10716 8.89285,8.89284 21.10716,8.89284 z" id="path6" /><path d="m 277.692,-532.308 q 12.21431,0 21.10716,-8.89284 8.89284,-8.89285 8.89284,-21.10716 0,-12.21431 -8.89284,-21.10716 -8.89285,-8.89284 -21.10716,-8.89284 -12.21431,0 -21.10716,8.89284 -8.89284,8.89285 -8.89284,21.10716 0,12.21431 8.89284,21.10716 8.89285,8.89284 21.10716,8.89284 z" id="path4" /><ellipse style="fill:none;stroke-width:40.0156;stroke-linecap:round;stroke-linejoin:round" id="path12" cx="486.18475" cy="479.11279" rx="339.98758" ry="339.99637" transform="matrix(0.99996972,-0.00778243,-0.0092068,-0.99995762,0,0)" /><ellipse style="stroke-width:41.7331;stroke-linecap:round;stroke-linejoin:round" id="path15" cx="481.75754" cy="-482.87619" rx="39.13343" ry="39.133442" /><path style="fill:none;stroke-width:40;stroke-linecap:round;stroke-linejoin:round" d="m 307.539,-212.308 c 57.11872,-22.19974 114.23633,-44.39906 171.72446,-44.39906 57.48813,0 115.34226,22.19931 173.19754,44.39906" id="path18" /><path style="fill:none;stroke-width:40;stroke-linecap:round;stroke-linejoin:round" d="m 466.56441,-477.43953 235.86144,-95.29528" id="path20" /></svg>';
export const showRecordsTableButton = createElement("div", "button");
showRecordsTableButton.innerHTML =
  '<svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M324.669-298.461q13.1 0 21.908-8.862 8.808-8.862 8.808-21.962t-8.862-21.907Q337.661-360 324.561-360t-21.907 8.862q-8.808 8.861-8.808 21.961 0 13.1 8.862 21.908 8.861 8.808 21.961 8.808Zm0-150.77q13.1 0 21.908-8.861 8.808-8.862 8.808-21.962t-8.862-21.908q-8.862-8.807-21.962-8.807t-21.907 8.861q-8.808 8.862-8.808 21.962t8.862 21.908q8.861 8.807 21.961 8.807Zm0-150.769q13.1 0 21.908-8.862 8.808-8.861 8.808-21.961 0-13.1-8.862-21.908-8.862-8.808-21.962-8.808t-21.907 8.862q-8.808 8.862-8.808 21.962t8.862 21.907Q311.569-600 324.669-600Zm143.023 290.769h175.385q8.5 0 14.25-5.757 5.75-5.758 5.75-14.27 0-8.511-5.75-14.242-5.75-5.731-14.25-5.731H467.692q-8.5 0-14.25 5.758t-5.75 14.269q0 8.512 5.75 14.243 5.75 5.73 14.25 5.73Zm0-150.769h175.385q8.5 0 14.25-5.758 5.75-5.757 5.75-14.269t-5.75-14.242q-5.75-5.731-14.25-5.731H467.692q-8.5 0-14.25 5.758-5.75 5.757-5.75 14.269t5.75 14.242q5.75 5.731 14.25 5.731Zm0-150.769h175.385q8.5 0 14.25-5.758t5.75-14.269q0-8.512-5.75-14.243-5.75-5.73-14.25-5.73H467.692q-8.5 0-14.25 5.757-5.75 5.758-5.75 14.27 0 8.511 5.75 14.242 5.75 5.731 14.25 5.731ZM224.615-160Q197-160 178.5-178.5 160-197 160-224.615v-510.77Q160-763 178.5-781.5 197-800 224.615-800h510.77Q763-800 781.5-781.5 800-763 800-735.385v510.77Q800-197 781.5-178.5 763-160 735.385-160h-510.77Zm0-40h510.77q9.23 0 16.923-7.692Q760-215.385 760-224.615v-510.77q0-9.23-7.692-16.923Q744.615-760 735.385-760h-510.77q-9.23 0-16.923 7.692Q200-744.615 200-735.385v510.77q0 9.23 7.692 16.923Q215.385-200 224.615-200ZM200-760v560-560Z"/></svg>';
levelPicker.append(
  randomGameButton,
  easyLevelButton,
  mediumLevelButton,
  hardLevelButton,
  showRecordsTableButton
);
showRecordsTableButton.addEventListener("click", function () {
  disableButton(this);
  recordsTable.classList.remove("hidden");
});
closeButton.addEventListener("click", function () {
  enableButton(showRecordsTableButton);
  recordsTable.classList.add("hidden");
});
randomGameButton.addEventListener("click", startRandomGame);
easyLevelButton.addEventListener("click", function () {
  disableButton(this);
  enableButton(mediumLevelButton);
  enableButton(hardLevelButton);
  if (menuMedium.classList.contains("hidden")) {
    menuHard.classList.add("hidden");
  } else {
    menuMedium.classList.add("hidden");
  }
  menuEasy.classList.remove("hidden");
});
mediumLevelButton.addEventListener("click", function () {
  disableButton(this);
  enableButton(easyLevelButton);
  enableButton(hardLevelButton);
  if (menuEasy.classList.contains("hidden")) {
    menuHard.classList.add("hidden");
  } else {
    menuEasy.classList.add("hidden");
  }
  menuMedium.classList.remove("hidden");
});
hardLevelButton.addEventListener("click", function () {
  disableButton(this);
  enableButton(easyLevelButton);
  enableButton(mediumLevelButton);
  if (menuEasy.classList.contains("hidden")) {
    menuMedium.classList.add("hidden");
  } else {
    menuEasy.classList.add("hidden");
  }
  menuHard.classList.remove("hidden");
});

export function updateRecordsTable() {
  recordsTable.removeChild(recordsTableContent);
  recordsTableContent = createRecordsTable();
  recordsTable.append(recordsTableContent);
}

export const menuEasy = createElement("section", "container");
export const menuMedium = createElement("section", "container", "hidden");
export const menuHard = createElement("section", "container", "hidden");
export const controlPanel = createElement("section", "container");
export const restartButton = createElement("div", "button", "no-interactive");
restartButton.innerHTML =
  '<svg class="icon no-interactive rotor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M483.077-200q-117.25 0-198.625-81.339-81.375-81.34-81.375-198.539 0-117.199 81.375-198.661Q365.827-760 483.077-760q71.308 0 133.538 33.884 62.231 33.885 100.308 94.577V-740q0-8.5 5.758-14.25T736.95-760q8.512 0 14.243 5.75 5.73 5.75 5.73 14.25v156.923q0 13.731-9.288 23.02-9.289 9.288-23.019 9.288H567.692q-8.5 0-14.25-5.758t-5.75-14.269q0-8.512 5.75-14.242 5.75-5.731 14.25-5.731h128q-31.231-59.846-87.884-94.539Q551.154-720 483.077-720q-100 0-170 70t-70 170q0 100 70 170t170 70q71.468 0 130.849-38.731 59.382-38.73 88.074-102.884 3.385-7.846 10.962-11.039 7.577-3.192 15.505-.5 8.456 2.693 11.226 11 2.769 8.308-.616 16.154-33.308 75.385-102.388 120.693Q567.609-200 483.077-200Z"/></svg>';
restartButton.addEventListener("click", resetGame);
export const timerBlock = createElement("div", "timer");
timerBlock.textContent = "00:00";
export const saveButton = createElement("div", "button", "no-interactive");
saveButton.innerHTML =
  '<svg class="icon no-interactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M224.615-160Q197-160 178.5-178.5 160-197 160-224.615v-510.77Q160-763 178.5-781.5 197-800 224.615-800h411.616q12.923 0 25.115 5.231 12.193 5.23 20.885 13.923l98.615 98.615q8.693 8.692 13.923 20.885Q800-649.154 800-636.231v411.616Q800-197 781.5-178.5 763-160 735.385-160h-510.77ZM760-646 646-760H224.615q-10.769 0-17.692 6.923T200-735.385v510.77q0 10.769 6.923 17.692T224.615-200h510.77q10.769 0 17.692-6.923T760-224.615V-646ZM480-298.461q33.077 0 56.539-23.462Q560-345.384 560-378.461T536.539-435Q513.077-458.462 480-458.462T423.461-435Q400-411.538 400-378.461t23.461 56.538q23.462 23.462 56.539 23.462Zm-176.923-270.77h232.308q13.923 0 23.115-9.192 9.193-9.192 9.193-23.115v-55.385q0-13.923-9.193-23.116-9.192-9.192-23.115-9.192H303.077q-13.923 0-23.116 9.192-9.192 9.193-9.192 23.116v55.385q0 13.923 9.192 23.115 9.193 9.192 23.116 9.192ZM200-646v446-560 114Z"/></svg>';
saveButton.addEventListener("click", saveGame);
export const loadButton = createElement("div", "button");
loadButton.innerHTML =
  '<svg class="icon rotor" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480.769-160q-66.598 0-124.761-25.038-58.162-25.039-101.662-68.539-43.5-43.5-68.539-101.648-25.038-58.149-25.038-124.731 0-66.583 25.038-124.775 25.039-58.192 68.539-101.692 43.5-43.5 101.662-68.539Q414.171-800 480.769-800q68.923 0 131.27 28.461 62.346 28.462 108.73 79.385v-75.538q0-8.5 5.758-14.25t14.27-5.75q8.511 0 14.242 5.75 5.731 5.75 5.731 14.25v113.846q0 13.731-9.289 23.019-9.288 9.289-23.019 9.289H614.616q-8.501 0-14.251-5.758t-5.75-14.269q0-8.512 5.75-14.242 5.75-5.731 14.251-5.731h79.23q-41.769-46-96.384-72.231Q542.846-760 480.769-760q-117 0-198.5 81.5t-81.5 198.5q0 117 81.5 198.5t198.5 81.5q98.846 0 175-62t97.846-157.385q2.693-9.076 9.154-14 6.462-4.923 15.003-3.692 9.074 1.231 13.305 8.731T792.846-412Q770-301.461 683-230.731 596-160 480.769-160Zm20-328.308 120 120q5.616 5.616 6 13.769.385 8.154-6 14.539-6.384 6.385-14.154 6.385-7.769 0-14.154-6.385l-122-122q-5.23-5.231-7.461-10.975t-2.231-11.871V-660q0-8.5 5.758-14.25t14.269-5.75q8.512 0 14.243 5.75 5.73 5.75 5.73 14.25v171.692Z"/></svg>';
if (!localStorage.getItem("totalSeconds")) {
  loadButton.classList.add("no-interactive");
  loadButton.firstElementChild.classList.add("no-interactive");
}
loadButton.addEventListener("click", loadGame);
export const showSolutionButton = createElement(
  "div",
  "button",
  "no-interactive"
);
showSolutionButton.innerHTML =
  '<svg class="icon no-interactive" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M480-164.615q-22.154 0-38.154-12.884-16-12.885-18.769-33.116H400q-16.077 0-28.039-11.961Q360-234.538 360-250.615v-120.462q-62.077-34.384-96.039-93.769Q230-524.231 230-590q0-104.846 72.577-177.423T480-840q104.846 0 177.423 72.577T730-590q0 66.231-33.961 125.385-33.962 59.154-96.039 93.538v120.462q0 16.077-11.961 28.039-11.962 11.961-28.039 11.961h-23.077q-2.769 20.231-18.769 33.116-16 12.884-38.154 12.884Zm-80-86h160v-39.077H400v39.077Zm0-69.846h160V-360H400v39.539ZM392-400h70.308v-124.923l-70.847-70.846q-5.153-5.154-5.538-12.154-.385-7 5.538-12.923 5.924-5.923 12.539-5.923 6.615 0 12.539 5.923L480-557.385l63.461-63.461q5.154-5.154 12.154-5.539 7-.384 12.924 5.539 5.923 5.923 5.923 12.538 0 6.616-5.923 12.539l-70.847 70.846V-400H568q54-26 88-76.5T690-590q0-88-61-149t-149-61q-88 0-149 61t-61 149q0 63 34 113.5t88 76.5Zm88-157.385ZM480-600Z"/></svg>';
showSolutionButton.addEventListener("click", showSolution);
controlPanel.append(
  restartButton,
  timerBlock,
  saveButton,
  loadButton,
  showSolutionButton
);

(function () {
  for (let game in NonogramsEasy) {
    const gameSelectButton = createElement("div", "card");
    gameSelectButton.innerHTML = generateSVG(NonogramsEasy[game]);
    gameSelectButton.id = game;
    gameSelectButton.addEventListener("click", startGame);
    menuEasy.append(gameSelectButton);
  }
})();

(function () {
  for (let game in NonogramsMedium) {
    const gameSelectButton = createElement("div", "card");
    gameSelectButton.innerHTML = generateSVG(NonogramsMedium[game]);
    gameSelectButton.id = game;
    gameSelectButton.addEventListener("click", startGame);
    menuMedium.append(gameSelectButton);
  }
})();

(function () {
  for (let game in NonogramsHard) {
    const gameSelectButton = createElement("div", "card");
    gameSelectButton.innerHTML = generateSVG(NonogramsHard[game]);
    gameSelectButton.id = game;
    gameSelectButton.addEventListener("click", startGame);
    menuHard.append(gameSelectButton);
  }
})();

document.body.append(header);
main.append(levelPicker);
main.append(recordsTable);
main.append(menuEasy);
main.append(menuMedium);
main.append(menuHard);
main.append(controlPanel);

console.log(
  "Привет! Клетки игрового поля содержат прозрачный текст решения, который можно увидеть, выделив его. Спасибо за проверку :)"
);
console.log(volumeButton.firstElementChild, volumeButton.lastElementChild);
