import './control-panel.scss';
import Component from '../base-component';
import Button from '../button/button';
import InputRow from './input-row/input-row';

export default class ControlPanel extends Component {
  private generateButton;

  raceButton;

  resetButton;

  createInput;

  updateInput;

  constructor(
    className: string,
    callbackToCreate: () => void,
    callbackToGenerate: () => void,
    callbackToUpdate: () => void,
    callbackToRace: () => void,
    callbackToReset: () => void,
  ) {
    super('section', className);
    this.createInput = new InputRow('CREATE', callbackToCreate);
    this.updateInput = new InputRow('UPDATE', callbackToUpdate);
    this.generateButton = new Button('GENERATE CARS', callbackToGenerate);
    this.raceButton = new Button('RACE', callbackToRace);
    this.resetButton = new Button('RESET', callbackToReset);
    this.resetButton.setAttribute('disabled', '');
    const buttonsRow = new Component('div', 'row');
    buttonsRow.appendChildren(
      this.raceButton,
      this.resetButton,
      this.generateButton,
    );
    this.appendChildren(this.createInput, this.updateInput, buttonsRow);
  }
}
