import './modal-window.scss';
import Component from '../../base-component';
import Button from '../../button/button';
import volumeIcon from '../../../../public/icons/volumeup24px.svg';

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

  setStats(
    iDoNotKnowSentences: string[],
    iKnowSentences: string[],
    iDoNotKnowAudios: HTMLAudioElement[],
    iKnowAudios: HTMLAudioElement[],
  ) {
    this.iDoNotKnowBlock.getNode().innerHTML += `<b>&nbsp;&nbsp;</b><span class="unknown">&nbsp;${iDoNotKnowSentences.length}&nbsp;</span><b>&nbsp;</b>:`;
    iDoNotKnowSentences.forEach((sentence, index) => {
      const p = new Component('p', [], sentence);
      const button = new Button(
        () => {
          iDoNotKnowAudios[index].play();
        },
        volumeIcon,
        'say a sentence',
      );
      button.addClass('audio-button');
      p.appendChild(button);
      this.iDoNotKnowBlock.appendChild(p);
    });
    this.iKnowBlock.getNode().innerHTML += `<b>&nbsp;&nbsp;</b><span class="known">&nbsp;${iKnowSentences.length}&nbsp;</span><b>&nbsp;</b>:`;
    iKnowSentences.forEach((sentence, index) => {
      const p = new Component('p', [], sentence);
      const button = new Button(
        () => {
          iKnowAudios[index].play();
        },
        volumeIcon,
        'say a sentence',
      );
      button.addClass('audio-button');
      p.appendChild(button);
      this.iKnowBlock.appendChild(p);
    });
  }

  clearStats() {
    this.iDoNotKnowBlock.getNode().innerHTML = `I don't know`;
    this.iKnowBlock.getNode().innerHTML = `I know`;
  }
}
