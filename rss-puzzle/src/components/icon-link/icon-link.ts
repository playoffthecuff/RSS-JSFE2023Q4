import './icon-link.scss';
import Component from '../base-component';
import Icon from '../icon/icon';

export default class IconLink extends Component {
  private icon;

  protected override node: HTMLAnchorElement;

  constructor(
    href: string,
    iconSrc?: string,
    iconAlt?: string,
    textContent?: string,
  ) {
    super();
    this.node = document.createElement('a');
    this.setAttribute('href', href);
    this.addClass('icon-link');
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      this.icon = new Icon(iconSrc, iconAlt || '');
      this.appendChild(this.icon);
    }
  }
}
