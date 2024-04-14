import styles from './u-list.module.scss';
import Component from '../base-component';
import ListItem from '../list-item/list-item';

export default class UList extends Component {
  protected override element: HTMLUListElement;

  constructor(items: string[], className?: string) {
    super();
    this.element = document.createElement('ul');
    if (styles.list) this.addClass(styles.list);
    if (className) this.addClass(className);
    items.forEach((item) => {
      this.createNewItem(item);
    });
  }

  private createNewItem(text: string) {
    const item = new ListItem(text);
    this.appendChild(item);
  }

  filter(template: string) {
    this.children.forEach((child) => {
      if (
        child.textContent.includes(template) &&
        !this.node.contains(child.node)
      ) {
        this.node.appendChild(child.node);
      }
      if (!child.textContent.includes(template)) {
        this.node.removeChild(child.node);
      }
    });
  }
}
