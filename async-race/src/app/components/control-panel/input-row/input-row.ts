import './input-row.scss';
import Component from '../../base-component';
import Button from '../../button/button';
import ColorPicker from '../../input/color-picker/color-picker';
import TextInput from '../../input/text-input/text-input';

export default class InputRow extends Component {
  private textInput;

  private colorPicker;

  private button;

  constructor(buttonText: string) {
    super('div', 'input-row');
    this.textInput = new TextInput();
    this.colorPicker = new ColorPicker();
    this.button = new Button(buttonText, () => {});
    this.appendChildren(this.textInput, this.colorPicker, this.button);
  }
}
