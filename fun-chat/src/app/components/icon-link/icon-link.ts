import styles from './icon-link.module.scss';
import Component from '../base-component';
import Icon from '../icon/icon';

export type Options = {
  href: string;
  iconSrc?: string;
  iconAlt?: string;
  textContent?: string;
  className?: string;
  blank?: boolean;
};

export default class IconLink extends Component {
  private icon;

  protected override element: HTMLAnchorElement;

  constructor(options: Options) {
    super();
    const {
      href,
      iconSrc = '',
      iconAlt = '',
      textContent = '',
      className = '',
      blank = true,
    } = options;
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
