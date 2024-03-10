import Component from '../components/base-component';
import LoginForm from '../components/login-form/login-form';
import StartPage from '../components/start-page/start-page';
import isUserStored from '../services/isUserStored';

export default class App extends Component {
  constructor() {
    super('div', ['wrapper']);
  }

  startApp() {
    if (isUserStored()) {
      const startPage = new StartPage(() => this.restartApp());
      this.appendChild(startPage);
      startPage.setParent(this);
    } else {
      this.appendChild(new LoginForm(() => this.restartApp()));
    }
  }

  stopApp() {
    this.removeChildren();
  }

  restartApp() {
    this.stopApp();
    this.startApp();
  }
}
