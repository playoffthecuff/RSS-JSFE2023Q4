import './page-switcher.scss';
import Component from '../base-component';
import Button from '../button/button';

export default class PageSwitcher extends Component {
  private prevButton;

  private nextButton;

  constructor() {
    super('section', 'page-switcher');
    this.prevButton = new Button('PREV', () => {});
    this.nextButton = new Button('NEXT', () => {});
    this.appendChildren(this.prevButton, this.nextButton);
  }
}
