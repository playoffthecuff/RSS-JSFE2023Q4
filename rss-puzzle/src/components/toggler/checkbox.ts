import Component from '../base-component';

export default class Checkbox extends Component {
  protected override node: HTMLInputElement;

  constructor(callback: () => void) {
    super();
    this.node = document.createElement('input');
    this.setAttribute('type', 'checkbox');
    this.node.onchange = callback;
  }

  getCheckedState() {
    return this.node.checked;
  }
}
