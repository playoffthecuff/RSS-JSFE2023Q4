import './header.scss';
import Component from '../base-component';
import Button from '../button/button';

export default class Header extends Component {
  private toGarageButton;

  private toWinnersButton;

  constructor(callback1: () => void, callback2: () => void,) {
    super('header', 'header');
    this.toGarageButton = new Button('TO GARAGE', callback1);
    this.toWinnersButton = new Button('TO WINNERS', callback2);
    this.appendChildren(this.toGarageButton, this.toWinnersButton);
  }
}
