import './lane.scss';
import Component from '../../base-component';
import Button from '../../button/button';
import Car from '../../car/car';
import SVG from '../../svg/svg';
import finish from '../../../../assets/icons/icon-sprite.svg';
import { controlEngine, switchEngine } from '../../../services/fetch-lib';

export default class Lane extends Component {
  private model;

  selectButton;

  private removeButton;

  private startButton;

  private stopButton;

  car;

  private id;

  private color;

  private controlPanel;

  private nameBlock;

  private time;

  constructor(
    model: string,
    color: string,
    id: number,
    callbackToRemove: () => void,
    callbackToSelect: () => void,
  ) {
    super('div', 'lane');
    this.time = 0;
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
    this.startButton = new Button('START', this.startCar);
    this.stopButton = new Button('STOP', this.stopCar);
    this.stopButton.setAttribute('disabled', '');
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

  stopCar = async () => {
    const engineStatus = await controlEngine(this.id, 'stopped');
    this.car.setStyle('left', `${engineStatus.velocity}px`);
    this.removeButton.removeAttribute('disabled');
    this.selectButton.removeAttribute('disabled');
    this.startButton.removeAttribute('disabled');
    this.stopButton.setAttribute('disabled', '');
    this.time = 0;
  };

  startCar = async () => {
    this.removeButton.setAttribute('disabled', '');
    this.selectButton.setAttribute('disabled', '');
    this.startButton.setAttribute('disabled', '');
    this.stopButton.removeAttribute('disabled');
    const engineStatus = await controlEngine(this.id, 'started');
    const switchEngineStatus = switchEngine(this.id, 'drive');
    const animationTime: number = engineStatus.distance / engineStatus.velocity;
    this.car.setStyle('transition', `left ${animationTime}ms ease-in-out`);
    let result = false;
    this.car.setStyle('left', `${this.node.offsetWidth - 80}px`);
    await switchEngineStatus.then((status) => {
      const currentLeftValue = window.getComputedStyle(this.car.node).left;
      if (status === 500) {
        this.car.setStyle('left', currentLeftValue);
      } else {
        result = true;
        this.time = Math.round(animationTime / 10) / 100;
      }
    });
    return result;
  };

  getWinnerStr() {
    return `Winner is ${this.model} with a ${this.time}s`;
  }

  getId() {
    return this.id;
  }

  getTime() {
    return this.time;
  }
}
