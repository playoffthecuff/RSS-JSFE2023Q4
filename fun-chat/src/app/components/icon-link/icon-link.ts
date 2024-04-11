import styles from './icon-link.module.scss';
import Component from '../base-component';
import Icon from '../icon/icon';

export default class IconLink extends Component {
  private icon;

  protected override element: HTMLAnchorElement;

  constructor(
    href: string,
    iconSrc?: string,
    iconAlt?: string,
    textContent?: string,
  ) {
    super();
    this.element = document.createElement('a');
    this.setAttribute('href', href);
    this.addClass(styles.iconLink);
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      this.icon = new Icon(iconSrc, iconAlt || '');
      this.appendChild(this.icon);
    }
  }
}