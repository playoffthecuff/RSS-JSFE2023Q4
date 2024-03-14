import './toggler.scss';
import Component from '../base-component';
import Icon from '../icon/icon';
import Checkbox from './checkbox';

export default class Toggler extends Component {
  private icon;

  private checkbox;

  protected override node: HTMLDivElement;

  constructor(
    callback: () => void,
    iconSrc?: string,
    iconAlt?: string,
    textContent?: string,
  ) {
    super();
    this.node = document.createElement('div');
    this.checkbox = new Checkbox(callback);
    this.addClass('toggler');
    this.appendChild(this.checkbox);
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      this.icon = new Icon(iconSrc, iconAlt || '');
      this.appendChild(this.icon);
    }
  }

  getCheckboxState() {
    return this.checkbox.getCheckedState();
    // return this.checkbox
    // return this.checkbox.getCheckedState();
  }
}
