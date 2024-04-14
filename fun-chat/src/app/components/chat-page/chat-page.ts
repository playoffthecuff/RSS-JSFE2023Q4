import styles from './chat-page.module.scss';
import Component from '../base-component';
import Header from '../header/header';
import Footer from '../footer/footer';

export default class ChatPage extends Component {
  constructor() {
    super(styles.ChatPage);
    this.render();
    // this.init();
  }

  private render() {
    const header = new Header('john doe');
    const footer = new Footer();
    this.appendChildren(header, footer);
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
