import './car.scss';
import SVG from '../svg/svg';
import icon from '../../../assets/icons/icon-sprite.svg';

const ANIMATION_TIME = 100;

export default class Car extends SVG {
  constructor(color: string, speed: number) {
    super(icon, 'car');
    this.addClass('car-icon');
    this.tuneCar(color, speed);
  }

  tuneCar(color: string, speed: number) {
    const transitionTime = ANIMATION_TIME / speed;
    this.removeAttribute('style');
    this.setAttribute('style', `fill: ${color}; transition: left ${transitionTime}s ease-in-out`);
  }
}
