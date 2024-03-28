import './lane.scss';
import Component from '../../base-component';
import Button from '../../button/button';
import Car from '../../car/car';
import SVG from '../../svg/svg';
import finish from '../../../../assets/icons/icon-sprite.svg';

export default class Lane extends Component {
  private model;

  selectButton;

  protected removeButton;

  private startButton;

  private stopButton;

  private car;

  private id;

  private color;

  private controlPanel;

  private nameBlock;

  constructor(
    model: string,
    color: string,
    id: number,
    callbackToRemove: () => void,
    callbackToSelect: () => void,
  ) {
    super('div', 'lane');
    this.model = model;
    this.id = id;
    this.color = color;
    this.setAttribute('style', `color: ${color}`);
    this.controlPanel = new Component('div', 'control-panel');
    this.nameBlock = new Component('div', 'name-block', model);
    this.selectButton = new Button('SELECT', () => {
      callbackToSelect();
      this.selectButton.setAttribute('disabled', '');
    });
    this.removeButton = new Button('REMOVE', callbackToRemove);
    this.startButton = new Button('START', () => {});
    this.stopButton = new Button('STOP', () => {});
    const track = new Component('div', 'track');
    this.car = new Car(color);
    const flag = new SVG(finish, 'finish');
    flag.addClass('finish-icon');
    track.appendChildren(this.car, flag);
    this.controlPanel.appendChildren(
      this.nameBlock,
      this.selectButton,
      this.removeButton,
      this.startButton,
      this.stopButton,
    );
    this.appendChildren(this.controlPanel, track);
  }

  changeCarColor(color: string) {
    this.car.tuneCar(color);
    this.color = color;
  }

  changeCarName(name: string, color: string) {
    this.nameBlock.setTextContent(name);
    this.removeAttribute('style');
    this.setAttribute('style', `color: ${color}`);
  }

  updateCar(name: string, color: string) {
    this.changeCarColor(color);
    this.changeCarName(name, color);
  }
}
