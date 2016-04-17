import JsonRpc from './JsonRpc.js'

class KodiApiConnection extends JsonRpc {
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

module.exports = KodiApiConnection;