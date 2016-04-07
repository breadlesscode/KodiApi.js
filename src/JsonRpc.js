class JsonRPC {
  constructor(url) {
    this.url = url;
    this.socket = new WebSocket(url);
    this.lastId = 0;
    this.methodCalls = [];
    this.onNotification = function() {};

    this.socket.onmessage = function(event) {
      let data = JSON.parse(event.data);

      if(data.id === undefined)
        return this.onNotification(data);

      if(data.result != undefined) {
        this.methodCalls[data.id].resolve(data);
      }
      else
        this.methodCalls[data.id].reject(data);

      delete this.methodCalls[data.id];
    }.bind(this)
  }
  cmd(method, ...parameters) {
    if(parameters.length === 1)
      parameters = typeof parameters[0] === 'object' ? parameters[0] : parameters;

    let requestObj = this.getRequestObject(method, parameters);

    return new Promise(function(resolve, reject) {
      this.waitForConnection(function () {
        this.methodCalls[requestObj.id] = {
          resolve: resolve,
          reject: reject,
          request: requestObj
        };
        // send request
        this.socket.send(JSON.stringify(requestObj));
      }.bind(this), 1000);
    }.bind(this));
  }
  batch(cmds) {
    // TODO
  }
  getRequestObject(method, parameters) {
    return {
      jsonrpc: "2.0",
      method: method,
      params: parameters,
      id: this.nextId
    }
  }
  get nextId() {
    this.lastId = String(new Date().getTime()) + Math.floor((Math.random() * 100));;
    return this.lastId;
  }
  waitForConnection(callback, interval) {
    if (this.socket.readyState === 1) {
      return callback();
    } else {
        var that = this;
        // optional: implement backoff for interval here
        setTimeout(function () {
            that.waitForConnection(callback, interval);
        }, interval);
    }
  }
}

global.JsonRPC = JsonRPC;