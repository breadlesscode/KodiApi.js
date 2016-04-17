class KodiAddonApi {

  constructor(connection, addonId) {
    this.connection = connection;
    this.addonId = addonId;
  }

  static getAddons(connection) {
    return connection.cmd('Addon.GetAddons');
  }

  executeAddon(params = null, wait = false) {
    return this.connection.cmd('Addons.ExecuteAddon');
  }

  getAddonDetails() {
    return this.connection.cmd('Addons.GetAddonDetails');
  }

  setAddonEnabled() {
    return this.connection.cmd('Addons.SetAddonEnabled');
  }
}

module.exports = KodiAddonApi;