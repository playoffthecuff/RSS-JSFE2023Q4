import './style.scss';
import LoginForm from './components/login-form/login-form';

const app = new LoginForm();

document.body.appendChild(app.getNode());
