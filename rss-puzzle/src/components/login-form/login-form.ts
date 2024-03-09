import './login-form.scss';
import Component from '../base-component';
import LoginInput from './login-input/login-input';

export default class LoginForm extends Component {
  private loginHeader;

  private loginForm;

  private loginButton;

  private firstNameLabel;

  private firstNameInput;

  private lastNameLabel;

  private lastNameInput;

  constructor() {
    super('section', ['login-section'], '');
    this.loginHeader = new Component('h2', ['login-header'], 'USER LOGIN');
    this.loginForm = new Component('form', ['login-form'], '');
    this.loginButton = new Component(
      'button',
      ['login-button', 'disabled'],
      'Login',
    );
    this.firstNameLabel = new Component(
      'label',
      ['login-label'],
      'First Name:',
    );
    this.firstNameLabel.setAttribute('for', 'firstName');
    this.firstNameInput = new LoginInput();
    this.firstNameInput.setAttribute('name', 'firstName');
    this.lastNameLabel = new Component('label', ['login-label'], 'Surname:');
    this.lastNameLabel.setAttribute('for', 'lastName');
    this.lastNameInput = new LoginInput();
    this.lastNameInput.setAttribute('name', 'lastName');
    this.loginForm.appendChildren([
      this.firstNameLabel,
      this.firstNameInput,
      this.lastNameLabel,
      this.lastNameInput,
      this.loginButton,
    ]);
    this.appendChildren([this.loginHeader, this.loginForm]);
    this.firstNameInput.addListener('input', () => {
      if (this.isInputsFilled()) {
        this.loginButton.removeClass('disabled');
      } else {
        this.loginButton.addClass('disabled');
      }
    });
    this.lastNameInput.addListener('input', () => {
      if (this.isInputsFilled()) {
        this.loginButton.removeClass('disabled');
      } else {
        this.loginButton.addClass('disabled');
      }
    });
  }

  isInputsFilled() {
    return this.firstNameInput.isFilled() && this.lastNameInput.isFilled();
  }
}
