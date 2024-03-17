import './modal-window.scss';
import Component from '../../base-component';
import Button from '../../button/button';

export default class ModalWindow extends Component {
  protected override node: HTMLDialogElement;

  private continueButton;

  private iKnowBlock;

  private iDoNotKnowBlock;

  constructor(callback: () => void) {
    super();
    this.node = document.createElement('dialog');
    this.addClass('modal-window');
    this.continueButton = new Button(callback, '', '', 'CONTINUE');
    this.continueButton.addClass('modal-button');
    this.iDoNotKnowBlock = new Component('div', ['stat-block'], `I don't know`);
    const separator = new Component('hr', []);
    this.iKnowBlock = new Component('div', ['stat-block'], `I know`);
    this.appendChildren([
      this.iDoNotKnowBlock,
      separator,
      this.iKnowBlock,
      this.continueButton,
    ]);
  }

  openMe() {
    this.node.showModal();
  }

  closeMe() {
    this.node.close();
  }

  setStats(iDoNotKnow: string[], iKnow: string[]) {
    this.iDoNotKnowBlock.getNode().innerHTML += `<b>&nbsp;&nbsp;</b><span>&nbsp;${iDoNotKnow.length}&nbsp;</span><b>&nbsp;</b>:`;
    iDoNotKnow.forEach((sentence) => {
      const p = new Component('p', [], sentence);
      this.iDoNotKnowBlock.appendChild(p);
    });
    this.iKnowBlock.getNode().innerHTML += `<b>&nbsp;&nbsp;</b><span>&nbsp;${iKnow.length}&nbsp;</span><b>&nbsp;</b>:`;
    iKnow.forEach((sentence) => {
      const p = new Component('p', [], sentence);
      this.iKnowBlock.appendChild(p);
    });
  }

  clearStats() {
    this.iDoNotKnowBlock.getNode().innerHTML = `I don't know`;
    this.iKnowBlock.getNode().innerHTML = `I know`;
  }
}
