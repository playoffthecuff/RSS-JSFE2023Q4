import './style.scss';
import App from './app/app';

const app = new App();
app.startApp();

document.body.appendChild(app.getNode());
