import Component from './components/base-component';
import LoginPage from './components/login-page/login-page';

export default class App extends Component {

  constructor(className: string) {
    super(className);
    this.appendChild(new LoginPage());
  }
}