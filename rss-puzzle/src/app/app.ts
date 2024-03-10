import Component from '../components/base-component';
import LoginForm from '../components/login-form/login-form';
import StartPage from '../components/start-page/start-page';
import isUserStored from '../services/isUserStored';
import Header from '../components/header/header';
import MainPage from '../components/main-page/main-page';

export default class App extends Component {
  private header: Header | null | undefined;

  private startPage: StartPage | null | undefined;

  private mainPage: MainPage | null | undefined;

  constructor() {
    super('div', ['wrapper']);
  }

  startApp() {
    if (isUserStored()) {
      this.header = new Header(() => this.restartApp());
      this.appendChild(this.header);
      this.startPage = new StartPage(() => this.startGame());
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

  startGame() {
    if (this.startPage?.getNode()) {
      this.node.removeChild(this.startPage.getNode());
    }
    this.startPage = null;
    this.mainPage = new MainPage();
    this.appendChild(this.mainPage);
  }
}
