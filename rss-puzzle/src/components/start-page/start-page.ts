import './start-page.scss';
import Component from '../base-component';
import Header from '../header/header';

export default class StartPage extends Component {
  private header;

  constructor(callback: () => void) {
    super('main', ['start-page']);
    this.header = new Header(callback);
    this.appendChild(this.header);
    this.header.setParent(this);
  }
}
