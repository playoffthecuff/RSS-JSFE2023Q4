import Component from './components/base-component';
import Garage from './components/garage-page/garage-page';
import Header from './components/header/header';
import WinnerPage from './components/winners-page/winners-page';

export default class App extends Component {
  private header;

  private garagePage;

  private winnersPage;

  constructor(className: string) {
    super('div', className);
    this.header = new Header(this.toGaragePage, this.toWinnersPage);
    this.garagePage = new Garage('garage-page');
    this.winnersPage = new WinnerPage();
    this.appendChildren(this.header, this.garagePage);
  }

  toWinnersPage = () => {
    this.garagePage.removeNode();
    this.winnersPage.updateWinnersNumber();
    this.winnersPage.renderTable(this.winnersPage.getCurrentPageNumber());
    this.appendChild(this.winnersPage);
    this.header.toggleToGarageButton();
  };

  toGaragePage = () => {
    this.winnersPage.removeNode();
    this.appendChild(this.garagePage);
    this.header.toggleToWinnersButton();
  };
}
