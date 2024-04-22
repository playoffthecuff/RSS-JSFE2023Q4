import { User } from '../../types';
import ChatMessage from '../components/chat-page/chat-message/chat-message';

export default class Session {
  private static instance: Session;

  private userData: User = { login: '', isLogined: false, password: '' };

  private messagesNumber: Map<string, number> = new Map<string, number>();

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

  addEntryToMessagesNumber(login: string, messagesNumber: number) {
    this.messagesNumber.set(login, messagesNumber);
  }

  incrementMessagesNumber(login: string) {
    const currentNumber = this.messagesNumber.get(login) || 0;
    this.messagesNumber.set(login, currentNumber + 1);
  }

  decrementMessagesNumber(login: string) {
    const currentNumber = this.messagesNumber.get(login) || 1;
    this.messagesNumber.set(login, currentNumber - 1);
  }
}
