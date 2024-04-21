import styles from './chat-page.module.scss';
import sendIcon from '../../../assets/icons/send24px.svg';
import backIcon from '../../../assets/icons/arrow-back-ios24px.svg';
import Component from '../base-component';
import Header from '../header/header';
import Footer from '../footer/footer';
import TextInput from '../input/text-input/text-input';
import UList from '../u-list/u-list';
import ChatMessage from './chat-message/chat-message';
import Button from '../button/button';
import Session from '../../utils/session';
import WS from '../../utils/ws';
import counter from '../../utils/counter';
import { Message, ServerResponse } from '../../../types';
import ModalWindow from '../modal-window/modal-window';

const HINT_SELECT_USER = 'Select a user in the side bar to send a message...';
const START_CHAT = 'Write and send your first message using the form below...';

export default class ChatPage extends Component {
  private ws = WS.getWS().ws;

  private session = Session.getSession();

  private user = this.session.user;

  private userList: UList | null = null;

  private sideBar = new Component(styles.sideBar, 'aside');

  private searchInput = new TextInput('Find user...', styles.searchInput);

  private hintMessage = new Component(
    styles.hintMessage,
    'div',
    HINT_SELECT_USER,
  );

  private nickNameBlock = new Component(styles.nickName);

  private chattererStatusBlock = new Component(styles.chattererStatus);

  private sendMessageInput = new TextInput(
    'Message...',
    styles.sendMessageInput,
  );

  private sendMessageButton = new Button(
    () => {
      this.sendMessage();
    },
    'button',
    sendIcon,
    styles.lowButton,
  );

  private chattererName = '';

  private chatWrapper = new Component(styles.chatWrapper);

  private divider = new Component(styles.divider);

  constructor() {
    super(styles.ChatPage);
    this.init();
    this.render(this.user.login);
  }

  private render(username: string) {
    const header = new Header(username);
    const main = new Component(styles.chat, 'main');
    const chatSection = new Component(styles.chatSection, 'section');

    const chatTitle = new Component(styles.chatTitle);
    const returnButton = new Button(
      () => {
        this.sideBar.addClass(styles.visible);
      },
      'button',
      backIcon,
      styles.lowButton,
      styles.returnButton,
    );
    const sendMessageBlock = new Component(styles.sendMessage);

    sendMessageBlock.appendChildren(
      this.sendMessageInput,
      this.sendMessageButton,
    );
    chatTitle.appendChildren(
      this.nickNameBlock,
      this.chattererStatusBlock,
      returnButton,
    );

    this.chatWrapper.appendChildren(this.hintMessage);
    chatSection.appendChildren(sendMessageBlock, chatTitle, this.chatWrapper);
    main.appendChildren(this.sideBar, chatSection);

    const footer = new Footer();
    this.appendChildren(header, main, footer);
  }

