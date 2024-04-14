import styles from './text-input.module.scss';
import Input from '../input';

export default class TextInput extends Input {
  constructor(placeholder?: string, className?: string) {
    super(styles.textInput);
    this.setAttribute('type', 'text');
    if (placeholder) this.setAttribute('placeholder', placeholder);
    if (className) this.addClass(className);
  }

  setInvalid() {
    this.addClass(styles.invalid);
  }

  setValid() {
    this.removeClass(styles.invalid);
  }
}
