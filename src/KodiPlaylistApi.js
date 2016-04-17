class KodiPlaylistApi {
  constructor(connection, playlistId) {
    this.connection = connection;
    this.playlistid = playlistId;
  }

  static getPlaylists(connection) {
    return connection.cmd('Playlist.GetPlaylists');
  }
  /**
   * @param Playlist.Item
   */
  add(item) {
    return this.connection.cmd('Playlist.Add', {playlistid: this.playlistid, item: item});
  }

  clear() {
    return this.connection.cmd('Playlist.Clear', {playlistid: this.playlistid });
  }

  getItems(properties, limits, sort) {
    return this.connection.cmd('Playlist.GetItems', {
      playlistid: this.playlistid,
      properties: properties,
      limits: limits,
      sort: sort
    });
  }

  getProperties(properties) {
    return this.connection.cmd('Playlist.GetProperties', {
      playlistid: this.playlistid,
      properties: properties
    });
  }

  insert(position, item) {
    return this.connection.cmd('Playlist.Insert', {
      playlistid: this.playlistid,
      position: position,
      item: item
    });
  }
  insertLast(item) {
    return this.insert(-1, item);
  }
  remove(position) {
    return this.connection.cmd('Playlist.Remove', {
      playlistid: this.playlistid,
      position: position
    });
  }
  swap(position1, position2) {
    return this.connection.cmd('Playlist.Swap', {
      playlistid: this.playlistid,
      position1: position1,
      position2: position2
    });
  }
}

module.exports = KodiPlaylistApi;