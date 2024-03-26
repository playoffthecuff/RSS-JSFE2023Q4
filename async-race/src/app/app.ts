import Component from './components/base-component';
import Garage from './components/garage-page/garage-page';
import Header from './components/header/header';
import PageSwitcher from './components/page-switcher/page-switcher';

export default class App extends Component {
  private header;

  private garagePage;

  constructor(className: string) {
    super('div', className);
    this.header = new Header(() => {}, () => {});
    this.garagePage = new Garage('garage-page');
    const pageSwitcher = new PageSwitcher();
    this.appendChildren(this.header, this.garagePage, pageSwitcher);
  }
}
