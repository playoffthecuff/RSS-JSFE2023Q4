import styles from './chat-message.module.scss';
import sentStateIcon from '../../../../assets/icons/sent24px.svg';
import deliveredStateIcon from '../../../../assets/icons/delivered24px.svg';
import readStateIcon from '../../../../assets/icons/read24px.svg';
import Component from '../../base-component';
import Icon from '../../icon/icon';

export default class ChatMessage extends Component {
  private messageBlock = new Component(styles.messageBlock, 'div');

  private stateIcon = new Icon(sentStateIcon, styles.stateIcon);

  constructor(username: string | 'you', date: Date, message: string) {
    super(styles.messageWrapper);
    this.addClass(username !== 'you' ? styles.chatterer : styles.you);
    const title = new Component(styles.title);
    const nickNameBlock = new Component(styles.nickNameBlock, 'div', username);
    const dateBlock = new Component(
      styles.dateBlock,
      'div',
      `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`,
    );
    this.messageBlock.textContent = message;
    this.stateIcon.setAttribute('align', 'right');
    title.appendChildren(nickNameBlock, dateBlock);
    this.appendChildren(title, this.messageBlock);
  }

  setSentState() {
    this.stateIcon.removeAttribute('src');
    this.stateIcon.setAttribute('src', sentStateIcon);
    this.messageBlock.appendChild(this.stateIcon);
  }

  setDeliveredState() {
    this.stateIcon.removeAttribute('src');
    this.stateIcon.setAttribute('src', deliveredStateIcon);
    this.messageBlock.appendChild(this.stateIcon);
  }

  setReadState() {
    this.stateIcon.removeAttribute('src');
    this.stateIcon.setAttribute('src', readStateIcon);
    this.messageBlock.appendChild(this.stateIcon);
  }
}
