import Component from '../components/base-component';
import LoginForm from '../components/login-form/login-form';
import StartPage from '../components/start-page/start-page';
import isUserStored from '../services/isUserStored';
import Header from '../components/header/header';

export default class App extends Component {
  private header;

  private startPage;

  constructor() {
    super('div', ['wrapper']);
  }

  startApp() {
    if (isUserStored()) {
      this.header = new Header(() => this.restartApp());
      this.appendChild(this.header);
      this.startPage = new StartPage();
      this.appendChild(this.startPage);
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
