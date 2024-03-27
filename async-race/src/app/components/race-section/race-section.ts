import './race-section.scss';
import Component from '../base-component';
import Heading from '../heading/heading';
import Lane from './lane/lane';
import PageSwitcher from '../page-switcher/page-switcher';
import { fetchCars, fetchHeader } from '../../services/fetchLib';

const COUNT_HEADER = 'X-Total-Count';

export default class Race extends Component {
  private garageStats;

  private pageIndicator;

  private pageNumber;

  private lanesWrapper;

  constructor() {
    super('section', 'race-section');
    this.garageStats = new Heading('h1');
    this.pageIndicator = new Heading('h2');
    this.pageNumber = 1;
    this.getCarsNumber();
    this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
    this.lanesWrapper = new Component('div', 'lanes');
    this.renderPage(this.pageNumber);
    const pageSwitcher = new PageSwitcher(this.switchToPrevPage, this.switchToNextPage);
    this.appendChildren(
      this.garageStats,
      this.pageIndicator,
      this.lanesWrapper,
      pageSwitcher,
    );
  }

  async getCarsNumber() {
    const totalCars = await fetchHeader(COUNT_HEADER);
    this.garageStats.setTextContent(`Garage (${totalCars})`);
  }

  async renderPage(page: number) {
    const cars = await fetchCars(page);
    if (cars.length && page > 0) {
      this.lanesWrapper.removeChildren();
      cars.forEach((car) => {
        const lane = new Lane(car.name, car.color, car.id);
        this.lanesWrapper.appendChild(lane);
      });
      this.pageNumber = page;
      this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
    }
  }

  switchToPrevPage = () => {
    this.renderPage((this.pageNumber - 1));
  };

  switchToNextPage = () => {
    this.renderPage((this.pageNumber + 1));
  };
}
