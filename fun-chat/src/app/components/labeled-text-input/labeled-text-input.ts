import styles from './labeled-text-input.module.scss';
import Component from '../base-component';
import TextInput from '../input/text-input/text-input';

export default class LabeledTextInput extends Component {
  protected override readonly element: HTMLLabelElement;

  private input;

  private tooltip;

  constructor(text: string, placeholder?: string, tooltip?: boolean) {
    super();
    this.element = document.createElement('label');
    this.textContent = text;
    this.addClass(styles.label);
    this.input = new TextInput(placeholder);
    if (tooltip) this.tooltip = new Component(styles.tooltip);
    this.appendChild(this.input);
  }

  get value() {
    return this.input.value;
  }

  set value(value: string) {
    this.input.value = value;
  }

  setTooltipText(text: string) {
    if (this.tooltip) this.tooltip.textContent = text;
  }
}