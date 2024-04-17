import styles from './chat-page.module.scss';
import sendIcon from '../../../assets/icons/send24px.svg';
import Component from '../base-component';
import Header from '../header/header';
import Footer from '../footer/footer';
import TextInput from '../input/text-input/text-input';
import UList from '../u-list/u-list';
import ChatMessage from './chat-message/chat-message';
import Button from '../button/button';

export default class ChatPage extends Component {
  constructor() {
    super(styles.ChatPage);
    this.render();
    // this.init();
  }

  private render() {
    const header = new Header('john doe');
    const main = new Component(styles.chat, 'main');
    const aside = new Component(styles.aside, 'aside');
    const searchInput = new TextInput('Find user...', styles.searchInput);
    const usersList = new UList(
      [
        'User1',
        'User2',
        'User3',
        'User4',
        'User5',
        'User6',
        'User7',
        'User8',
        'User9',
        'User10',
        'User11',
        'User12',
      ],
      styles.usersList,
    );
    searchInput.addListener('input', () => {
      usersList.filter(searchInput.value);
    });
    aside.appendChildren(searchInput, usersList);
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
    main.appendChildren(aside, chatSection);
    const footer = new Footer();
    this.appendChildren(header, main, footer);
  }

  // private init() {
  //   const ws = new WebSocket('ws://127.0.0.1:4000/');
  //   ws.onopen = function() {
  //     console.log('open');
  //     ws.send(JSON.stringify({
  //       id: '1',
  //       type: "USER_LOGIN",
  //       payload: {
  //         user: {
  //           login: 'Z',
  //           password: 'Z',
  //         },
  //       },
  //     }))
  //   };
  //   ws.onmessage = (e) => console.log(e.data);
  // }
}
