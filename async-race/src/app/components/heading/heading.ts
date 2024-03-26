import './heading.scss';
import Component from '../base-component';

export default class Heading extends Component {
  protected override element: HTMLHeadingElement;

  constructor(tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5') {
    super();
    this.element = document.createElement(tag);
    this.addClass('heading');
  }
}
