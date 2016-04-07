/** @preserve JsonRPC */
class KodiApiConnection extends JsonRPC {
  constructor(host, port) {
    super('ws://' + host + ':' + port + '/jsonrpc');

    this.host = host;
    this.port = port;
    this.onNotification = function(data) {
      document.dispatchEvent(
        new CustomEvent(data.method, {detail: data, bubbles: true})
      );
    }.bind(this);
  }
  
  getUrl(host, port) {
    return 'ws://' + host + ':' + port + '/jsonrpc'
  }

}

global.KodiApiConnection = KodiApiConnection;