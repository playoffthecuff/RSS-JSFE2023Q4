import './car.scss';
import SVG from '../svg/svg';
import icon from '../../../assets/icons/icon-sprite.svg';

export default class Car extends SVG {
  constructor(color: string) {
    super(icon, 'car');
    this.addClass('car-icon');
    this.tuneCar(color);
  }

  tuneCar(color: string) {
    this.removeAttribute('style');
    this.setAttribute('style', `fill: ${color};`);
  }
}
