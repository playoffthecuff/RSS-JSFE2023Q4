import './race-section.scss';
import Component from '../base-component';
import Heading from '../heading/heading';
import Lane from './lane/lane';
import PageSwitcher from '../page-switcher/page-switcher';
import {
  fetchCars,
  fetchHeader,
  deleteCar,
  createCar,
} from '../../services/fetch-lib';
import { Car } from '../../../types';
import ControlPanel from '../control-panel/control-panel';
import hslToRgb from '../../services/hsl-to-rgb';

const COUNT_HEADER = 'X-Total-Count';

export default class Race extends Component {
  private garageStats;

  private pageIndicator;

  pageNumber;

  carsNumber;

  private lanesWrapper;

  selectedCar: Car;

  selectedLane: Lane | null;

  private controlPanel;

  constructor(controlPanel: ControlPanel) {
    super('section', 'race-section');
    this.controlPanel = controlPanel;
    this.garageStats = new Heading('h1');
    this.pageIndicator = new Heading('h2');
    this.pageNumber = 1;
    this.carsNumber = 0;
    this.updateCarsNumber();
    this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
    this.lanesWrapper = new Component('div', 'lanes');
    this.renderPage(this.pageNumber);
    this.selectedLane = null;
    const pageSwitcher = new PageSwitcher(
      this.switchToPrevPage,
      this.switchToNextPage,
    );
    this.appendChildren(
      this.garageStats,
      this.pageIndicator,
      this.lanesWrapper,
      pageSwitcher,
    );
    this.selectedCar = { id: 0, name: '', color: '' };
  }

  async updateCarsNumber() {
    const totalCars = await fetchHeader(COUNT_HEADER);
    this.garageStats.setTextContent(`Garage (${totalCars})`);
    if (totalCars) this.carsNumber = +totalCars;
  }

  async renderPage(page: number) {
    const cars = await fetchCars(page);
    this.lanesWrapper.removeChildren();
    if (cars.length && page > 0) {
      cars.forEach((car) => {
        const lane = new Lane(
          car.name,
          car.color,
          car.id,
          async () => {
            await deleteCar(car.id);
            await this.renderPage(this.pageNumber);
            this.updateCarsNumber();
          },
          () => {
            this.selectedCar = { ...car };
            this.selectedLane = lane;
            const lanes = this.lanesWrapper.getChildren() as Lane[];
            lanes.forEach((laneItem) =>
              laneItem.selectButton.removeAttribute('disabled'),
            );
            this.controlPanel.updateInput.setTextValue(car.name);
            this.controlPanel.updateInput.setColorValue(hslToRgb(car.color));
          },
        );
        lane.setId(`lane-${car.id}`);
        this.lanesWrapper.appendChild(lane);
      });
      this.pageNumber = page;
      this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
    }
  }

  switchToPrevPage = () => {
    if (this.pageNumber > 1) this.renderPage(this.pageNumber - 1);
  };

  switchToNextPage = () => {
    if (this.carsNumber / 7 > this.pageNumber) {
      this.renderPage(this.pageNumber + 1);
    }
  };

  deleteLane = (id: number) => {
    deleteCar(id);
    this.renderPage(this.pageNumber);
  };

  createCar = (name: string, color: string) => {
    createCar(name, color);
    this.updateCarsNumber();
  };
}
