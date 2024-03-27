import './lane.scss';
import Component from '../../base-component';
import Button from '../../button/button';
import Car from '../../car/car';
import SVG from '../../svg/svg';
import finish from '../../../../assets/icons/icon-sprite.svg';

export default class Lane extends Component {
  private model;

  private selectButton;

  protected removeButton;

  private startButton;

  private stopButton;

  private car;

  private id;

  constructor(model: string, color: string, id: number, callbackToRemove: () => void) {
    super('div', 'lane');
    this.model = model;
    this.id = id;
    const controlPanel = new Component('div', 'control-panel', model);
    this.selectButton = new Button('SELECT', () => {});
    this.removeButton = new Button('REMOVE', callbackToRemove);
    this.startButton = new Button('START', () => {});
    this.stopButton = new Button('STOP', () => {});
    const track = new Component('div', 'track');
    this.car = new Car(color);
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
