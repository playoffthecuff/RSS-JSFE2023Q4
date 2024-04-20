type MessageType =
  | 'USER_LOGIN'
  | 'ERROR'
  | 'USER_LOGOUT'
  | 'USER_EXTERNAL_LOGIN';

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
  };
}
