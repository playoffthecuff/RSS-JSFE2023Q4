import './button.scss';
import Component from '../base-component';
import { Callback } from '../../../types';

export default class Button extends Component {
  protected override element: HTMLButtonElement;

  constructor(
    text: string,
    callback: Callback,
    type: string = 'button',
    className: string = 'button',
  ) {
    super();
    this.element = document.createElement('button');
    this.addClass(className);
    this.setTextContent(text);
    this.addListener('click', callback);
    if (type) this.setAttribute('type', type);
  }
}
