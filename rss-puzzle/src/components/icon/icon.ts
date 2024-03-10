import './icon.scss';
import Component from '../base-component';

export default class Icon extends Component {
  protected override node: HTMLImageElement;

  constructor(src: string, alt: string) {
    super();
    this.node = document.createElement('img');
    this.node.classList.add('icon');
    this.node.setAttribute('src', src);
    this.node.setAttribute('alt', alt);
  }
}
