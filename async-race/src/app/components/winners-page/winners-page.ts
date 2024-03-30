import './winners-page.scss';
import Component from '../base-component';
import Heading from '../heading/heading';
import PageSwitcher from '../page-switcher/page-switcher';
import WinnersTable from '../winners-table/winners-table';
import { getWinnersTotal } from '../../services/fetch-lib';

const LIMIT = 10;
const COUNT_HEADER = 'X-Total-Count';

export default class WinnerPage extends Component {
  private winnersStats;

  private pageIndicator;

  private pageNumber;

  private winnersNumber;

  private pageSwitcher;

  private winnersTable: WinnersTable | null;

  private tableWrapper;

  constructor() {
    super('div', 'winner-page');
    this.winnersStats = new Heading('h1');
    this.updateWinnersNumber();
    this.pageIndicator = new Heading('h2');
    this.pageNumber = 1;
    this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
    this.winnersTable = null;
    this.tableWrapper = new Component();
    this.renderTable(this.pageNumber);
    this.winnersNumber = 0;
    this.pageSwitcher = new PageSwitcher(
      this.switchToPrevPage,
      this.switchToNextPage,
    );
    this.appendChildren(
      this.winnersStats,
      this.pageIndicator,
      this.tableWrapper,
      this.pageSwitcher,
    );
  }

  async updateWinnersNumber() {
    const totalWinners = await getWinnersTotal(COUNT_HEADER);
    this.winnersStats.setTextContent(`Winners (${totalWinners})`);
    if (totalWinners) this.winnersNumber = +totalWinners;
  }

  switchToPrevPage = () => {
    if (this.pageNumber > 1) this.renderTable(this.pageNumber - 1);
  };

  switchToNextPage = () => {
    if (this.winnersNumber / LIMIT > this.pageNumber) {
      this.renderTable(this.pageNumber + 1);
    }
  };

  renderTable(page: number) {
    this.tableWrapper.removeChildren();
    this.winnersTable = new WinnersTable(page);
    this.tableWrapper.appendChild(this.winnersTable);
    this.pageNumber = page;
    this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
  }

  getCurrentPageNumber() {
    return this.pageNumber;
  }
}
