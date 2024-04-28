import styles from './footer.module.scss';
import RSSIcon from '../../../assets/icons/rs_school.svg';
import ghIcon from '../../../assets/icons/github-mark.svg';
import Component from '../base-component';
import Heading from '../heading/heading';
import IconLink, { Options } from '../icon-link/icon-link';

const RSS_LINK = 'https://rs.school/';
const GH_LINK = 'https://github.com/playoffthecuff';
const AUTHOR = 'evgenii';

const ghIconOptions: Options = {
  href: GH_LINK,
  iconSrc: ghIcon,
  className: styles.ghIcon,
};

const rssIconOptions: Options = {
  href: RSS_LINK,
  iconSrc: RSSIcon,
  className: styles.rssIcon,
};

export default class Footer extends Component {
  constructor() {
    super(undefined, 'footer');
    this.render();
  }

  private render() {
    this.createRSSLink();
    this.createUserBlock();
    this.createYear();
  }

  private createRSSLink() {
    const link = new IconLink(rssIconOptions);
    this.appendChild(link);
  }

  private createUserBlock() {
    const userBlock = new Component(styles.userBlock);
    const icon = new IconLink(ghIconOptions);
    const authorName = new Heading('h3', AUTHOR, styles.authorName);
    userBlock.appendChildren(icon, authorName);
    this.appendChild(userBlock);
  }

  private createYear() {
    const year = new Heading(
      'h2',
      new Date().getFullYear().toString(),
      styles.year,
    );
    this.appendChild(year);
  }
}
