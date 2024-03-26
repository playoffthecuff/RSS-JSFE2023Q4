import './text-input.scss';
import Input from '../input';

export default class TextInput extends Input {
  constructor() {
    super('text-input');
    this.setAttribute('type', 'text');
  }
}
