import styles from './chat-page.module.scss';
import messageStyles from './chat-message/chat-message.module.scss';
import sendIcon from '../../../assets/icons/send24px.svg';
import backIcon from '../../../assets/icons/arrow-back-ios24px.svg';
import closeIcon from '../../../assets/icons/highlight-off24px.svg';
import Component from '../base-component';
import Header from '../header/header';
import Footer from '../footer/footer';
import TextInput from '../input/text-input/text-input';
import UList from '../u-list/u-list';
import ChatMessage from './chat-message/chat-message';
import Button from '../button/button';
import Session from '../../utils/session';
import WS from '../../utils/ws';
import counter from '../../utils/counter';
import { Message, ServerResponse } from '../../../types';
import ModalWindow from '../modal-window/modal-window';
import PopupWindow from '../popup-window/popup-window';

const HINT_SELECT_USER = 'Select a user in the side bar to send a message...';
const START_CHAT = 'Write and send your first message using the form below...';

export default class ChatPage extends Component {
  private ws = WS.getWS().ws;

  private session = Session.getSession();

  private state = '';

  private reconnectIntervalId: NodeJS.Timeout | null = null;

  private user = this.session.user;

  private userList: UList | null = null;

  private popupWindow = new PopupWindow(
    'Connection lost! Trying to restore it...',
  );

  private sideBar = new Component(styles.sideBar, 'aside');

  private searchInput = new TextInput('Find user...', styles.searchInput);

  private hintMessage = new Component(
    styles.hintMessage,
    'div',
    HINT_SELECT_USER,
  );

  private nickNameBlock = new Component(styles.nickName);

  private chattererStatusBlock = new Component(styles.chattererStatus);

  private sendMessageForm = new Component(styles.sendMessage, 'form');

  private sendMessageInput = new TextInput(
    'Message...',
    styles.sendMessageInput,
  );

  private sendMessageButton = new Button(
    null,
    'submit',
    sendIcon,
    styles.lowButton,
  );

  private cancelEditButton = new Button(
    null,
    'button',
    closeIcon,
    styles.cancelEditButton,
  );

  private chattererName = '';

  private chatWrapper = new Component(styles.chatWrapper);

  private divider = new Component(styles.divider);

  private header: Header | null = null;

  constructor() {
    super(styles.ChatPage);
    this.init();
    this.render(this.user.login);
  }

  private render(username: string) {
    this.header = new Header(username);
    const main = new Component(styles.chat, 'main');
    const chatSection = new Component(styles.chatSection, 'section');

    const chatTitle = new Component(styles.chatTitle);
    const returnButton = new Button(
      () => {
        this.sideBar.addClass(styles.visible);
      },
      'button',
      backIcon,
      styles.lowButton,
      styles.returnButton,
    );
    this.sendMessageForm.appendChildren(
      this.sendMessageInput,
      this.sendMessageButton,
    );
    chatTitle.appendChildren(
      this.nickNameBlock,
      this.chattererStatusBlock,
      returnButton,
    );

    this.chatWrapper.appendChildren(this.hintMessage);
    chatSection.appendChildren(
      this.sendMessageForm,
      chatTitle,
      this.chatWrapper,
    );
    main.appendChildren(this.sideBar, chatSection);

    const footer = new Footer();
    this.appendChildren(this.header, main, footer);
  }

  private init() {
    this.ws.send(
      JSON.stringify({
        id: String(counter()),
        type: 'USER_ACTIVE',
        payload: null,
      }),
    );

    this.addOnMessageHandlers();

    this.addOnCloseHandler();

    this.session.clearUnreadMessagesNumber();

    this.session.clearSendMessages();

    const dividerText = new Component(
      styles.dividerText,
      'span',
      'new messages',
    );
    this.divider.appendChild(dividerText);

    this.sendMessageForm.addListener('submit', (event) => {
      event.preventDefault();
    });
    this.chatWrapper.addListener('scroll', () => {
      this.session.iterateMessages((message: ChatMessage) => {
        if (this.session.getScrollMode() === 'manual') {
          message.handleVisible(this.chatWrapper);
          this.divider.removeNode();
        }
      });
    });
    this.chatWrapper.addListener('click', (event) => {
      this.divider.removeNode();
      this.session.setAllMessagesAsRead();
      const target = event.target as Element;
      if (target.closest('.edit-message')) {
        const editedMessageButton = target.closest('.edit-message');
        const contextMenu = editedMessageButton?.closest(
          `.${messageStyles.contextMenu}`,
        );
        const wrapper = contextMenu?.closest(
          `.${messageStyles.messageWrapper}`,
        );
        const id = wrapper?.id as string;
        this.editMessage(id);
      }
    });
    this.cancelEditButton.node.onclick = this.finishEditMessage;
    this.sendMessageButton.node.onclick = this.sendMessage;
    this.sendMessageButton.addListener('click', () => {
      this.divider.removeNode();
    });

    this.sendMessageButton.setAttribute('disabled');
    this.sendMessageInput.setAttribute('disabled');
    this.cancelEditButton.addClass(styles.hidden);
    this.sendMessageForm.appendChild(this.cancelEditButton);
  }

