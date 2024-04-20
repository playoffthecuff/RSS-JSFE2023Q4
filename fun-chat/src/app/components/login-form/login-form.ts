import styles from './login-form.module.scss';
import Component from '../base-component';
import Fieldset from '../fieldset/fieldset';
import LabeledTextInput from '../labeled-input/labeled-input';
import Button from '../button/button';
import loginIcon from '../../../assets/icons/login24px.svg';
import infoIcon from '../../../assets/icons/info24px.svg';
import { ServerResponse } from '../../../types';
import ModalWindow from '../modal-window/modal-window';
import WS from '../../utils/ws';
import Session from '../../utils/session';
import counter from '../../utils/counter';

const FIRST_RULE_NAME_VALIDATION_MSG =
  'The name must be in English letters, starting with capital.';
const SECOND_RULE_NAME_VALIDATION_MSG = 'Minimum name length - 2 characters.';

const FIRST_RULE_PASSWORD_VALIDATION_MSG =
  'Minimum password length - 4 characters.';
const SECOND_RULE_PASSWORD_VALIDATION_MSG =
  'Must contain at least 1 English letter and 1 number.';

export default class LoginForm extends Component {
  private fieldset = new Fieldset('Authorization');

  private nameInput = new LabeledTextInput('Name', 'text', 'Enter your name');

  private passwordInput = new LabeledTextInput(
    'Password',
    'password',
    'Enter password',
  );

  private firstRuleNameTooltip = new Component(styles.tooltip);

  private secondRuleNameTooltip = new Component(styles.tooltip);

  private firstRulePasswordTooltip = new Component(styles.tooltip);

  private secondRulePasswordTooltip = new Component(styles.tooltip);

  private loginButton = new Button(
    null,
    'submit',
    loginIcon,
    '',
    'login-button',
  );

  private infoButton = new Button(
    () => {
      window.location.hash = '/about';
    },
    'button',
    infoIcon,
  );

  private isNameValid = false;

  private isPasswordValid = false;

  private user = Session.getSession().user;

  private ws = WS.getWS().ws;

  protected override readonly element: HTMLFormElement;

  constructor() {
    super();
    this.element = document.createElement('form');
    this.addClass(styles.loginForm);
    this.init();
    this.render();
  }

  private render() {
    this.fieldset.appendChildren(
      this.nameInput,
      this.firstRuleNameTooltip,
      this.secondRuleNameTooltip,
      this.passwordInput,
      this.firstRulePasswordTooltip,
      this.secondRulePasswordTooltip,
    );
    const buttonsWrapper = new Component(styles.buttonsWrapper);
    buttonsWrapper.appendChildren(this.loginButton, this.infoButton);
    this.appendChildren(this.fieldset, buttonsWrapper);
  }

  private init() {
    this.addListener('submit', (event) => {
      event.preventDefault();
      this.ws.onmessage = (e) => {
        const data: ServerResponse = JSON.parse(e.data);
        if (data.type === 'USER_LOGIN') {
          this.user.login = data.payload.user.login;
          if (data.payload.user.isLogined) {
            this.user.isLogined = true;
            window.location.hash = '/chat';
          }
        }
        if (data.type === 'ERROR') {
          this.appendChild(
            new ModalWindow(`Error: ${data.payload.error}`, true),
          );
        }
      };
    });
    this.loginButton.disable();
    this.loginButton.addListener('click', () => {
      this.user.password = this.passwordInput.value;
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'USER_LOGIN',
          payload: {
            user: {
              login: `${this.nameInput.value}`,
              password: `${this.passwordInput.value}`,
            },
          },
        }),
      );
    });
    this.nameInput.addListener('input', () => {
      this.validateName();
    });
    this.passwordInput.addListener('input', () => {
      this.validatePassword();
    });
    this.addListener('input', () => {
      if (this.isNameValid && this.isPasswordValid) {
        this.loginButton.enable();
      } else {
        this.loginButton.disable();
      }
    });
  }

  private validateName() {
    let isValid = false;
    if (!/^[A-Z][a-zA-Z]*$/.test(this.nameInput.value)) {
      this.firstRuleNameTooltip.textContent = FIRST_RULE_NAME_VALIDATION_MSG;
      this.nameInput.setInvalid();
      this.loginButton.disable();
    } else {
      this.firstRuleNameTooltip.textContent = '';
      isValid = true;
    }
    if (!/.{2,}/.test(this.nameInput.value)) {
      this.secondRuleNameTooltip.textContent = SECOND_RULE_NAME_VALIDATION_MSG;
      this.nameInput.setInvalid();
      this.loginButton.disable();
      isValid = false;
    } else {
      this.secondRuleNameTooltip.textContent = '';
      isValid &&= true;
    }
    if (isValid) {
      this.nameInput.setValid();
      this.isNameValid = true;
    }
    this.isNameValid = isValid;
  }

  private validatePassword() {
    let isValid = false;
    if (!/.{4,}/.test(this.passwordInput.value)) {
      this.firstRulePasswordTooltip.textContent =
        FIRST_RULE_PASSWORD_VALIDATION_MSG;
      this.passwordInput.setInvalid();
      this.loginButton.disable();
    } else {
      this.firstRulePasswordTooltip.textContent = '';
      isValid = true;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d).+/.test(this.passwordInput.value)) {
      this.secondRulePasswordTooltip.textContent =
        SECOND_RULE_PASSWORD_VALIDATION_MSG;
      this.passwordInput.setInvalid();
      this.loginButton.disable();
      isValid = false;
    } else {
      this.secondRulePasswordTooltip.textContent = '';
      isValid &&= true;
    }
    if (isValid) {
      this.passwordInput.setValid();
    }
    this.isPasswordValid = isValid;
  }
}
