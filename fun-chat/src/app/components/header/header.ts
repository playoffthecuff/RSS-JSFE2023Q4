import styles from './header.module.scss';
import personIcon from '../../../assets/icons/person24px.svg';
import infoIcon from '../../../assets/icons/info24px.svg';
import logoutIcon from '../../../assets/icons/logout24px.svg';
import Component from '../base-component';
import Heading from '../heading/heading';
import Button from '../button/button';
import ModalWindow from '../modal-window/modal-window';
import Icon from '../icon/icon';
import WS from '../../utils/ws';
import { ServerResponse } from '../../../types';
import Session from '../../utils/session';
import counter from '../../utils/counter';

export default class Header extends Component {
  private ws = WS.getWS().ws;

  private user = Session.getSession().user;

  private infoButton = new Button(
    () => {
      window.location.hash = '/about';
    },
    'button',
    infoIcon,
  );

  private logoutButton = new Button(
    () => {
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'USER_LOGOUT',
          payload: {
            user: {
              login: this.user.login,
              password: this.user.password,
            },
          },
        }),
      );
      this.ws.onmessage = (e) => {
        const data: ServerResponse = JSON.parse(e.data);
        if (data.type === 'USER_LOGOUT') window.location.hash = '/login';
        if (data.type === 'ERROR')
          this.appendChild(
            new ModalWindow(`Error: ${data.payload.error}`, true),
          );
      };
    },
    'button',
    logoutIcon,
  );

  constructor(username: string) {
    super(styles.header, 'header');
    this.render(username);
  }

  private render(username: string) {
    this.createUserBlock(username);
    this.createHeading();
    this.createControlPanel();
  }

  private createUserBlock(username: string) {
    const userBlock = new Component(styles.userBlock);
    const userIcon = new Icon(personIcon, styles.userIcon);
    const userName = new Heading('h3', username, styles.userName);
    userBlock.appendChildren(userIcon, userName);
    this.appendChild(userBlock);
  }

  private createHeading() {
    const heading = new Heading('h1', 'Fun Chat', styles.appName);
    this.appendChild(heading);
  }

  private createControlPanel() {
    const controlPanel = new Component(styles.controlPanel);
    controlPanel.appendChildren(this.infoButton, this.logoutButton);
    this.appendChild(controlPanel);
  }
}
