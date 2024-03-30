import './winners-table.scss';
import Component from '../base-component';
import TableHead from '../table-head/table-head';
import { getCar, getWinners } from '../../services/fetch-lib';
import Car from '../car/car';

const LIMIT = 10;

export default class WinnersTable extends Component {
  private tableHeader;

  private idHead;

  private carHead;

  private nameHead;

  private winsHead;

  private timeHead;

  private tableBody;

  private pageNumber;

  constructor(page: number) {
    super('div', 'winner-table');
    this.tableHeader = new Component('div', 'table-header');
    this.idHead = new TableHead('#');
    this.carHead = new TableHead('Car');
    this.nameHead = new TableHead('Name');
    this.winsHead = new TableHead('Wins', this.sortByWins);
    this.timeHead = new TableHead('Time', this.sortByTime);
    this.tableHeader.appendChildren(
      this.idHead,
      this.carHead,
      this.nameHead,
      this.winsHead,
      this.timeHead,
    );
    this.tableBody = new Component('div', 'table-body');
    this.appendChildren(this.tableHeader, this.tableBody);
    this.pageNumber = page;
    this.renderTable(page, 'id', 'ASC');
  }

  async renderTable(
    page: number,
    sort: 'time' | 'id' | 'wins',
    order: 'ASC' | 'DESC',
  ) {
    const winners = await getWinners(page, LIMIT, sort, order);
    winners.forEach((winner) => {
      this.appendRow(winner.id, winner.wins, winner.time);
    });
  }

  async appendRow(id: number, wins: number, time: number) {
    const wrapper = new Component('div', 'table-row');
    const car = await getCar(id);
    const idCell = new Component('div', 'table-cell', `${id}`);
    const carCell = new Car(car.color);
    carCell.addClass('table-cell');
    const nameCell = new Component('div', 'table-cell', car.name);
    const winsCell = new Component('div', 'table-cell', `${wins}`);
    const timeCell = new Component('div', 'table-cell', `${time}`);
    wrapper.appendChildren(idCell, carCell, nameCell, winsCell, timeCell);
    this.tableBody.appendChild(wrapper);
  }

  deactivateTableHeads() {
    this.carHead.deactivate();
    this.idHead.deactivate();
    this.nameHead.deactivate();
    this.timeHead.deactivate();
    this.winsHead.deactivate();
  }

  sortByWins() {
    this.deactivateTableHeads();
    const state = this.winsHead.getState();
    if (state === 'ASC') {
      this.winsHead.switchToDescSort();
    } else {
      this.winsHead.switchToAscSort();
    }
    this.renderTable(this.pageNumber, 'id', this.winsHead.getState());
  }

  sortByTime() {
    this.deactivateTableHeads();
    const state = this.timeHead.getState();
    if (state === 'ASC') {
      this.timeHead.switchToDescSort();
    } else {
      this.timeHead.switchToAscSort();
    }
    this.renderTable(this.pageNumber, 'id', this.timeHead.getState());
  }
}
