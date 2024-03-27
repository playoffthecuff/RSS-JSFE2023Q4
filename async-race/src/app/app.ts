import Component from './components/base-component';
import Garage from './components/garage-page/garage-page';
import Header from './components/header/header';

export default class App extends Component {
  private header;

  private garagePage;

  constructor(className: string) {
    super('div', className);
    this.header = new Header(() => {}, () => {});
    this.garagePage = new Garage('garage-page');
    this.appendChildren(this.header, this.garagePage);
  }
}
