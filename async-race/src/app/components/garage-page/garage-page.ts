import './garage-page.scss';
import Component from '../base-component';
import ControlPanel from '../control-panel/control-panel';
import Race from '../race-section/race-section';
import { createCar, LIMIT } from '../../services/fetchLib';

export default class Garage extends Component {
  private controlPanel;

  private raceSection;

  constructor(className: string) {
    super('div', className);
    this.controlPanel = new ControlPanel('control-panel', async () => {
      await createCar(
        this.controlPanel.createInput.getTextValue(),
        this.controlPanel.createInput.getColorValue(),
      );
      if (this.raceSection.carsNumber / LIMIT < this.raceSection.pageNumber) {
        this.raceSection.renderPage(this.raceSection.pageNumber);
      }
      this.raceSection.updateCarsNumber();
    });
    this.raceSection = new Race();
    this.appendChildren(this.controlPanel, this.raceSection);
  }
}
