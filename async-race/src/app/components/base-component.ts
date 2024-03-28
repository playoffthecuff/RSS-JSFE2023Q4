export default class Component {
  protected element: HTMLElement;

  private children: Component[];

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    className?: string,
    textContent?: string,
  ) {
    this.element = document.createElement(tag);
    if (className) this.addClass(className);
    if (textContent) this.setTextContent(textContent);
    this.children = [];
  }

  get node() {
    return this.element;
  }

  getChildren() {
    return this.children;
  }

  appendChild(child: Component) {
    this.children.push(child);
    this.node.appendChild(child.node);
  }

  appendChildren(...children: Component[]) {
    children.forEach((child) => {
      this.appendChild(child);
    });
  }

  removeChildren() {
    this.children.length = 0;
    this.node.innerHTML = '';
  }

  removeNode() {
    this.node.remove();
  }

  setId(id: string) {
    this.node.id = id;
  }

  setTextContent(textContent: string) {
    this.element.textContent = textContent;
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

  addClassToChildren(className: string) {
    this.getChildren().forEach((child) => child.addClass(className));
  }

  removeClass(className: string) {
    this.node.classList.remove(className);
  }

  removeClassFromChildren(className: string) {
    this.getChildren().forEach((child) => child.removeClass(className));
  }

  toggleClass(className: string) {
    this.node.classList.toggle(className);
  }

  addListener<T extends keyof HTMLElementEventMap>(
    event: T,
    callback: (event: HTMLElementEventMap[T]) => void,
  ) {
    this.node.addEventListener(event, callback);
  }

  removeListener<T extends keyof HTMLElementEventMap>(
    event: T,
    callback: (event: HTMLElementEventMap[T]) => void,
  ) {
    this.node.removeEventListener(event, callback);
  }

  setStyle(styleName: keyof CSSStyleDeclaration, style: string) {
    const propName = styleName as string;
    this.node.style.setProperty(propName, style);
  }
}
