import styles from './chat-page.module.scss';
import Component from '../base-component';
import Header from '../header/header';
import Footer from '../footer/footer';
import TextInput from '../input/text-input/text-input';
import UList from '../u-list/u-list';

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
