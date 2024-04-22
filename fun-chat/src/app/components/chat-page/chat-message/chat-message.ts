import styles from './chat-message.module.scss';
import sentStateIcon from '../../../../assets/icons/sent24px.svg';
import deliveredStateIcon from '../../../../assets/icons/delivered24px.svg';
import readedStateIcon from '../../../../assets/icons/read24px.svg';
import editIcon from '../../../../assets/icons/edit24px.svg';
import deleteIcon from '../../../../assets/icons/delete24px.svg';
import backIcon from '../../../../assets/icons/arrow-back-ios24px.svg';
import Component from '../../base-component';
import Icon from '../../icon/icon';
import { Message, Status } from '../../../../types';
import WS from '../../../utils/ws';
import counter from '../../../utils/counter';
import Button from '../../button/button';

export default class ChatMessage extends Component {
  private messageBlock = new Component(styles.messageBlock);

  private textBlock = new Component(styles.textBlock, 'span');

  private stateIcon = new Icon(sentStateIcon, styles.stateIcon);

  private marker = new Component(styles.marker, 'span', '(edited)');

  private contextMenu = new Component(styles.contextMenu);

  private editButton = new Button(null, 'button', editIcon);

  private deleteButton = new Button(null, 'button', deleteIcon);

  private ws = WS.getWS().ws;

  returnButton = new Button(null, 'button', backIcon);

  constructor(message: Message, isOwn: boolean = false) {
    super(styles.messageWrapper);
    this.addClass(isOwn ? styles.own : styles.chatterer);
    this.id = message.id;
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
    this.textBlock.textContent = message.text;
    if (isOwn) this.messageBlock.appendChild(this.stateIcon);
    this.setState(message.status, isOwn);
    title.appendChildren(nickNameBlock, dateBlock);
    this.appendChildren(title);

    this.render(isOwn);
    this.init(isOwn);
  }

  private render(isOwn: boolean) {
    this.messageBlock.prepend(this.textBlock);
    this.contextMenu.appendChildren(
      this.editButton,
      this.deleteButton,
      this.returnButton,
    );
    this.appendChild(this.messageBlock);
    if (isOwn) this.appendChild(this.contextMenu);
  }

  private init(isOwn: boolean) {
    this.stateIcon.setAttribute('align', 'right');
    this.contextMenu.addClass(styles.hidden);
    if (isOwn) {
      this.addListener('contextmenu', (event) => {
        event.preventDefault();
        this.contextMenu.removeClass(styles.hidden);
        this.returnButton.addListener('click', () => {
          this.contextMenu.addClass(styles.hidden);
        });
        this.editButton.addClass('edit-message');
        this.deleteButton.addListener('click', () => {
          this.ws.send(
            JSON.stringify({
              id: String(counter()),
              type: 'MSG_DELETE',
              payload: {
                message: {
                  id: this.id,
                },
              },
            }),
          );
        });
      });
    }
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
    this.messageBlock.appendChild(this.marker);
  }

  setReaded() {
    if (this.node.classList.contains(styles.own)) {
      this.stateIcon.setAttribute('src', readedStateIcon);
      this.messageBlock.appendChild(this.stateIcon);
    }
  }

  handleVisible(parent: Component) {
    const parentRect = parent.node.getBoundingClientRect();
    const rect = this.node.getBoundingClientRect();
    const isVisible =
      rect.top >= parentRect.top &&
      rect.left >= parentRect.left &&
      rect.bottom - 4 <= parentRect.bottom &&
      rect.right <= parentRect.right;
    if (isVisible && this.node.classList.contains(styles.chatterer)) {
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

  getMessage() {
    return this.textBlock.textContent;
  }

  setMessage(message: string) {
    this.textBlock.textContent = message;
  }

  hideContextMenu() {
    this.contextMenu.addClass(styles.hidden);
  }
}
