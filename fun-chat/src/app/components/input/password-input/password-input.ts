import styles from './password-input.module.scss';
import Input from '../input';

export default class PasswordInput extends Input {
  constructor(placeholder?: string) {
    super(styles.passwordInput);
    this.setAttribute('type', 'password');
    if (placeholder) this.setAttribute('placeholder', placeholder);
  }

  setInvalid() {
    this.addClass(styles.invalid);
  }

  setValid() {
    this.removeClass(styles.invalid);
  }
}