import './main-page.scss';
import Component from '../base-component';
import GetData from '../../services/getData';
import level1DataSet from '../../../public/data/wordCollectionLevel1.ts';
import Card from '../card/button/card';
import Button from '../button/button';
import allowDrop from '../../services/allowDrop';
import infoIcon from '../../../public/icons/info24px.svg';
import speakerIcon from '../../../public/icons/11.png';
import Toggler from '../toggler/toggler';
import volumeIcon from '../../../public/icons/volumemute24px.svg';

const ROW_WIDTH = 768;
const LETTER_WIDTH = 10.6015;
const MARGIN = 10;
const ANIMATION_DURATION = 800;

export default class MainPage extends Component {
  private controlPanel;

  private spokenButton;

  private hintToggler;

  private speakerToggler;

  private infoBlock;

  private sourceBlock;

  private resultBlock;

  private data;

  private lineNumber;

  private wordsLeft;

  private textLength;

  private gameButton;

  private autocompleteButton;

  private padding;

  private dragNode: Node | null;

  private dragElement: HTMLElement | null;

  constructor() {
    super('main', ['main-page']);
    this.controlPanel = new Component('section', ['control-panel']);
    const infoPanel = new Component('div', ['info-panel']);
    this.infoBlock = new Component('section', ['info-block']);
    this.hintToggler = new Toggler(
      this.toggleHint,
      infoIcon,
      'text hint toggler',
    );
    this.speakerToggler = new Toggler(
      this.toggleSpeaker,
      volumeIcon,
      'voice hint button toggler',
    );
    this.spokenButton = new Button(
      () => this.tellHint(),
      speakerIcon,
      'voice hint',
    );
    this.spokenButton.addClass('spoken-button');
    this.spokenButton.addClass('off');
    infoPanel.appendChildren([this.infoBlock, this.spokenButton]);
    this.controlPanel.appendChildren([this.hintToggler, this.speakerToggler]);
    this.sourceBlock = new Component('section', ['source-block']);
    this.sourceBlock.getNode().ondragover = allowDrop;
    this.sourceBlock.getNode().ondrop = this.dropToSourceBlock;
    this.resultBlock = new Component('section', ['result-block']);
    for (let i = 0; i < 10; i += 1) {
      const row = new Component('div', ['row']);
      row.getNode().dataset.row = `${i}`;
      this.resultBlock.appendChild(row);
    }
    this.gameButton = new Button(() => this.checkResult(), '', '', 'CHECK');
    this.gameButton.addClass('game-button');
    this.autocompleteButton = new Button(
      () => this.autocomplete(),
      '',
      '',
      'AUTOCOMPLETE',
    );
    this.autocompleteButton.addClass('game-button');
    this.appendChildren([
      this.controlPanel,
      infoPanel,
      this.resultBlock,
      this.sourceBlock,
      this.autocompleteButton,
      this.gameButton,
    ]);
    this.data = new GetData(level1DataSet, 0);
    this.lineNumber = 0;
    this.wordsLeft = 0;
    this.textLength = 0;
    this.padding = 0;
    this.dragNode = null;
    this.dragElement = null;
    this.appendNextCardsRow();
  }

  toggleHint = () => {
    if (this.hintToggler.getCheckboxState()) {
      this.infoBlock.addClass('on');
    } else {
      this.infoBlock.removeClass('on');
    }
  };

  toggleSpeaker = () => {
    this.spokenButton.toggleClass('off');
  };

  tellHint() {
    const pre = '../../../public/';
    const path = pre + this.data.getAudioExample(this.lineNumber - 1);
    const audio = new Audio(path);
    audio.addEventListener('ended', () => {
      this.spokenButton.getIcon()?.removeClass('hidden');
      this.spokenButton.removeClass('active');
    });
    this.spokenButton.getIcon()?.addClass('hidden');
    this.spokenButton.addClass('active');
    audio.play();
  }

  callback(event: Event) {
    const eventNode = event.target as Node;
    const eventElement = event.currentTarget as HTMLElement;
    if (eventNode.parentElement?.classList.contains('row')) {
      this.sourceBlock.getNode().appendChild(eventNode);
      this.wordsLeft += 1;
      eventElement.classList.remove('wrong');
      this.gameButton.addClass('disabled');
    } else {
      this.getCurrentRowNode().appendChild(eventNode);
      this.wordsLeft -= 1;
      this.changeButton();
    }
  }

