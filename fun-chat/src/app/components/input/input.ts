import Component from '../base-component';

export default class Input extends Component {
  protected override readonly element: HTMLInputElement;

  constructor(className: string) {
    super();
    this.element = document.createElement('input');
    this.addClass(className);
  }

  get value() {
    return this.element.value;
  }

  set value(value: string) {
    this.element.value = value;
  }
}
