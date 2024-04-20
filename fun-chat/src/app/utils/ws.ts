export default class WS {
  private static instance: WS;

  private wsConnection: WebSocket;

  private constructor(url: string) {
    this.wsConnection = new WebSocket(url);
  }

  static getWS(url?: string) {
    if (!WS.instance) WS.instance = new WS(url!);
    return WS.instance;
  }

  get ws() {
    return this.wsConnection;
  }
}
