import { User } from '../../types';

export default class Session {
  private static instance: Session;

  private userData: User = { login: '', isLogined: false, password: '' };

  private constructor(login: string) {
    this.userData.login = login;
  }

  static getSession(login?: string) {
    if (!Session.instance) Session.instance = new Session(login || 'JohnDoe');
    return Session.instance;
  }

  get user() {
    return this.userData;
  }
}
