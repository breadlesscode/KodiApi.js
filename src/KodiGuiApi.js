class KodiGuiApi {
  constructor(connection) {
    this.connection = connection;
  }

  activateWindow(window, parameters) {
    return this.connection.cmd('GUI.ActivateWindow', {
      window: window,
      parameters: parameters
    });
  }

  getProperties(properties) {
    return this.connection.cmd('GUI.GetProperties', {
      properties: properties
    });
  }

  setFullscreen(toggle = 'toggle') {
    return this.connection.cmd('GUI.SetFullscreen', { toggle: toggle });
  }

  showNotification(title, message, image, displaytime = 5000) {
    return this.connection.cmd('GUI.ShowNotification', {
      title: title,
      message: message, 
      image: image,
      displaytime: displaytime
    })
  }
}