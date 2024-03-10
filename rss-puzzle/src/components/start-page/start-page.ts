import './start-page.scss';
import Component from '../base-component';
import getGreeting from '../../services/getGreeting';

const DESCRIPTION =
  'RSS Puzzle is an interactive mini-game for learning English by creating puzzles from works of art.';

export default class StartPage extends Component {
  private gameDescription;

  private greeting;

  constructor() {
    super('main', ['start-page']);
    this.gameDescription = new Component('p', ['description'], DESCRIPTION);
    this.greeting = new Component('p', ['greeting'], getGreeting());
    this.appendChild(this.gameDescription);
    this.appendChild(this.greeting);
  }
}
