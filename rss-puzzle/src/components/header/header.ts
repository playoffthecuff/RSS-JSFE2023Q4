import './header.scss';
import Component from '../base-component';
import Button from '../button/button';
import icon from '../../../public/icons/logout24px.svg';
import clearLocalStorage from '../../services/clearLocalStorage';

export default class Header extends Component {
  private logoutButton;

  constructor(callback: () => void) {
    super('header', ['header']);
    this.logoutButton = new Button(
      () => {
        clearLocalStorage();
        callback();
      },
      icon,
      'logout',
    );
    this.appendChild(this.logoutButton);
  }
}
