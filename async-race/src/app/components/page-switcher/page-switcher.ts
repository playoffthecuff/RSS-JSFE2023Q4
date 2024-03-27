import './page-switcher.scss';
import Component from '../base-component';
import Button from '../button/button';

export default class PageSwitcher extends Component {
  private prevButton;

  private nextButton;

  constructor(callbackPrev: () => void, callbackNext: () => void) {
    super('section', 'page-switcher');
    this.prevButton = new Button('PREV', callbackPrev);
    this.nextButton = new Button('NEXT', callbackNext);
    this.appendChildren(this.prevButton, this.nextButton);
  }
}