  changeButton() {
    if (this.checkSequence()) {
      this.gameButton.removeNode();
      this.gameButton = new Button(() => this.continue(), '', '', 'CONTINUE');
      this.gameButton.addClass('game-button');
      this.appendChild(this.gameButton);
      if (!this.hintToggler.getCheckboxState()) this.infoBlock.addClass('on');
      if (!this.speakerToggler.getCheckboxState())
        this.spokenButton.removeClass('off');
    }
    if (this.wordsLeft === 0) {
      this.gameButton.removeClass('disabled');
    }
  }

  getTextExample() {
    return this.data.getTextExample(this.lineNumber - 1);
  }

  getCurrentRowNode() {
    return this.resultBlock.getChildren()[this.lineNumber - 1].getNode();
  }

  getSentence() {
    const result: string[] = [];
    this.getCurrentRowNode().childNodes.forEach((node) => {
      if (node.textContent) result.push(node.textContent);
    });
    return result.join(' ');
  }

  checkSequence() {
    const textLength = this.data.getRandomizedTextExample(
      this.lineNumber - 1,
    ).length;
    const cardsLength = this.getCurrentRowNode().children.length;
    let prevAtr = -1;
    if (cardsLength === textLength) {
      for (let i = 0; i < textLength; i += 1) {
        const currAtr = Number(
          this.getCurrentRowNode().children.item(i)?.getAttribute('data-card'),
        );
        if (prevAtr > currAtr) return false;
        prevAtr = currAtr;
      }
      return true;
    }
    return false;
  }

  continue() {
    if (!this.hintToggler.getCheckboxState()) this.infoBlock.removeClass('on');
    this.getCurrentRowNode().classList.add('solved');
    if (this.wordsLeft < 1 && this.lineNumber < 10) {
      this.gameButton.removeNode();
      this.gameButton = new Button(() => this.checkResult(), '', '', 'CHECK');
      this.gameButton.addClass('game-button');
      this.appendChild(this.gameButton);
      this.appendNextCardsRow();
    }
  }

  checkResult() {
    const { children } = this.getCurrentRowNode();
    for (let i = 0; i < children.length; i += 1) {
      if (Number(children.item(i)?.getAttribute('data-card')) !== i)
        children.item(i)!.classList.add('wrong');
    }
  }

  autocomplete() {
    this.sourceBlock.removeChildren();
    this.getCurrentRowNode().innerHTML = '';
    const textExample = this.getTextExample();
    const textExampleArr = textExample.split(' ');
    let wordOrder = 0;
    const xRelativeOffsets = textExampleArr.map(
      (word) => word.length * LETTER_WIDTH + this.padding * 2 - MARGIN,
    );
    xRelativeOffsets.unshift(0);
    this.getTextExample()
      .split(' ')
      .forEach((word) => {
        const card = new Card(wordOrder, () => {}, word);
        const xOffset = xRelativeOffsets
          .slice(0, wordOrder + 1)
          .reduce((acc, offset) => acc + offset, 0);
        wordOrder += 1;
        const yOffset = 1 + 36 * this.lineNumber;
        const path = this.getImageSrc();
        card.setAttribute(
          'style',
          `padding: 0 ${this.padding}px; background: url(${path}) ${-xOffset}px ${-yOffset}px`,
        );
        const firstSpaceIndex = textExample.indexOf(' ');
        const lastSpaceIndex = textExample.lastIndexOf(' ');
        if (
          card.getNode().textContent === textExample.slice(0, firstSpaceIndex)
        )
          card.addClass('first');
        if (
          card.getNode().textContent === textExample.slice(lastSpaceIndex + 1)
        )
          card.addClass('last');
        this.getCurrentRowNode().appendChild(card.getNode());
      });
    this.getCurrentRowNode().classList.add('solved');
    this.appendNextCardsRow();
  }

