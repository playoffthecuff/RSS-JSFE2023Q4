import styles from './fieldset.module.scss';
// import './fieldset.scss';
import Component from '../base-component';

export default class Fieldset extends Component {
  protected override readonly element: HTMLFieldSetElement;

  private legend;
  
  constructor(legend?: string) {
    super();
    this.element = document.createElement('fieldset');
    this.addClass(styles.fieldset);
    if (legend) {this.legend = new Component('', 'legend', legend);
      this.appendChild(this.legend);
    };
  }
}