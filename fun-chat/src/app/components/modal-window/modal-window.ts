import styles from './modal-window.module.scss';
import goBackIcon from '../../../assets/icons/arrow-back-ios24px.svg';
import Component from '../base-component';
import Button from '../button/button';

export default class ModalWindow extends Component {
  protected override element: HTMLDialogElement;

  private returnButton = new Button(
    () => {
      this.close();
    },
    'button',
    goBackIcon,
    styles.returnButton,
  );

  private messageBox = new Component(styles.messageBox);

  constructor(message?: string, open?: boolean) {
    super();
    this.element = document.createElement('dialog');
    if (message) this.messageBox.textContent = message;
    if (open) this.open();
    this.addClass(styles.modalWindow);
    this.appendChildren(this.messageBox, this.returnButton);
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