  appendNextCardsRow() {
    this.gameButton.addClass('disabled');
    if (this.lineNumber < 10) {
      this.setTextLength();
      this.setWordsLeft();
      this.setPadding();
      const textExample = this.data.getTextExample(this.lineNumber);
      const textExampleArr = textExample.split(' ');
      const xRelativeOffsets = textExampleArr.map(
        (word) => word.length * LETTER_WIDTH + this.padding * 2 - MARGIN,
      );
      xRelativeOffsets.unshift(0);
      this.getRandomizedText().forEach((word) => {
        const wordOrder = textExampleArr.indexOf(word);
        textExampleArr[wordOrder] = 'nullWord';
        const card = new Card(wordOrder, (Event) => this.callback(Event), word);
        card.setAttribute('draggable', 'true');
        const firstSpaceIndex = textExample.indexOf(' ');
        const lastSpaceIndex = textExample.lastIndexOf(' ');
        if (
          card.getNode().textContent === textExample.slice(0, firstSpaceIndex)
        )
          card.addClass('first');
        if (
          card.getNode().textContent === textExample.slice(lastSpaceIndex + 1)
        )
          card.addClass('last');
        card.getNode().ondragstart = this.dragStart;
        const path = this.getImageSrc();
        card.getNode().dataset.card = `${wordOrder}`;
        const xOffset = xRelativeOffsets
          .slice(0, wordOrder + 1)
          .reduce((acc, offset) => acc + offset, 0);
        const yOffset = 1 + 36 * this.lineNumber;
        card.setAttribute(
          'style',
          `padding: 0 ${this.padding}px; background: url(${path}) ${-xOffset}px ${-yOffset}px`,
        );
        this.sourceBlock.appendChild(card);
      });
    }
    const translation = this.getTranslation();
    if (!this.speakerToggler.getCheckboxState())
      this.spokenButton.addClass('off');
    if (this.hintToggler.getCheckboxState()) {
      this.infoBlock.setTextContent(translation);
    } else {
      setTimeout(() => {
        this.infoBlock.setTextContent(translation);
      }, ANIMATION_DURATION);
    }
    this.lineNumber += 1;
    this.getCurrentRowNode().ondragover = allowDrop;
    this.getCurrentRowNode().ondrop = this.dropToResult;
  }

  getImageSrc() {
    const pre = '../../../public/images/';
    return pre + this.data.getImgSrc();
  }

  getTranslation() {
    return this.data.getTextExampleTranslate(this.lineNumber);
  }

  dragStart = (event: DragEvent) => {
    const eventNode = event.target as Node;
    const eventElement = event.target as HTMLElement;
    this.dragNode = eventNode;
    this.dragElement = eventElement;
  };

  dropToResult = (event: DragEvent) => {
    const eventElement = event.target as HTMLElement;
    const eventNode = event.target as Node;
    if (this.dragNode && this.getCurrentRowNode().contains(this.dragNode)) {
      if (eventNode === this.getCurrentRowNode()) {
        this.getCurrentRowNode().appendChild(this.dragNode);
        this.dragElement?.classList.remove('wrong');
      } else if (eventNode !== this.dragNode) {
        const tempNode = document.createElement('div');
        this.getCurrentRowNode().insertBefore(tempNode, this.dragNode);
        this.getCurrentRowNode().insertBefore(this.dragNode, eventNode);
        this.getCurrentRowNode().insertBefore(eventNode, tempNode);
        this.getCurrentRowNode().removeChild(tempNode);
        eventElement.classList.remove('wrong');
        this.dragElement?.classList.remove('wrong');
        this.changeButton();
      }
    } else {
      if (this.dragNode && eventNode !== this.getCurrentRowNode()) {
        this.getCurrentRowNode().appendChild(this.dragNode);
        this.getCurrentRowNode().insertBefore(this.dragNode, eventNode);
      } else if (this.dragNode) {
        this.getCurrentRowNode().appendChild(this.dragNode);
      }
      this.wordsLeft -= 1;
      this.changeButton();
    }
  };

  dropToSourceBlock = () => {
    if (this.dragNode && !this.sourceBlock.getNode().contains(this.dragNode)) {
      this.sourceBlock.getNode().appendChild(this.dragNode);
      this.wordsLeft += 1;
    }
  };

  setPadding() {
    this.padding =
      (ROW_WIDTH -
        LETTER_WIDTH * this.textLength +
        MARGIN * (this.wordsLeft - 1) -
        0) /
      this.wordsLeft /
      2;
  }

  getRandomizedText() {
    return this.data.getRandomizedTextExample(this.lineNumber);
  }

  setTextLength() {
    this.textLength = this.getRandomizedText().reduce(
      (acc, word) => acc + word.length,
      0,
    );
  }

  setWordsLeft() {
    this.wordsLeft = this.getRandomizedText().length;
  }
}
