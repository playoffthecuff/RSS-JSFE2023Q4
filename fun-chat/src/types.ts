type MessageType =
  | 'ERROR'
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_ACTIVE'
  | 'USER_INACTIVE'
  | 'USER_EXTERNAL_LOGIN'
  | 'USER_EXTERNAL_LOGOUT'
  | 'MSG_FROM_USER'
  | 'MSG_SEND'
  | 'MSG_DELIVER'
  | 'MSG_READ';

export type User = {
  login: string;
  password: string;
  isLogined: boolean;
};

export type Status = {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
};

export type Message = {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: Status;
};

export interface ServerResponse {
  id: string;
  type: MessageType;
  payload: {
    user: User;
    error: string;
    users: User[];
    message: Message;
    messages: Message[];
  };
}
