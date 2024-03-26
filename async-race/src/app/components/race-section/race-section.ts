import './race-section.scss';
import Component from '../base-component';
import Heading from '../heading/heading';
import Lane from './lane/lane';

const TEST_MODEL = 'Tesla';
const TEST_COLOR = 'hsl(283, 32%, 64%)';

export default class Race extends Component {
  private garageStats;

  private pageIndicator;

  private carsNumber;

  private pageNumber;

  private lanes: Component[] | null;

  constructor() {
    super('section', 'race-section');
    this.garageStats = new Heading('h1');
    this.pageIndicator = new Heading('h2');
    this.carsNumber = 0;
    this.pageNumber = 1;
    this.garageStats.setTextContent(`Garage (${this.carsNumber})`);
    this.pageIndicator.setTextContent(`Page #${this.pageNumber}`);
    this.lanes = [];
    const lane = new Lane(TEST_MODEL, TEST_COLOR);
    this.appendChildren(this.garageStats, this.pageIndicator, lane);
  }
}
