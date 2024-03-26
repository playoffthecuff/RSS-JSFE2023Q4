import './color-picker.scss';
import Input from '../input';

const DEFAULT_COLOR = '#808080';

export default class ColorPicker extends Input {
  constructor() {
    super('color-picker');
    this.setAttribute('type', 'color');
    this.setValue(DEFAULT_COLOR);
  }
}
