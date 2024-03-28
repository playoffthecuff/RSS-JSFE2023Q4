import './garage-page.scss';
import Component from '../base-component';
import ControlPanel from '../control-panel/control-panel';
import Race from '../race-section/race-section';
import { createCar, LIMIT, updateCar } from '../../services/fetch-lib';
import carModels from '../../services/car-models';
import { Car } from '../../../types';
import Lane from '../race-section/lane/lane';

const GENERATED_CARS = 100;

export default class Garage extends Component {
  private controlPanel;

  private raceSection;

  constructor(className: string) {
    super('div', className);
    this.controlPanel = new ControlPanel(
      'control-panel',
      async () => {
        await createCar(
          this.controlPanel.createInput.getTextValue(),
          this.controlPanel.createInput.getColorValue(),
        );
        this.raceSection.updateCarsNumber();
        this.updateViewRaceSection();
      },
      async () => {
        const promises: Promise<Car>[] = [];
        for (let i = 0; i < GENERATED_CARS; i += 1) {
          const name = carModels[Math.floor(Math.random() * carModels.length)];
          const color = `hsl(${Math.floor(Math.random() * 360)}, ${64 + Math.ceil(Math.random() * 36)}%, 72%)`;
          promises.push(createCar(name, color));
        }
        await Promise.all(promises);
        this.raceSection.updateCarsNumber();
        this.updateViewRaceSection();
      },
      async () => {
        if (
          this.controlPanel.updateInput.getTextValue() &&
          this.raceSection.selectedCar.id
        ) {
          await updateCar(
            this.raceSection.selectedCar.id,
            this.controlPanel.updateInput.getTextValue(),
            this.controlPanel.updateInput.getColorValue(),
          );
          let selectedLane = this.raceSection.selectedLane as Lane | null;
          selectedLane!.updateCar(
            this.controlPanel.updateInput.getTextValue(),
            this.controlPanel.updateInput.getColorValue(),
          );
          this.controlPanel.updateInput.setTextValue('');
          this.controlPanel.updateInput.setColorValue('#808080');
          selectedLane?.selectButton.removeAttribute('disabled');
          selectedLane = null;
          this.raceSection.selectedCar.id = 0;
        }
      },
    );
    this.raceSection = new Race(this.controlPanel);
    this.appendChildren(this.controlPanel, this.raceSection);
  }

  updateViewRaceSection() {
    if (this.raceSection.carsNumber / LIMIT < this.raceSection.pageNumber) {
      this.raceSection.renderPage(this.raceSection.pageNumber);
    }
  }
}
