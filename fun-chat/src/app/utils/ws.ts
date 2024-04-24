export default class WS {
  private static instance: WS;

  private wsConnection: WebSocket;

  private url: string;

  private constructor(url: string) {
    this.wsConnection = new WebSocket(url);
    this.url = url;
  }

  static getWS(url?: string) {
    if (!WS.instance) WS.instance = new WS(url!);
    return WS.instance;
  }

  get ws() {
    return this.wsConnection;
  }

  repeatConnect() {
    this.wsConnection = new WebSocket(this.url);
  }
}
