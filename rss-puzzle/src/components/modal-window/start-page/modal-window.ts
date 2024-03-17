import './modal-window.scss';
import Component from '../../base-component';
import Button from '../../button/button';

export default class ModalWindow extends Component {
  protected override node: HTMLDialogElement;

  private statisticButton;

  constructor() {
    super();
    this.node = document.createElement('dialog');
    this.addClass('modal-window');
    this.statisticButton = new Button(
      () => this.showStats(),
      '',
      '',
      'STATISTICS',
    );
    this.statisticButton.addClass('statistic-button');
    // this.appendChild(this.statisticButton);
  }

  openMe() {
    this.node.showModal();
  }

  closeMe() {
    this.node.close();
  }

  showStats() {
    this.setTextContent('stats');
  }
}
