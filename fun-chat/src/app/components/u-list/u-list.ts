import styles from './u-list.module.scss';
import messageIcon from '../../../assets/icons/message24px.svg';
import Component from '../base-component';
import ListItem from '../list-item/list-item';
import Session from '../../utils/session';
import Icon from '../icon/icon';

export default class UList extends Component {
  protected override element: HTMLUListElement;

  private user = Session.getSession().user;

  constructor(users: string[], className?: string) {
    super();
    this.element = document.createElement('ul');
    if (styles.list) this.addClass(styles.list);
    if (className) this.addClass(className);
    users.forEach((user) => {
      if (user !== this.user.login) this.createNewItem(user);
    });
  }

  private createNewItem(text: string, isOffline?: boolean) {
    const item = new ListItem(text);
    const unreadMessages = new Component(styles.unreadMessages);
    unreadMessages.textContent = '1';
    unreadMessages.appendChild(new Icon(messageIcon));
    item.appendChild(unreadMessages);
    if (isOffline) {
      item.addClass(styles.offline);
      this.appendChild(item);
    } else {
      this.prepend(item);
    }
  }

  filter(template: string) {
    this.children.forEach((child) => {
      if (
        child.textContent.includes(template) &&
        !this.node.contains(child.node)
      ) {
        if (child.node.classList.contains(styles.offline)) {
          this.node.appendChild(child.node);
        } else {
          this.node.prepend(child.node);
        }
      }
      if (!child.textContent.includes(template)) {
        if (this.node.contains(child.node)) this.node.removeChild(child.node);
      }
    });
  }

  addOfflineUsers(users: string[]) {
    users.forEach((user) => {
      this.createNewItem(user, true);
    });
  }

  setUserOnline(user: string) {
    let isUserUnlisted = true;
    this.children.forEach((child) => {
      const { innerText } = child.node;
      const endPosition = innerText.indexOf('\n');
      if (innerText.slice(0, endPosition) === user) {
        child.removeClass(styles.offline);
        isUserUnlisted = false;
      }
    });
    if (isUserUnlisted) this.createNewItem(user);
  }

  setUserOffline(user: string) {
    let isUserUnlisted = true;
    this.children.forEach((child) => {
      const { innerText } = child.node;
      const endPosition = innerText.indexOf('\n');
      if (innerText.slice(0, endPosition) === user) {
        child.addClass(styles.offline);
        isUserUnlisted = false;
      }
    });
    if (isUserUnlisted) this.createNewItem(user, true);
  }
}
