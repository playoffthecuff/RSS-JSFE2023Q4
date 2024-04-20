import styles from './chat-page.module.scss';
import sendIcon from '../../../assets/icons/send24px.svg';
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
import { ServerResponse } from '../../../types';

export default class ChatPage extends Component {
  private ws = WS.getWS().ws;

  private user = Session.getSession().user;

  private userList: UList | null = null;

  private sideBar = new Component(styles.aside, 'aside');

  private searchInput = new TextInput('Find user...', styles.searchInput);

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
    const nickNameBlock = new Component(
      styles.nickNameBlock,
      'div',
      'Unknown user',
    ); // привязать переменную
    const sendMessageBlock = new Component(styles.sendMessageBlock);
    const sendMessageInput = new TextInput(
      'Message...',
      styles.sendMessageInput,
    );
    const sendMessageButton = new Button(
      null,
      'button',
      sendIcon,
      styles.sendMessageButton,
    );
    sendMessageBlock.appendChildren(sendMessageInput, sendMessageButton);
    chatTitle.appendChild(nickNameBlock);
    const message = new ChatMessage(
      'John Doe',
      new Date(),
      'hi, dude! Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum accusamus nam architecto libero dignissimos? Blanditiis quas velit saepe veritatis eum.',
    );
    const message2 = new ChatMessage('you', new Date(), 'hi, buddy!');
    message.setReadState();
    message2.setDeliveredState();
    chatWrapper.appendChildren(message, message2);
    chatSection.appendChildren(sendMessageBlock, chatTitle, chatWrapper);
    main.appendChildren(this.sideBar, chatSection);
    const footer = new Footer();
    this.appendChildren(header, main, footer);
  }

  init() {
    this.ws.send(
      JSON.stringify({
        id: String(counter()),
        type: 'USER_ACTIVE',
        payload: null,
      }),
    );
    this.ws.onmessage = (e) => {
      let data: ServerResponse = JSON.parse(e.data);
      let users = data.payload.users.map((user) => user.login);
      this.userList = new UList(users, styles.userList);

      this.searchInput.addListener('input', () => {
        this.userList!.filter(this.searchInput.value);
      });
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'USER_INACTIVE',
          payload: null,
        }),
      );
      this.ws.onmessage = (ev) => {
        data = JSON.parse(ev.data);
        users = data.payload.users.map((user) => user.login);
        this.userList!.addOfflineUsers(users);
        this.sideBar.appendChildren(this.searchInput, this.userList!);
        this.searchInput.addListener('input', () => {
          this.userList!.filter(this.searchInput.value);
        });
        this.ws.onmessage = (event) => {
          const msgData: ServerResponse = JSON.parse(event.data);
          if (msgData.type === 'USER_EXTERNAL_LOGIN') {
            this.userList?.setOnlineUser(msgData.payload.user.login);
          }
        };
      };
    };
  }
}
