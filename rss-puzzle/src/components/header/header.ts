import './header.scss';
import Component from '../base-component';
import Button from '../button/button';
import icon from '../../../public/icons/logout24px.svg';
import clearLocalStorage from '../../services/clearLocalStorage';
import IconLink from '../icon-link/icon-link';
import logo from '../../../public/icons/logo.svg';

export default class Header extends Component {
  private logoutButton;

  private appName;

  private logo;

  constructor(callback: () => void) {
    super('header', ['header']);
    this.logo = new IconLink('../../../index.html', logo, 'logo');
    this.appName = new Component('h1', ['app-name'], 'RSS Puzzle');
    this.logoutButton = new Button(
      () => {
        clearLocalStorage();
        callback();
      },
      icon,
      'logout',
    );
    this.appendChild(this.logo);
    this.appendChild(this.appName);
    this.appendChild(this.logoutButton);
  }
}
