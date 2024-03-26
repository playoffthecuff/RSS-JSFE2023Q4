import './lane.scss';
import Component from '../../base-component';
import Button from '../../button/button';
import Car from '../../car/car';
import SVG from '../../svg/svg';
import finish from '../../../../assets/icons/icon-sprite.svg';

const TEST_SPEED = 50;

export default class Lane extends Component {
  private model;

  private selectButton;

  private removeButton;

  private startButton;

  private stopButton;

  private car;

  constructor(model: string, color: string, speed: number) {
    super('div', 'lane');
    this.model = model;
    const controlPanel = new Component('div', 'control-panel', model);
    this.selectButton = new Button('SELECT', () => {});
    this.removeButton = new Button('REMOVE', () => {});
    this.startButton = new Button('START', () => {});
    this.stopButton = new Button('STOP', () => {});
    const track = new Component('div', 'track');
    this.car = new Car(color, TEST_SPEED);
    const flag = new SVG(finish, 'finish');
    flag.addClass('finish-icon');
    track.appendChildren(this.car, flag);
    controlPanel.appendChildren(
      this.selectButton,
      this.removeButton,
      this.startButton,
      this.stopButton,
    );
    this.appendChildren(controlPanel, track);
  }
}
