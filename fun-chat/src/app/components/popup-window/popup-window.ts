import styles from './popup-window.module.scss';
import spinnerIcon from '../../../assets/icons/tube-spinner.svg';
import Component from '../base-component';
import Icon from '../icon/icon';

export default class PopupWindow extends Component {
  protected override element: HTMLDialogElement;

  private icon = new Icon(spinnerIcon, styles.icon);

  private messageBox = new Component(styles.messageBox);

  constructor(message?: string, open?: boolean) {
    super();
    this.element = document.createElement('dialog');
    const inner = new Component(styles.inner);
    inner.appendChildren(this.messageBox, this.icon);
    if (message) this.messageBox.textContent = message;
    if (open) this.open();
    this.addClass(styles.popupWindow);
    this.appendChild(inner);
  }

  open() {
    this.setAttribute('open');
  }

  close() {
    this.element.close();
  }

  setMessage(message: string) {
    this.textContent = message;
  }
}
