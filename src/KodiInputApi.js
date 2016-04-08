class KodiInputApi {
  constructor(connection) {
    this.connection = connection;
  }

  back() {
    return this.connection.cmd('Input.Back');
  }

  contextMenu() {
    return this.connection.cmd('Input.ContextMenu');
  }

  up() {
    return this.connection.cmd('Input.Up');
  }

  down() {
    return this.connection.cmd('Input.Down');
  }

  executeAction() {
    return this.connection.cmd('Input.ExecuteAction');
  }

  executeAction() {
    return this.connection.cmd('Input.ExecuteAction');
  }

  home() {
    return this.connection.cmd('Input.Home');
  }

  info() {
    return this.connection.cmd('Input.Info');
  }

  left() {
    return this.connection.cmd('Input.Left');
  }

  right() {
    return this.connection.cmd('Input.Right');
  }

  select() {
    return this.connection.cmd('Input.Select');
  }

  sendText(text, done = true) {
    return this.connection.cmd('Input.SendText', {
      text: text,
      done: done
    });
  }

  showCodec() {
    return this.connection.cmd('Input.ShowCodec');
  }

  showOSD() {
    return this.connection.cmd('Input.ShowOSD');
  }
}