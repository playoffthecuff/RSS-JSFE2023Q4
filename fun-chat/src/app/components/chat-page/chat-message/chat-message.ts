import styles from './chat-message.module.scss';
import sentStateIcon from '../../../../assets/icons/sent24px.svg';
import deliveredStateIcon from '../../../../assets/icons/delivered24px.svg';
import readedStateIcon from '../../../../assets/icons/read24px.svg';
import Component from '../../base-component';
import Icon from '../../icon/icon';
import { Message, Status } from '../../../../types';

export default class ChatMessage extends Component {
  private messageBlock = new Component(styles.messageBlock, 'div');

  private stateIcon = new Icon(sentStateIcon, styles.stateIcon);

  constructor(message: Message, isOwn: boolean = false) {
    super(styles.messageWrapper);
    this.addClass(isOwn ? styles.own : styles.chatterer);
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
    if (isOwn) this.appendChild(this.stateIcon);
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
    this.stateIcon.setAttribute('src', readedStateIcon);
    this.messageBlock.appendChild(this.stateIcon);
  }
}
