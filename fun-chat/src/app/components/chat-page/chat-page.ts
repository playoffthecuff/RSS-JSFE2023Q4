import styles from './chat-page.module.scss';
import Component from '../base-component';

export default class ChatPage extends Component {
  constructor() {
    super(styles.main, 'main', 'Типа чат');
    this.render();
    this.init();
  }

  private render() {
    
  }

  private init() {

  }
}