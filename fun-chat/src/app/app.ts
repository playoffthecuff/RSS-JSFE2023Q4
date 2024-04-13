import Page404 from './components/404-page/404-page';
import AboutPage from './components/about-page/about-page';
import Component from './components/base-component';
import ChatPage from './components/chat-page/chat-page';
import LoginPage from './components/login-page/login-page';

const ROUTES = ['login', 'main','about', 'chat', ''];

export default class App extends Component {

  constructor(className: string) {
    super(className);
    this.init();
  }

  private init() {
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

  private renderNewPage(route: typeof ROUTES[number]) {
    this.removeChildren();
    switch (route) {
      case '':
        this.appendChild(new LoginPage());
        break;
      case 'login':
        this.appendChild(new LoginPage());
        break;
      case 'chat':
        this.appendChild(new ChatPage);
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