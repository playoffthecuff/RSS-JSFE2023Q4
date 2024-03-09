import './login-form.scss';
import Component from '../base-component';
import LoginInput from './login-input/login-input';

const SYMBOL_ERR_MSG =
  'The field only accepts English letters and the hyphen character.';
const FIRST_LETTER_ERR_MSG = 'The first letter must be in upper case.';
const MIN_LENGTH_ERR_MSG = 'Minimum number of characters - ';

export default class LoginForm extends Component {
  private loginHeader;

  private loginForm;

  private loginButton;

  private firstNameLabel;

  private firstNameInput;

  private lastNameLabel;

  private lastNameInput;

  private firstNameErrorMessage;

  private lastNameErrorMessage;

  private isInputsValid;

  constructor() {
    super('section', ['login-section'], '');
    this.isInputsValid = 0;
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
    this.firstNameErrorMessage = new Component('p', ['error-message'], '');
    this.lastNameErrorMessage = new Component('p', ['error-message'], '');
    this.loginForm.appendChildren([
      this.firstNameLabel,
      this.firstNameInput,
      this.firstNameErrorMessage,
      this.lastNameLabel,
      this.lastNameInput,
      this.lastNameErrorMessage,
      this.loginButton,
    ]);
    this.appendChildren([this.loginHeader, this.loginForm]);
    this.firstNameInput.addListener('input', this.firstNameInputHandler);
    this.lastNameInput.addListener('input', this.lastNameInputHandler);
  }

  firstNameInputHandler = () => {
    let errorMsg = '';
    if (!this.firstNameInput.isLettersCorrect()) {
      errorMsg += `${SYMBOL_ERR_MSG} `;
      this.isInputsValid *= 0;
    } else {
      this.isInputsValid *= 1;
    }
    if (!this.firstNameInput.isFirstLetterUpperCase()) {
      errorMsg += `${FIRST_LETTER_ERR_MSG} `;
      this.isInputsValid *= 0;
    } else {
      this.isInputsValid *= 1;
    }
    if (!this.firstNameInput.isStrLengthEnough(3)) {
      errorMsg += `${MIN_LENGTH_ERR_MSG}3.`;
      this.isInputsValid *= 0;
    } else {
      this.isInputsValid *= 1;
    }
    this.firstNameErrorMessage.setTextContent(errorMsg);
    this.toggleButton();
  };

  lastNameInputHandler = () => {
    let errorMsg = '';
    if (!this.lastNameInput.isLettersCorrect()) {
      errorMsg += `${SYMBOL_ERR_MSG} `;
      this.isInputsValid *= 0;
    } else {
      this.isInputsValid = 1;
    }
    if (!this.lastNameInput.isFirstLetterUpperCase()) {
      errorMsg += `${FIRST_LETTER_ERR_MSG} `;
      this.isInputsValid *= 0;
    } else {
      this.isInputsValid *= 1;
    }

    if (!this.lastNameInput.isStrLengthEnough(4)) {
      errorMsg += `${MIN_LENGTH_ERR_MSG}4.`;
      this.isInputsValid *= 0;
    } else {
      this.isInputsValid *= 1;
    }
    this.lastNameErrorMessage.setTextContent(errorMsg);
    this.toggleButton();
  };

  isInputsFilled() {
    return this.firstNameInput.isFilled() && this.lastNameInput.isFilled();
  }

  toggleButton = () => {
    if (this.isInputsValid) {
      this.loginButton.removeClass('disabled');
    } else {
      this.loginButton.addClass('disabled');
    }
  };
}
