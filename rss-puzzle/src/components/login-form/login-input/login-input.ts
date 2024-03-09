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

  isFirstLetterUpperCase() {
    if ((this.getNode() as HTMLInputElement).value[0]) {
      return (
        (this.getNode() as HTMLInputElement).value[0].toUpperCase() ===
        (this.getNode() as HTMLInputElement).value[0]
      );
    }
    return false;
  }

  isLettersCorrect() {
    return /^[a-zA-Z-]+$/.test((this.getNode() as HTMLInputElement).value);
  }

  isStrLengthEnough(length: number) {
    return (this.getNode() as HTMLInputElement).value.length >= length;
  }
}
