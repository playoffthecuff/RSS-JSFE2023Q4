import './card.scss';
import Component from '../../base-component';

export default class Card extends Component {
  protected override node: HTMLDivElement;

  constructor(callback: (arg0: Event) => void, textContent?: string) {
    super();
    this.node = document.createElement('div');
    this.addClass('card');
    this.addListener('click', callback);
    if (textContent) this.node.textContent = textContent;
  }
}
