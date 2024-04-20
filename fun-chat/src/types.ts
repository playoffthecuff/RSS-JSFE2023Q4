type MessageType =
  | 'ERROR'
  | 'USER_LOGIN'
  | 'USER_LOGOUT'
  | 'USER_ACTIVE'
  | 'USER_INACTIVE'
  | 'USER_EXTERNAL_LOGIN'
  | 'USER_EXTERNAL_LOGOUT'
  | 'MSG_FROM_USER';

export type User = {
  login: string;
  password: string;
  isLogined: boolean;
};

export interface ServerResponse {
  id: string;
  type: MessageType;
  payload: {
    user: User;
    error: string;
    users: User[];
    messages: string[];
  };
}
