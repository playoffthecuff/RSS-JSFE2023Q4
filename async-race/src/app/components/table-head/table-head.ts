import './table-head.scss';
import Component from '../base-component';

export default class TableHead extends Component {
  private state: 'ASC' | 'DESC';

  private textBlock;

  private sortBlock;

  constructor(textContent: string, callback?: () => void) {
    super('div', 'table-head');
    this.state = 'DESC';
    this.textBlock = new Component('div', 'text-block', textContent);
    this.sortBlock = new Component('div', 'sort-block');
    if (callback) this.addListener('click', callback);
    this.appendChildren(this.textBlock, this.sortBlock);
  }

  switchToAscSort = () => {
    this.sortBlock.setTextContent('▲');
    this.activate();
    this.state = 'ASC';
  };

  switchToDescSort = () => {
    this.sortBlock.setTextContent('▼');
    this.activate();
    this.state = 'DESC';
  };

  activate() {
    this.addClass('active');
  }

  deactivate() {
    this.removeClass('active');
  }

  getState() {
    return this.state;
  }
}
