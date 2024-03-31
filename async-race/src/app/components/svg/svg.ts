import './svg.scss';
import Component from '../base-component';

export default class SVG extends Component {
  protected svgElement: SVGSVGElement;

  constructor(path: string, id?: string) {
    super();
    this.svgElement = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    this.node.appendChild(this.svgElement);
    this.svgElement.classList.add('svg');
    this.svgElement.setAttribute('viewBox', '0 0 80 48');
    const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    use.setAttributeNS(
      'http://www.w3.org/1999/xlink',
      'xlink:href',
      `${path}#${id || ''}`,
    );
    this.svgElement.appendChild(use);
  }

  setColor(color: string) {
    this.removeAttribute('style');
    this.setAttribute('style', `fill: ${color}`);
  }
}
