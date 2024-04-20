import styles from './chat-message.module.scss';
import sentStateIcon from '../../../../assets/icons/sent24px.svg';
import deliveredStateIcon from '../../../../assets/icons/delivered24px.svg';
import readStateIcon from '../../../../assets/icons/read24px.svg';
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
    const nickNameBlock = new Component(
      styles.nickNameBlock,
      'div',
      message.from,
    );
    const date = new Date(message.datetime);
    const dateBlock = new Component(
      styles.dateBlock,
      'div',
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    );
    this.messageBlock.textContent = message.text;
    this.setState(message.status, isOwn);
    this.stateIcon.setAttribute('align', 'right');
    title.appendChildren(nickNameBlock, dateBlock);
    this.appendChildren(title, this.messageBlock);
  }

  setState(state: Status, isOwn: boolean) {
    if (state.isDelivered && isOwn) {
      this.stateIcon.removeAttribute('src');
      this.stateIcon.setAttribute('src', deliveredStateIcon);
      this.messageBlock.appendChild(this.stateIcon);
    }
    if (state.isEdited) {
      const marker = new Component(styles.marker, 'span', '(edited)');
      this.messageBlock.appendChild(marker);
    }
    if (state.isReaded && isOwn) {
      this.stateIcon.removeAttribute('src');
      this.stateIcon.setAttribute('src', readStateIcon);
      this.messageBlock.appendChild(this.stateIcon);
    }
  }
}
