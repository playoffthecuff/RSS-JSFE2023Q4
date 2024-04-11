// import './button.scss';
import styles from './button.module.scss';
import Component from '../base-component';
import Icon from '../icon/icon';

export default class Button extends Component {
  protected override element: HTMLButtonElement;

  constructor(
    callback: () => void,
    iconSrc?: string,
    iconAlt?: string,
    textContent?: string,
  ) {
    super();
    this.element = document.createElement('button');
    this.addClass(styles.button);
    this.addListener('click', callback);
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      const icon = new Icon(iconSrc, iconAlt || '');
      this.appendChild(icon);
    }
  }
}