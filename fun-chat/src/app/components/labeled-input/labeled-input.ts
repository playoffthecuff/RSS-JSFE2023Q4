import styles from './labeled-input.module.scss';
import Component from '../base-component';
import TextInput from '../input/text-input/text-input';
import PasswordInput from '../input/password-input/password-input';

export default class LabeledTextInput extends Component {
  private input;

  protected override readonly element: HTMLLabelElement;

  constructor(text: string, placeholder?: string, type: 'text' | 'password') {
    super();
    this.element = document.createElement('label');
    this.textContent = text;
    this.addClass(styles.label);
    this.input = type === 'text' ? new TextInput(placeholder) : new PasswordInput(placeholder);
    this.appendChild(this.input);
  }

  get value() {
    return this.input.value;
  }

  set value(value: string) {
    this.input.value = value;
  }

  setInvalid() {
    this.input.setInvalid();
  }

  setValid() {
    this.input.setValid();
  }
}