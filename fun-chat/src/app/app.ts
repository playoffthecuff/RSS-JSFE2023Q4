import Page404 from './components/404-page/404-page';
import AboutPage from './components/about-page/about-page';
import Component from './components/base-component';
import ChatPage from './components/chat-page/chat-page';
import LoginPage from './components/login-page/login-page';
import Session from './utils/session';
import WS from './utils/ws';

const ROUTES = ['login', 'main', 'about', ''];
const WS_SERVER_URL = 'ws://127.0.0.1:4000/';

export default class App extends Component {
  private user = Session.getSession().user;

  constructor(className: string) {
    super(className);
    this.init();
  }

  private init() {
    WS.getWS(WS_SERVER_URL);
    let hash = window.location.hash.slice(2);
    if (!hash) {
      window.location.hash = '#/';
      this.renderNewPage('');
    } else {
      this.renderNewPage(hash);
    }
    window.onhashchange = () => {
      hash = window.location.hash.slice(2);
      this.renderNewPage(hash);
    };
  }

  private renderNewPage(route: (typeof ROUTES)[number]) {
    this.removeChildren();
    switch (route) {
      case '':
        this.appendChild(new LoginPage());
        break;
      case 'login':
        if (this.user.isLogined) {
          window.location.hash = '/main';
        } else {
          this.appendChild(new LoginPage());
        }
        break;
      case 'main':
        if (this.user.isLogined) {
          this.appendChild(new ChatPage());
        } else {
          window.location.hash = '/login';
        }
        break;
      case 'about':
        this.appendChild(new AboutPage());
        break;
      default:
        this.appendChild(new Page404());
        break;
    }
  }
}
