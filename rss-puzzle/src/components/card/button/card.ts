import './card.scss';
import Component from '../../base-component';

export default class Card extends Component {
  protected override node: HTMLDivElement;

  private order;

  constructor(
    order: number,
    callback?: (arg0: Event) => void,
    textContent?: string,
  ) {
    super();
    this.node = document.createElement('div');
    this.addClass('card');
    if (callback) this.addListener('click', callback);
    if (textContent) this.node.textContent = textContent;
    this.order = order;
  }

  getOrder() {
    return this.order;
  }
}