  private addOnMessageHandlers() {
    this.ws.onmessage = (event) => {
      const data: ServerResponse = JSON.parse(event.data);
      if (data.type === 'USER_LOGIN') {
        if (this.user.isLogined) {
          this.ws.send(
            JSON.stringify({
              id: String(counter()),
              type: 'USER_ACTIVE',
              payload: null,
            }),
          );
        }
        this.user.login = data.payload.user.login;
        if (data.payload.user.isLogined) {
          window.location.hash = '/main';
          this.user.isLogined = true;
        }
      }
      if (data.type === 'ERROR') {
        const modalWindow = new ModalWindow(
          `Error: ${data.payload.error}`,
          true,
        );
        const { node } = modalWindow;
        document.body.append(node);
      }
      if (data.type === 'USER_LOGOUT') {
        this.user.isLogined = false;
        this.state = 'logout';
        window.location.hash = '/login';
      }
      if (data.type === 'USER_ACTIVE')
        this.createUsersList(data.payload.users.map((user) => user.login));
      if (data.type === 'USER_INACTIVE')
        this.userList!.addOfflineUsers(
          data.payload.users.map((user) => user.login),
        );
      if (data.type === 'MSG_FROM_USER') {
        if (data.payload.messages.length && this.state === 'startChat') {
          this.createCorrespondence(data.payload.messages);
          this.state = 'chat';
        } else if (this.state === 'startChat') {
          this.hintMessage.textContent = START_CHAT;
          this.hintMessage.removeClass(styles.hidden);
          this.chatWrapper.appendChild(this.hintMessage);
        } else {
          this.updateUnreadMessagesNumber(data.payload.messages);
        }
      }
      if (data.type === 'USER_EXTERNAL_LOGIN') {
        this.userList?.setUserOnline(data.payload.user.login);
        if (this.nickNameBlock.textContent === data.payload.user.login)
          this.chattererStatusBlock.textContent = 'online';
      }
      if (data.type === 'USER_EXTERNAL_LOGOUT') {
        this.userList?.setUserOffline(data.payload.user.login);
        if (this.nickNameBlock.textContent === data.payload.user.login)
          this.chattererStatusBlock.textContent = 'offline';
      }
      if (data.type === 'MSG_SEND') {
        const { message } = data.payload;
        this.createMessage(message);
        if (message.from !== this.user.login) {
          this.session.incrementUnreadMessagesNumber(message.from);
          this.userList?.updateUnreadMessagesNumber(message.from);
          this.session.putSendedMessage(message.id, message);
        }
      }

      if (data.type === 'MSG_DELIVER')
        this.session.getMessage(data.payload.message.id)!.setDelivered();
      if (data.type === 'MSG_READ') {
        const message = this.session.getMessage(data.payload.message.id);
        message?.setReaded();
        const from = message?.getFrom() || '';
        this.session.decrementUnreadMessagesNumber(from);
        this.userList?.updateUnreadMessagesNumber(from);
      }
      if (data.type === 'MSG_DELETE') {
        const { id } = data.payload.message;
        const message = this.session.getSendedMessage(id);
        const from = message?.from || '';
        this.session.deleteMessage(id);
        if (!message?.status.isReaded) {
          this.session.decrementUnreadMessagesNumber(from);
          this.userList?.updateUnreadMessagesNumber(from);
        }
      }
      if (data.type === 'MSG_EDIT') {
        const message = this.session.getMessage(data.payload.message.id);
        message?.setMessage(data.payload.message.text);
        message?.setEdited();
      }
    };
  }

  private addOnCloseHandler() {
    const { node } = this.popupWindow;
    this.ws.onclose = () => {
      this.popupWindow.open();
      document.body.appendChild(node);
      const restore = () => {
        WS.getWS().repeatConnect();
        WS.getWS().ws.onopen = () => {
          clearInterval(this.reconnectIntervalId as NodeJS.Timeout);
          this.popupWindow.close();
          this.ws.close();
          WS.getWS().repeatConnect();
          this.ws = WS.getWS().ws;
          this.ws.onopen = () => {
            this.header!.setWS(this.ws);
            this.addOnMessageHandlers();
            this.session.clearUnreadMessagesNumber();
            this.session.clearMessages();
            this.session.clearSendMessages();
            this.chatWrapper.removeChildren();
            this.hintMessage.textContent = HINT_SELECT_USER;
            this.chatWrapper.appendChild(this.hintMessage);
            this.hintMessage.removeClass(styles.hidden);
            this.state = '';
            this.nickNameBlock.textContent = '';
            this.chattererStatusBlock.textContent = '';
            this.sendMessageButton.setAttribute('disabled');
            this.sendMessageInput.setAttribute('disabled');
            this.userList?.removeNode();
            this.userList = null;
            this.ws.send(
              JSON.stringify({
                id: String(counter()),
                type: 'USER_LOGIN',
                payload: {
                  user: {
                    login: this.user.login,
                    password: this.user.password,
                  },
                },
              }),
            );
          };
        };
      };
      this.reconnectIntervalId = setInterval(restore, 1000);
    };
  }

