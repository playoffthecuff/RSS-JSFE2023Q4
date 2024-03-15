import Component from '../base-component';
import './dropdown.scss';

export default class Dropdown extends Component {
  protected override node: HTMLSelectElement;

  private wrapper;

  constructor(
    callback: () => void,
    id: string,
    prompt: string,
    name: string,
    options: string[],
  ) {
    super();
    this.node = document.createElement('select');
    this.addClass('select');
    this.setAttribute('name', name);
    this.node.onchange = callback;
    this.wrapper = new Component('div', ['dropdown']);
    const label = new Component('label', ['label'], prompt);
    label.setAttribute('for', id);
    options.forEach((option) => {
      const optionComponent = new Component('option', ['option'], option);
      optionComponent.setAttribute('value', option);
      this.appendChild(optionComponent);
    });
    this.wrapper.appendChildren([label, this]);
  }

  getWrapper() {
    return this.wrapper;
  }

  getValue() {
    return this.node.value;
  }

  setValue(value: string) {
    this.node.value = value;
  }

  setOptions(options: string[]) {
    this.removeChildren();
    options.forEach((option) => {
      const optionComponent = new Component('option', ['option'], option);
      optionComponent.setAttribute('value', option);
      this.appendChild(optionComponent);
    });
  }
}
