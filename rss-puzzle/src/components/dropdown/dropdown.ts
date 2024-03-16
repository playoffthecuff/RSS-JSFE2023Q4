import Component from '../base-component';
import './dropdown.scss';

export default class Dropdown extends Component {
  protected override node: HTMLSelectElement;

  private wrapper;

  private createdOptions: Component[];

  constructor(
    callback: () => void,
    id: string,
    prompt: string,
    name: string,
    options?: string[],
  ) {
    super();
    this.node = document.createElement('select');
    this.addClass('select');
    this.setAttribute('name', name);
    this.node.onchange = callback;

    this.wrapper = new Component('div', ['dropdown']);
    const label = new Component('label', ['label'], prompt);
    label.setAttribute('for', id);
    this.createdOptions = [];
    if (options) {
      this.createOptions(options);
      this.appendOptions(this.createdOptions);
    }
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
      this.createdOptions.push(optionComponent);
      this.appendChild(optionComponent);
    });
  }

  createOptions(options: string[]) {
    const optionsArr: Component[] = [];
    options.forEach((option) => {
      const optionComponent = new Component('option', ['option'], option);
      optionComponent.setAttribute('value', option);
      optionsArr.push(optionComponent);
      this.createdOptions = optionsArr;
      return optionsArr;
    });
  }

  appendOptions(options: Component[]) {
    this.getNode().innerHTML = '';
    options.forEach((option) => this.appendChild(option));
  }

  getCreatedOptions() {
    return this.createdOptions;
  }
}
