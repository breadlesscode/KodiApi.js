class KodiSystemApi {
  constructor(connection) {
    this.connection = connection;
  }

  ejectOpticalDrive() {
    return this.connection.cmd('System.EjectOpticalDrive');
  }

  getProperties(properties) {
    return this.connection.cmd('System.GetProperties', {properties: properties});
  }

  hibernate() {
    return this.connection.cmd('System.Hibernate');
  }

  reboot() {
    return this.connection.cmd('System.Reboot');
  }

  shutdown() {
    return this.connection.cmd('System.Shutdown');
  }
  
  suspend() {
    return this.connection.cmd('System.Suspend');
  }
}