import styles from './fieldset.module.scss';
// import './fieldset.scss';
import Component from '../base-component';

export default class Fieldset extends Component {
  private legend;

  protected override readonly element: HTMLFieldSetElement;

  constructor(legend?: string) {
    super();
    this.element = document.createElement('fieldset');
    this.addClass(styles.fieldset);
    if (legend) {this.legend = new Component('', 'legend', legend);
      this.appendChild(this.legend);
    };
  }
}