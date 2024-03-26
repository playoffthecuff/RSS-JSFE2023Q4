import './garage-page.scss';
import Component from '../base-component';
import ControlPanel from '../control-panel/control-panel';
import Race from '../race-section/race-section';

export default class Garage extends Component {
  private controlPanel;

  private raceSection;

  constructor(className: string) {
    super('div', className);
    this.controlPanel = new ControlPanel('control-panel');
    this.raceSection = new Race();
    this.appendChildren(this.controlPanel, this.raceSection);
  }
}
