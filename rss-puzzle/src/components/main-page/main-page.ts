import './main-page.scss';
import Component from '../base-component';
import GetData from '../../services/getData';
import level1DataSet from '../../../public/data/wordCollectionLevel1.ts';
import Card from '../card/button/card';
import Button from '../button/button';

const ROW_WIDTH = 768;
const LETTER_WIDTH = 8;
const MARGIN = 10;

export default class MainPage extends Component {
  private sourceBlock;

  private resultBlock;

  private data;

  private lineNumber;

  private wordsLeft;

  private textLength;

  private continueButton;

  constructor() {
    super('main', ['main-page']);
    this.sourceBlock = new Component('section', ['source-block']);
    this.resultBlock = new Component('section', ['result-block']);
    for (let i = 0; i < 10; i += 1) {
      const row = new Component('div', ['row']);
      row.getNode().dataset.row = `${i}`;
      this.resultBlock.appendChild(row);
    }
    this.continueButton = new Button(() => this.continue(), '', '', 'CONTINUE');
    this.continueButton.addClass('continue-button');
    this.appendChildren([
      this.resultBlock,
      this.sourceBlock,
      this.continueButton,
    ]);
    this.data = new GetData(level1DataSet, 0);
    this.lineNumber = 0;
    this.wordsLeft = 0;
    this.textLength = 0;
    this.appendNextCardsRow();
  }

  callback(event: Event) {
    const eventNode = event.target as Node;
    if (eventNode.parentElement?.classList.contains('row')) {
      this.sourceBlock.getNode().appendChild(eventNode);
      this.wordsLeft += 1;
    } else {
      this.resultBlock
        .getChildren()
        [this.lineNumber - 1].getNode()
        .appendChild(eventNode);
      this.wordsLeft -= 1;
      if (this.getSentence() === this.getTextExample()) {
        this.continueButton.removeClass('disabled');
      }
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

  continue() {
    if (this.wordsLeft < 1 && this.lineNumber < 10) {
      this.getCurrentRowNode().classList.add('solved');
      this.appendNextCardsRow();
    } else {
      this.getCurrentRowNode().classList.add('solved');
    }
  }

  appendNextCardsRow() {
    this.continueButton.addClass('disabled');
    if (this.lineNumber < 10) {
      this.setTextLength();
      this.setWordsLeft();
      this.getRandomizedText().forEach((word) => {
        const card = new Card((Event) => this.callback(Event), word);
        const padding =
          (ROW_WIDTH -
            LETTER_WIDTH * this.textLength +
            MARGIN * (this.wordsLeft - 1)) /
          this.wordsLeft /
          2;
        card.setAttribute('style', `padding: 0 ${padding}px`);
        this.sourceBlock.appendChild(card);
      });
    }
    this.lineNumber += 1;
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
