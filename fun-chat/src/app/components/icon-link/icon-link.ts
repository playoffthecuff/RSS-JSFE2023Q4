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
    className: string = styles.iconLink,
    blank = true,
  ) {
    super();
    this.element = document.createElement('a');
    this.addClass(styles.iconLink);
    if (className) this.addClass(className);
    this.setAttribute('href', href);
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      this.icon = new Icon(iconSrc, iconAlt || '');
      this.appendChild(this.icon);
    }
    if (blank) this.setAttribute('target', '_blank');
  }
}
