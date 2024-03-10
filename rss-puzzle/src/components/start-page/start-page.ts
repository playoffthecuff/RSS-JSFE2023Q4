import './start-page.scss';
import Component from '../base-component';

const DESCRIPTION =
  'RSS Puzzle is an interactive mini-game for learning English by creating puzzles from works of art.';

export default class StartPage extends Component {
  private gameDescription;

  constructor() {
    super('main', ['start-page']);
    this.gameDescription = new Component('p', ['description'], DESCRIPTION);
    this.appendChild(this.gameDescription);
  }
}
