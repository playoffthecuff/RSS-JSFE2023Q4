import styles from "./login-form.module.scss";
import Component from "../base-component";
import Fieldset from "../fieldset/fieldset";
import LabeledTextInput from "../labeled-text-input/labeled-text-input";
import Button from "../button/button";
import loginIcon from "../../../assets/icons/login24px.svg";
import infoIcon from "../../../assets/icons/info24px.svg";
import IconLink from "../icon-link/icon-link";

export default class LoginForm extends Component {
  protected override readonly element: HTMLFormElement;

  private fieldset = new Fieldset("Authorization");

  private nameInput = new LabeledTextInput("Name", "Enter your name", true);

  private passwordInput = new LabeledTextInput(
    "Password",
    "Enter password",
    true,
  );

  private firstRuleNameTooltip = new Component(styles.tooltip);

  private secondRuleNameTooltip = new Component(styles.tooltip);

  private firstRulePasswordTooltip = new Component(styles.tooltip);

  private secondRulePasswordTooltip = new Component(styles.tooltip);

  private loginButton = new Button(() => {}, 'button', loginIcon, 'login-button');

  private infoLink = new IconLink('#/about', infoIcon, '', '', null, false);

  constructor() {
    super();
    this.element = document.createElement("form");
    this.addClass(styles.loginForm);
    this.renderContent();
  }

  renderContent() {
    this.fieldset.appendChildren(
      this.nameInput,
      this.firstRuleNameTooltip,
      this.secondRuleNameTooltip,
      this.passwordInput,
      this.firstRulePasswordTooltip,
      this.secondRulePasswordTooltip,
    );
    const buttonsWrapper = new Component(styles.buttonsWrapper);
    buttonsWrapper.appendChildren(this.loginButton, this.infoLink);
    this.appendChildren(this.fieldset, buttonsWrapper);
  }
}
