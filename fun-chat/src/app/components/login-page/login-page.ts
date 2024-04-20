import styles from './login-page.module.scss';
import Component from '../base-component';
import LoginForm from '../login-form/login-form';

export default class LoginPage extends Component {
  constructor() {
    super(styles.main, 'main');
    this.appendChild(new LoginForm());
  }
}
