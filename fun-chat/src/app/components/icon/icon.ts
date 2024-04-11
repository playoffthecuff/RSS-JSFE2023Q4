import styles from './icon.module.scss';
import Component from '../base-component';

export default class Icon extends Component {
  protected override element: HTMLImageElement;

  constructor(src: string, alt?: string) {
    super();
    this.element = document.createElement('img');
    this.node.classList.add(styles.icon);
    this.node.setAttribute('src', src);
    if (alt) this.node.setAttribute('alt', alt);
  }
}