import styles from './u-list.module.scss';
import messageIcon from '../../../assets/icons/message24px.svg';
import Component from '../base-component';
import ListItem from '../list-item/list-item';
import Session from '../../utils/session';
import Icon from '../icon/icon';
import WS from '../../utils/ws';
import counter from '../../utils/counter';

export default class UList extends Component {
  protected override element: HTMLUListElement;

  private session = Session.getSession();

  private user = this.session.user;

  private ws = WS.getWS().ws;

  constructor(users: string[], className?: string) {
    super();
    this.element = document.createElement('ul');
    if (styles.list) this.addClass(styles.list);
    if (className) this.addClass(className);
    users.forEach((user) => {
      if (user !== this.user.login) {
        this.session.addEntryToUnreadMessagesNumber(user);
        this.createNewItem(user);
        this.ws.send(
          JSON.stringify({
            id: String(counter()),
            type: 'MSG_FROM_USER',
            payload: {
              user: {
                login: user,
              },
            },
          }),
        );
      }
    });
  }

  private createNewItem(text: string, isOffline?: boolean) {
    const item = new ListItem();
    item.id = text;
    const textBlock = new Component(styles.textBlock, 'span', text);
    const unreadMessages = new Component(styles.unreadMessages);
    const messageCounter = new Component(styles.messageCounter);
    item.appendChild(textBlock);
    unreadMessages.appendChildren(messageCounter, new Icon(messageIcon));
    unreadMessages.addClass(styles.hidden);
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
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'MSG_FROM_USER',
          payload: {
            user: {
              login: user,
            },
          },
        }),
      );
    });
  }

  setUserOnline(user: string) {
    let isUserUnlisted = true;
    this.children.forEach((child) => {
      if (child.id === user) {
        child.removeClass(styles.offline);
        isUserUnlisted = false;
      }
    });
    if (isUserUnlisted) this.createNewItem(user);
  }

  setUserOffline(user: string) {
    let isUserUnlisted = true;
    this.children.forEach((child) => {
      if (child.id === user) {
        child.addClass(styles.offline);
        isUserUnlisted = false;
      }
    });
    if (isUserUnlisted) this.createNewItem(user, true);
  }

  updateUnreadMessagesNumber(user: string) {
    const messagesNumber = this.session.getUnreadMessagesNumber(user) || 0;
    const targetItem = document.getElementById(user);
    if (targetItem) {
      const unreadMessagesNode = targetItem.lastElementChild as HTMLElement;
      const targetNode = unreadMessagesNode.firstChild as HTMLElement;
      targetNode.textContent = messagesNumber.toString();
      if (messagesNumber) {
        unreadMessagesNode.classList.remove(styles.hidden);
      } else {
        unreadMessagesNode.classList.add(styles.hidden);
      }
    }
  }
}
