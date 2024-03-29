import './modal-window.scss';
import Component from '../base-component';

export default class ModalWindow extends Component {
  protected override element: HTMLDialogElement;

  constructor() {
    super();
    this.element = document.createElement('dialog');
    this.addClass('modal-window');
  }

  openMe() {
    this.element.showModal();
  }

  closeMe() {
    this.element.close();
  }
}
