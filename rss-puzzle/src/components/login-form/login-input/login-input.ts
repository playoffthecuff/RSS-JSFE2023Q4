import './login-input.scss';
import Component from '../../base-component';

export default class LoginInput extends Component {
  constructor() {
    super('input', ['login-input'], '');
    this.setAttribute('type', 'text');
    this.setAttribute('required', '');
  }

  isFilled() {
    return (this.getNode() as HTMLInputElement).value.trim() !== '';
  }
}
