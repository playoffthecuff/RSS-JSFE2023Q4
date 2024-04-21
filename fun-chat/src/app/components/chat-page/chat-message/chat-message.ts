import styles from './chat-message.module.scss';
import sentStateIcon from '../../../../assets/icons/sent24px.svg';
import deliveredStateIcon from '../../../../assets/icons/delivered24px.svg';
import readedStateIcon from '../../../../assets/icons/read24px.svg';
import Component from '../../base-component';
import Icon from '../../icon/icon';
import { Message, Status } from '../../../../types';
import WS from '../../../utils/ws';
import counter from '../../../utils/counter';

export default class ChatMessage extends Component {
  private messageBlock = new Component(styles.messageBlock, 'div');

  private stateIcon = new Icon(sentStateIcon, styles.stateIcon);

  private ws = WS.getWS().ws;

  constructor(message: Message, isOwn: boolean = false) {
    super(styles.messageWrapper);
    this.addClass(isOwn ? styles.own : styles.chatterer);
    this.id = message.id;
    const title = new Component(styles.title);
    const name = isOwn ? 'You' : message.from;
    const nickNameBlock = new Component(styles.nickNameBlock, 'div', name);
    const date = new Date(message.datetime);
    const dateBlock = new Component(
      styles.dateBlock,
      'div',
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    );
    this.messageBlock.textContent = message.text;
    if (isOwn) this.messageBlock.appendChild(this.stateIcon);
    this.setState(message.status, isOwn);
    this.stateIcon.setAttribute('align', 'right');
    title.appendChildren(nickNameBlock, dateBlock);
    this.appendChildren(title, this.messageBlock);
  }

  setState(state: Status, isOwn: boolean) {
    if (state.isDelivered && isOwn) {
      this.setDelivered();
    }
    if (state.isEdited) {
      this.setEdited();
    }
    if (state.isReaded && isOwn) {
      this.setReaded();
    }
  }

  setDelivered() {
    this.stateIcon.setAttribute('src', deliveredStateIcon);
    this.messageBlock.appendChild(this.stateIcon);
  }

  setEdited() {
    const marker = new Component(styles.marker, 'span', '(edited)');
    this.messageBlock.appendChild(marker);
  }

  setReaded() {
    if (this.node.classList.contains(styles.own)) {
      this.stateIcon.setAttribute('src', readedStateIcon);
      this.messageBlock.appendChild(this.stateIcon);
    }
  }

  isVisibleIn(parent: Component) {
    const parentRect = parent.node.getBoundingClientRect();
    const rect = this.node.getBoundingClientRect();
    const isVisibleIn =
      rect.top >= parentRect.top &&
      rect.left >= parentRect.left &&
      rect.bottom <= parentRect.bottom &&
      rect.right <= parentRect.right;
    if (isVisibleIn && this.node.classList.contains(styles.chatterer)) {
      const request = {
        id: String(counter()),
        type: 'MSG_READ',
        payload: {
          message: {
            id: this.id,
          },
        },
      };
      this.ws.send(JSON.stringify(request));
    }
  }
}
