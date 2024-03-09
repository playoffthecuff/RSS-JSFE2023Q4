import './login-input.scss';
import Component from '../../base-component';

export default class LoginInput extends Component {
  constructor() {
    super('input', ['login-input'], '');
    this.setAttribute('type', 'text');
    this.setAttribute('required', '');
  }

  getValue() {
    return (this.getNode() as HTMLInputElement).value;
  }

  isFilled() {
    return this.getValue().trim() !== '';
  }

  isFirstLetterUpperCase() {
    if (this.getValue()[0]) {
      return this.getValue()[0].toUpperCase() === this.getValue()[0];
    }
    return false;
  }

  isLettersCorrect() {
    return /^[a-zA-Z-]+$/.test(this.getValue());
  }

  isStrLengthEnough(length: number) {
    return this.getValue().length >= length;
  }
}
