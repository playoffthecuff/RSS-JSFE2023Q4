import '../styles/main.scss';
import { modalContainer } from './modalWindow.js';
import { main } from './createLayout.js';

const body = document.body;
body.append(modalContainer);

body.append(main);