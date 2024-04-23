import { User } from '../../types';
import ChatMessage from '../components/chat-page/chat-message/chat-message';

export default class Session {
  private static instance: Session;

  private userData: User = { login: '', isLogined: false, password: '' };

  private unreadMessagesNumber: Map<string, number> = new Map<string, number>();

  private messages: Map<string, ChatMessage> = new Map<string, ChatMessage>();

  private isThereUnreadMessage = false;

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

  get isThereUnread() {
    return this.isThereUnreadMessage;
  }

  set isThereUnread(state: boolean) {
    this.isThereUnreadMessage = state;
  }

  getMessage(id: string) {
    return this.messages.get(id);
  }

  putMessage(id: string, message: ChatMessage) {
    this.messages.set(id, message);
  }

  deleteMessage(id: string) {
    this.messages.get(id)?.removeSelf();
    this.messages.delete(id);
  }

  clearMessages() {
    this.messages.clear();
  }

  iterateMessages(
    callback: (
      message: ChatMessage,
      id: string,
      messages: Map<string, ChatMessage>,
    ) => void,
  ) {
    this.messages.forEach(callback);
  }

  addEntryToUnreadMessagesNumber(login: string) {
    this.unreadMessagesNumber.set(login, 0);
  }

  incrementUnreadMessagesNumber(login: string) {
    const currentNumber = this.unreadMessagesNumber.get(login) || 0;
    this.unreadMessagesNumber.set(login, currentNumber + 1);
  }

  decrementUnreadMessagesNumber(login: string) {
    if (login) {
      const currentNumber = this.unreadMessagesNumber.get(login) || 1;
      this.unreadMessagesNumber.set(login, currentNumber - 1);
    }
  }

  getUnreadMessagesNumber(login: string) {
    return this.unreadMessagesNumber.get(login);
  }

  clearUnredMessagesNumber() {
    this.unreadMessagesNumber.clear();
  }
}
