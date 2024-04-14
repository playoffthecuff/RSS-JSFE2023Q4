import styles from './list-item.module.scss';
import Component from '../base-component';

export default class ListItem extends Component {
  protected override element: HTMLLIElement;

  constructor(text?: string, className?: string) {
    super();
    this.element = document.createElement('li');
    if (styles.listItem) this.addClass(styles.listItem);
    if (text) this.textContent = text;
    if (className) this.addClass(className);
  }
}
