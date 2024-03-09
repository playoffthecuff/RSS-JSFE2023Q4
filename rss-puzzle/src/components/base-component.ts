export default class Component {
  private node: HTMLElement;

  private children: Component[];

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    classNames?: string[],
    textContent?: string,
  ) {
    this.node = document.createElement(tag);
    if (classNames && classNames.length) {
      classNames.forEach((className) => this.node.classList.add(className));
    }
    if (textContent) this.node.textContent = textContent;
    this.children = [];
  }

  getNode() {
    return this.node;
  }

  getChildren() {
    return this.children;
  }

  appendChild(child: Component) {
    this.children.push(child);
    this.node.appendChild(child.getNode());
  }

  appendChildren(children: Component[]) {
    children.forEach((child) => this.appendChild(child));
  }

  setId(id: string) {
    this.node.id = id;
  }

  setTextContent(textContent: string) {
    this.node.textContent = textContent;
  }

  setAttribute(attribute: string, value: string) {
    if (!this.node.hasAttribute(attribute)) {
      this.node.setAttribute(attribute, value);
    }
  }

  removeAttribute(attribute: string) {
    this.node.removeAttribute(attribute);
  }

  addClass(className: string) {
    if (!this.node.classList.contains(className)) {
      this.node.classList.add(className);
    }
  }

  removeClass(className: string) {
    this.node.classList.remove(className);
  }

  toggleClass(className: string) {
    this.node.classList.toggle(className);
  }

  addListener<T extends keyof GlobalEventHandlersEventMap>(
    event: T,
    callback: (event: GlobalEventHandlersEventMap[T]) => void,
  ) {
    this.node.addEventListener(event, callback);
  }

  removeListener<T extends keyof GlobalEventHandlersEventMap>(
    event: T,
    callback: (event: GlobalEventHandlersEventMap[T]) => void,
  ) {
    this.node.removeEventListener(event, callback);
  }
}
