export default class Component {
  protected readonly element: HTMLElement;

  private childrenArr: Component[];

  constructor(
    className?: string,
    tag: keyof HTMLElementTagNameMap = 'div',
    textContent?: string,
  ) {
    this.element = document.createElement(tag);
    if (className) this.addClass(className);
    if (textContent) this.textContent = textContent;
    this.childrenArr = [];
  }

  get node() {
    return this.element;
  }

  get children() {
    return this.childrenArr;
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

  set textContent(textContent: string) {
    this.element.textContent = textContent;
  }

  setStyle(styleName: keyof CSSStyleDeclaration, style: string) {
    const propName = styleName as string;
    this.node.style.setProperty(propName, style);
  }

  set id(id: string) {
    this.node.id = id;
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

  toggleClass(className: string) {
    this.node.classList.toggle(className);
  }

  removeClass(className: string) {
    this.node.classList.remove(className);
  }

  addClassToChildren(className: string) {
    this.children.forEach((child) => child.addClass(className));
  }

  removeClassFromChildren(className: string) {
    this.children.forEach((child) => child.removeClass(className));
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
}