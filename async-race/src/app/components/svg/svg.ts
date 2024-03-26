import './svg.scss';
import Component from '../base-component';

export default class SVG extends Component {
  constructor(path: string, id?: string) {
    super();
    this.element = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.addClass('svg');
    this.setAttribute('viewBox', '0 0 80 48');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `${path}#${id || ''}`);
    this.node.appendChild(use);
  }

  setColor(color: string) {
    this.removeAttribute('style');
    this.setAttribute('style', `fill: ${color}`);
  }
}
