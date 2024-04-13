import styles from './about-page.module.scss';
import ghIcon from '../../../assets/icons/github-mark.svg';
import backIcon from '../../../assets/icons/arrow-back-ios24px.svg';
import Component from '../base-component';
import Heading from '../heading/heading';
import IconLink from '../icon-link/icon-link';
import Button from '../button/button';

const ARTICLE_TEXT = 'Have a nice chat.<br>App by ';
const GH_LINK_SRC = 'https://github.com/rolling-scopes-school/playoffthecuff-JSFE2023Q4/';

export default class AboutPage extends Component {
  constructor() {
    super(styles.main, 'main');
    this.render();
  }

  render() {
    const wrapper = new Component(styles.aboutWrapper);
    const heading = new Heading('h1', 'Fun Chat', styles.appName);
    const article = new Component(styles.article, 'article');
    const ghLink = new IconLink(GH_LINK_SRC, ghIcon, undefined, undefined, styles.inlineIcon);
    const prevPageButton = new Button(() => {window.history.back()}, 'button', backIcon);
    article.node.innerHTML = ARTICLE_TEXT;
    article.appendChild(ghLink);
    wrapper.appendChildren(heading, article, prevPageButton);
    this.appendChild(wrapper);
  }
}