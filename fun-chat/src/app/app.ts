import AboutPage from './components/about-page/about-page';
import Component from './components/base-component';
import LoginPage from './components/login-page/login-page';

const ROUTES = ['login', 'main','about', ''];

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
      ROUTES.forEach(route => {
        if (hash === route) this.renderNewPage(route);
      });
    };
  }

  private renderNewPage(route: typeof ROUTES[number]) {
    this.removeChildren();
    console.log(route);
    switch (route) {
      case '':
        this.appendChild(new LoginPage());
        break;
      case 'login':
        this.appendChild(new LoginPage());
        break;
      case 'about':
        this.appendChild(new AboutPage());
        break;
      default:
        break;
    }
  }
}