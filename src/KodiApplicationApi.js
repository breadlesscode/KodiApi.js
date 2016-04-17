class KodiApplicationApi {
  constructor(connection) {
    this.connection = connection;
  }

  quit() {
    return this.connection.cmd('Application.Quit');
  }
  
  setMute(mute = 'toggle') {
    return this.connection.cmd('Application.SetMute', {'mute': mute});
  }

  setVolume(volume) {
    return this.connection.cmd('Application.SetVolume', {'volume': volume});
  }
  getProperties(properties) {
    return this.connection.cmd('Application.GetProperties', [properties]);
  }
}

module.exports = KodiApplicationApi;