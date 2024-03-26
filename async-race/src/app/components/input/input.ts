import Component from '../base-component';

export default class Input extends Component {
  protected override element: HTMLInputElement;

  constructor(className: string) {
    super();
    this.element = document.createElement('input');
    this.addClass(className);
  }

  getValue() {
    return this.node.value;
  }

  setValue(value: string) {
    this.node.value = value;
  }
}
