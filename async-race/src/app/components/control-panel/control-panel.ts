import './control-panel.scss';
import Component from '../base-component';
import Button from '../button/button';
import InputRow from './input-row/input-row';

export default class ControlPanel extends Component {
  private generateButton;

  private raceButton;

  private resetButton;

  createInput;

  private updateInput;

  constructor(
    className: string,
    callbackToCreate: () => void,
    callbackToGenerate: () => void,
  ) {
    super('section', className);
    this.createInput = new InputRow('CREATE', callbackToCreate);
    this.updateInput = new InputRow('UPDATE', () => {});
    this.generateButton = new Button('GENERATE CARS', callbackToGenerate);
    this.raceButton = new Button('RACE', () => {});
    this.resetButton = new Button('RESET', () => {});
    const buttonsRow = new Component('div', 'row');
    buttonsRow.appendChildren(
      this.raceButton,
      this.resetButton,
      this.generateButton,
    );
    this.appendChildren(this.createInput, this.updateInput, buttonsRow);
  }
}
