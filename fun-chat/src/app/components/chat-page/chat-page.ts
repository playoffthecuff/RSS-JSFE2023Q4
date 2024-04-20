import styles from './chat-page.module.scss';
import sendIcon from '../../../assets/icons/send24px.svg';
import backIcon from '../../../assets/icons/arrow-back-ios24px.svg';
import Component from '../base-component';
import Header from '../header/header';
import Footer from '../footer/footer';
import TextInput from '../input/text-input/text-input';
import UList from '../u-list/u-list';
// import ChatMessage from './chat-message/chat-message';
import Button from '../button/button';
import Session from '../../utils/session';
import WS from '../../utils/ws';
import counter from '../../utils/counter';
import { ServerResponse } from '../../../types';
import ModalWindow from '../modal-window/modal-window';

const HINT_SELECT_USER = 'Select a user in the side bar to send a message...';
const START_CHAT = 'Write and send your first message using the form below...';

export default class ChatPage extends Component {
  private ws = WS.getWS().ws;

  private user = Session.getSession().user;

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

  constructor() {
    super(styles.ChatPage);
    this.init();
    this.render(this.user.login);
  }

  private render(username: string) {
    const header = new Header(username);
    const main = new Component(styles.chat, 'main');
    const chatSection = new Component(styles.chatSection, 'section');
    const chatWrapper = new Component(styles.chatWrapper);

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
    const sendMessageInput = new TextInput(
      'Message...',
      styles.sendMessageInput,
    );
    const sendMessageButton = new Button(
      null,
      'button',
      sendIcon,
      styles.lowButton,
    );

    sendMessageBlock.appendChildren(sendMessageInput, sendMessageButton);
    chatTitle.appendChildren(
      this.nickNameBlock,
      this.chattererStatusBlock,
      returnButton,
    );

    // const message = new ChatMessage(
    //   'John Doe',
    //   new Date(),
    //   'hi, dude! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus nam architecto libero dignissimos? Blanditiis quas velit saepe veritatis eum.',
    // );
    // const message2 = new ChatMessage('you', new Date(), 'hi, buddy!');
    // message.setReadState();
    // message2.setDeliveredState();

    // chatWrapper.appendChildren(message, message2);
    chatWrapper.appendChildren(this.hintMessage);
    chatSection.appendChildren(sendMessageBlock, chatTitle, chatWrapper);
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
      if (data.type === 'USER_ACTIVE')
        this.createUsersList(data.payload.users.map((user) => user.login));
      if (data.type === 'USER_INACTIVE')
        this.userList!.addOfflineUsers(
          data.payload.users.map((user) => user.login),
        );
      if (data.type === 'MSG_FROM_USER')
        this.createMessageHistory(data.payload.messages);
      if (data.type === 'USER_EXTERNAL_LOGIN')
        this.userList?.setUserOnline(data.payload.user.login);
      if (data.type === 'USER_EXTERNAL_LOGOUT') {
        this.userList?.setUserOffline(data.payload.user.login);
      }
    };
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
      const target = event.target as Element;
      const innerText = target.closest('li')?.innerText || '';
      const userName = innerText.slice(0, innerText.indexOf('\n'));
      this.nickNameBlock.textContent = userName;
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
              login: userName,
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

  private createMessageHistory(messages: string[]) {
    if (messages.length) {
      // console.log(messages);
    } else {
      this.hintMessage.textContent = START_CHAT;
    }
  }
}