  private createUsersList(users: string[]) {
    this.userList = new UList(users, styles.userList);
    this.searchInput.addListener('input', () => {
      this.userList!.filter(this.searchInput.value);
    });
    this.userList.addListener('click', (event) => {
      this.sideBar.removeClass(styles.visible);
      this.sendMessageButton.removeAttribute('disabled');
      this.sendMessageInput.removeAttribute('disabled');
      this.session.clearMessages();
      this.session.clearSendMessages();
      this.chatWrapper.removeChildren();
      this.chatWrapper.appendChild(this.hintMessage);
      const target = event.target as Element;
      this.chattererName = target.closest('li')?.firstChild!.textContent || '';
      this.nickNameBlock.textContent = this.chattererName;
      this.chattererStatusBlock.textContent = target
        .closest('li')
        ?.classList.value.includes('offline')
        ? 'offline'
        : 'online';
      this.state = 'startChat';
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'MSG_FROM_USER',
          payload: {
            user: {
              login: this.chattererName,
            },
          },
        }),
      );
    });
    this.sideBar.appendChildren(this.searchInput, this.userList!);
    this.ws.send(
      JSON.stringify({
        id: String(counter()),
        type: 'USER_INACTIVE',
        payload: null,
      }),
    );
  }

  private updateUnreadMessagesNumber(messages: Message[]) {
    if (messages.length) {
      let login = '';
      messages.forEach((message) => {
        if (message.from !== this.user.login && !message.status.isReaded) {
          this.session.incrementUnreadMessagesNumber(message.from);
          login = message.from;
        }
      });
      if (login) {
        this.userList?.updateUnreadMessagesNumber(login);
      }
    }
  }

  private createCorrespondence(messages: Message[]) {
    if (messages.length)
      messages.forEach((message) => this.createMessage(message));
  }

  private sendMessage = () => {
    const text = this.sendMessageInput.value.trim();
    if (text.length && this.chattererName.length) {
      this.ws.send(
        JSON.stringify({
          id: String(counter()),
          type: 'MSG_SEND',
          payload: {
            message: {
              to: this.chattererName,
              text: this.sendMessageInput.value,
            },
          },
        }),
      );
      this.session.setAllMessagesAsRead();
    }
    this.sendMessageInput.value = '';
  };

  private createMessage(message: Message) {
    const isOwn = this.user.login === message.from;
    if (message.from === this.chattererName || isOwn) {
      this.hintMessage.addClass(styles.hidden);
      const chatMessage = new ChatMessage(message, isOwn);
      this.session.putMessage(message.id, chatMessage);
      if (!message.status.isReaded && !this.session.isThereUnread && !isOwn) {
        this.session.isThereUnread = true;
        this.chatWrapper.appendChild(this.divider);
      }
      this.chatWrapper.appendChild(chatMessage);
      if (this.session.isThereUnread) {
        this.scrollToDivider();
      } else {
        this.scrollToEnd();
      }
    }
  }

  private editMessage(id: string) {
    const message = this.session.getMessage(id);
    const returnHandler = () => {
      this.finishEditMessage();
      message?.returnButton.removeListener('click', returnHandler);
    };
    message?.returnButton.addListener('click', returnHandler);
    this.sendMessageInput.value = message?.getMessage() as string;
    message?.hideContextMenu();
    this.cancelEditButton.removeClass(styles.hidden);
    this.sendMessageInput.node.focus();
    this.sendMessageButton.node.onclick = () => {
      if (this.sendMessageInput.value.length) {
        this.ws.send(
          JSON.stringify({
            id: String(counter()),
            type: 'MSG_EDIT',
            payload: {
              message: {
                id,
                text: this.sendMessageInput.value,
              },
            },
          }),
        );
        this.finishEditMessage();
      }
    };
  }

  private finishEditMessage = () => {
    this.cancelEditButton.addClass(styles.hidden);
    this.sendMessageInput.value = '';
    this.sendMessageButton.node.onclick = this.sendMessage;
  };

  scrollToEnd() {
    this.session.setScrollModeToAuto();
    this.chatWrapper.node.scrollTop = this.chatWrapper.node.scrollHeight;
    setTimeout(() => {
      this.session.setScrollModeToManual();
    }, 800); // wait smooth scroll end
  }

  scrollToDivider() {
    this.session.setScrollModeToAuto();
    const wrapperRect = this.chatWrapper.node.getBoundingClientRect();
    const dividerRect = this.divider.node.getBoundingClientRect();
    const distanceToScroll = dividerRect.top - wrapperRect.top;
    this.chatWrapper.node.scrollTop += distanceToScroll;
    setTimeout(() => {
      this.session.setScrollModeToManual();
    }, 800); // wait smooth scroll end
  }

  getState() {
    return this.state;
  }
}
