import styles from './404-page.module.scss';
import backIcon from '../../../assets/icons/arrow-back-ios24px.svg';
import Component from '../base-component';
import Heading from '../heading/heading';
import Button from '../button/button';

const ERROR_MSG = 'An error occurred:';
const NO_PAGE_MSG = 'the page you requested does not exist.';

export default class Page404 extends Component {
  constructor() {
    super('main', 'main');
    this.render();
  }

  private render() {
    const errorMsg = new Heading('h1', ERROR_MSG, styles.errorMsg);
    const noPageMsg = new Heading('h2', NO_PAGE_MSG, styles.noPageMsg);
    const prevPageButton = new Button(
      () => {
        window.history.back();
      },
      'button',
      backIcon,
    );
    this.appendChildren(errorMsg, noPageMsg, prevPageButton);
  }
}
