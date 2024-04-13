import styles from "./icon.module.scss";
import Component from "../base-component";

export default class Icon extends Component {
  protected override element: HTMLImageElement;

  constructor(src: string, className?: string, alt?: string) {
    super();
    this.element = document.createElement('img');
    if (className) {
      this.addClass(className);
    } else {
      this.addClass(styles.icon);
    };
    this.node.setAttribute('src', src);
    if (alt) this.node.setAttribute('alt', alt);
  }
}
