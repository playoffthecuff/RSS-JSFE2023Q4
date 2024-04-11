import styles from './text-input.module.scss';
import Input from '../input';

export default class TextInput extends Input {
  constructor(placeholder?: string) {
    super(styles.textInput);
    this.setAttribute('type', 'text');
    if (placeholder) this.setAttribute('placeholder', placeholder);
  }
}