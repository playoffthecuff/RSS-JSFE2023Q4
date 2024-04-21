import { User } from '../../types';
import ChatMessage from '../components/chat-page/chat-message/chat-message';

export default class Session {
  private static instance: Session;

  private userData: User = { login: '', isLogined: false, password: '' };

  private messages: { [key: string]: ChatMessage } = {};

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

  getMessage(id: string) {
    return this.messages[id];
  }

  putMessage(id: string, message: ChatMessage) {
    this.messages[id] = message;
  }

  deleteMessage(id: string) {
    delete this.messages[id];
  }
}