  private init() {
    this.ws.send(
      JSON.stringify({
        id: String(counter()),
        type: 'USER_ACTIVE',
        payload: null,
      }),
    );
    this.ws.onmessage = (event) => {
      const data: ServerResponse = JSON.parse(event.data);
      if (data.type === 'ERROR') this.errorResponseHandler(data.payload.error);
      if (data.type === 'USER_LOGOUT') {
        this.user.isLogined = false;
        window.location.hash = '/login';
      }
      if (data.type === 'USER_ACTIVE')
        this.createUsersList(data.payload.users.map((user) => user.login));
      if (data.type === 'USER_INACTIVE')
        this.userList!.addOfflineUsers(
          data.payload.users.map((user) => user.login),
        );
      if (data.type === 'MSG_FROM_USER') {
        if (data.payload.messages.length) {
          this.createMessageHistory(data.payload.messages);
        } else {
          this.hintMessage.textContent = START_CHAT;
          this.chatWrapper.appendChild(this.hintMessage);
        }
      }
      if (data.type === 'USER_EXTERNAL_LOGIN') {
        this.userList?.setUserOnline(data.payload.user.login);
        if (this.nickNameBlock.textContent === data.payload.user.login)
          this.chattererStatusBlock.textContent = 'online';
      }
      if (data.type === 'USER_EXTERNAL_LOGOUT') {
        this.userList?.setUserOffline(data.payload.user.login);
        if (this.nickNameBlock.textContent === data.payload.user.login)
          this.chattererStatusBlock.textContent = 'offline';
      }
      if (data.type === 'MSG_SEND') this.createMessage(data.payload.message);
      if (data.type === 'MSG_DELIVER')
        this.session.getMessage(data.payload.message.id)!.setDelivered();
      if (data.type === 'MSG_READ')
        this.session.getMessage(data.payload.message.id)?.setReaded();
    };
    const dividerText = new Component(
      styles.dividerText,
      'span',
      'new messages',
    );
    this.divider.appendChild(dividerText);
    this.chatWrapper.addListener('scroll', () => {
      this.session.iterateMessages((message: ChatMessage) =>
        message.isVisibleIn(this.chatWrapper),
      );
    });
  }

  private errorResponseHandler(error: string) {
    this.appendChild(new ModalWindow(`Error: ${error}`, true));
  }

  private createUsersList(users: string[]) {
    this.userList = new UList(users, styles.userList);
    this.searchInput.addListener('input', () => {
      this.userList!.filter(this.searchInput.value);
    });
    this.userList.addListener('click', (event) => {
      this.session.clearMessages();
      this.chatWrapper.removeChildren();
      const target = event.target as Element;
      const innerText = target.closest('li')?.innerText || '';
      this.chattererName = innerText.slice(0, innerText.indexOf('\n'));
      this.nickNameBlock.textContent = this.chattererName;
      this.chattererStatusBlock.textContent = target
        .closest('li')
        ?.classList.value.includes('offline')
        ? 'offline'
        : 'online';
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'MSG_FROM_USER',
          payload: {
            user: {
              login: this.chattererName,
            },
          },
        }),
      );
    });
    this.sideBar.appendChildren(this.searchInput, this.userList!);
    this.ws.send(
      JSON.stringify({
        id: String(counter()),
        type: 'USER_INACTIVE',
        payload: null,
      }),
    );
  }

  private createMessageHistory(messages: Message[]) {
    if (messages.length) {
      messages.forEach((message) => this.createMessage(message));
    } else {
      this.hintMessage.removeClass(styles.hidden);
      this.hintMessage.textContent = START_CHAT;
    }
  }

  private sendMessage() {
    if (this.sendMessageInput.value.length && this.chattererName.length) {
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'MSG_SEND',
          payload: {
            message: {
              to: this.chattererName,
              text: this.sendMessageInput.value,
            },
          },
        }),
      );
    }
    this.sendMessageInput.value = '';
  }

  private createMessage(message: Message) {
    const isOwn = this.user.login === message.from;
    if (message.from === this.chattererName || isOwn) {
      this.hintMessage.addClass(styles.hidden);
      const chatMessage = new ChatMessage(message, isOwn);
      this.session.putMessage(message.id, chatMessage);
      this.chatWrapper.appendChild(chatMessage);
      if (!message.status.isReaded && !this.session.isThereUnread && !isOwn) {
        this.session.isThereUnread = true;
        this.chatWrapper.appendChild(this.divider);
        this.scrollToDivider();
      } else {
        this.scrollToEnd();
      }
    }
  }

  scrollToEnd() {
    this.chatWrapper.node.scrollTop = this.chatWrapper.node.scrollHeight;
  }

  scrollToDivider() {
    const wrapperRect = this.chatWrapper.node.getBoundingClientRect();
    const dividerRect = this.divider.node.getBoundingClientRect();
    const distanceToScroll = dividerRect.top - wrapperRect.top;
    this.chatWrapper.node.scrollTop += distanceToScroll;
  }
}
