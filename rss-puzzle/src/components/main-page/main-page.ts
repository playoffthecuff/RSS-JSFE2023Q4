import './main-page.scss';
import Component from '../base-component';
import GetData from '../../services/getData';
import level1DataSet from '../../../public/data/wordCollectionLevel1.ts';
import Card from '../card/button/card';

export default class MainPage extends Component {
  private sourceBlock;

  private resultBlock;

  private data;

  private lineNumber;

  private wordLeft;

  constructor() {
    super('main', ['main-page']);
    this.sourceBlock = new Component('section', ['source-block']);
    this.resultBlock = new Component('section', ['result-block']);
    for (let i = 0; i < 10; i += 1) {
      const row = new Component('div', ['row']);
      row.getNode().dataset.row = `${i}`;
      this.resultBlock.appendChild(row);
    }
    this.appendChildren([this.resultBlock, this.sourceBlock]);
    this.data = new GetData(level1DataSet, 0);
    this.lineNumber = 0;
    this.wordLeft = this.data.getRandomizedTextExample(this.lineNumber).length;
    this.appendNextCardsRow();
  }

  callback(event: Event) {
    const eventNode = event.target as Node;
    this.resultBlock
      .getChildren()
      [this.lineNumber - 1].getNode()
      .appendChild(eventNode);
    this.wordLeft -= 1;
    if (this.wordLeft < 1 && this.lineNumber < 10) {
      this.appendNextCardsRow();
    }
  }

  appendNextCardsRow() {
    if (this.lineNumber < 10) {
      this.wordLeft = this.data.getRandomizedTextExample(
        this.lineNumber,
      ).length;
      this.data.getRandomizedTextExample(this.lineNumber).forEach((word) => {
        this.sourceBlock.appendChild(
          new Card((Event) => this.callback(Event), word),
        );
      });
    }
    this.lineNumber += 1;
  }
}
