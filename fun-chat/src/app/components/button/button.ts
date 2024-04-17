// import './button.scss';
import styles from './button.module.scss';
import Component from '../base-component';
import Icon from '../icon/icon';

export default class Button extends Component {
  protected override element: HTMLButtonElement;

  constructor(
    callback: (() => void) | null,
    type: 'button' | 'menu' | 'submit' | 'reset' = 'button',
    iconSrc?: string,
    className?: string,
    id?: string,
    iconAlt?: string,
    textContent?: string,
  ) {
    super();
    this.element = document.createElement('button');
    this.addClass(styles.button);
    if (callback) this.addListener('click', callback);
    if (type) this.setAttribute('type', type);
    if (className) this.addClass(className);
    if (id) this.node.id = id;
    if (textContent) this.node.textContent = textContent;
    if (iconSrc) {
      this.appendChild(new Icon(iconSrc, iconAlt || ''));
    }
  }

  disable() {
    this.setAttribute('disabled');
  }

  enable() {
    this.removeAttribute('disabled');
  }
}
