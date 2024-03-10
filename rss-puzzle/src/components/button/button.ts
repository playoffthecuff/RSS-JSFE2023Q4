import './button.scss';
import Component from '../base-component';
import Icon from '../icon/icon';

export default class Button extends Component {
  private icon;

  protected override node: HTMLDivElement;

  constructor(
    callback: () => void,
    iconSrc?: string,
    iconAlt?: string,
    textContent?: string,
  ) {
    super();
    this.node = document.createElement('div');
    this.addClass('button');
    this.addListener('click', callback);
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      this.icon = new Icon(iconSrc, iconAlt || '');
      this.appendChild(this.icon);
    }
  }
}
