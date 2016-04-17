class KodiAudioLibraryApi {
  constructor(connection) {
    this.connection = connection;
  }
  clean() {
    return this.connection.cmd('AudioLibrary.Clean');
  }
  export(options = undefined) {
    if(options === undefined)
      return this.connection.cmd('AudioLibrary.export');
    else
      return this.connection.cmd('AudioLibrary.export', {options: options});
  }
  getAlbumDetails(albumid, properties = undefined) {
    return this.connection.cmd('AudioLibrary.GetAlbumDetails', {albumid: albumid, properties: properties});
  }
  getAlbums(properties, limits, sort, filter) {
    return this.connection.cmd('AudioLibrary.GetAlbums', {
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }
  getArtistDetails(artistid, properties) {
    return this.connection.cmd('AudioLibrary.GetArtistDetails', {
      artistid: artistid, properties: properties
    })
  }
  getArtists(properties, albumartistsonly = null, limits, sort, filter) {
    return this.connection.cmd('AudioLibrary.GetArtists', {
      albumartistsonly: albumartistsonly,
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }
  getGenres(properties, limits, sort) {
    return this.connection.cmd('AudioLibrary.GetGenres', {
      properties: properties,
      limits: limits,
      sort: sort
    })
  }
  getRecentlyAddedAlbums(properties, limits, sort) {
    return this.connection.cmd('AudioLibrary.GetRecentlyAddedAlbums', {
      properties: properties,
      limits: limits,
      sort: sort
    })
  }
  getRecentlyAddedSongs(albumlimit = -1, properties, limits, sort) {
    return this.connection.cmd('AudioLibrary.GetRecentlyAddedAlbums', {
      albumlimit: albumlimit,
      properties: properties,
      limits: limits,
      sort: sort
    })
  }
  getRecentlyPlayedAlbums(properties, limits, sort) {
    return this.connection.cmd('AudioLibrary.GetRecentlyPlayedAlbums', {
      properties: properties,
      limits: limits,
      sort: sort
    })
  }
  getRecentlyPlayedSongs(properties, limits, sort) {
    return this.connection.cmd('AudioLibrary.GetRecentlyPlayedAlbums', {
      properties: properties,
      limits: limits,
      sort: sort
    })
  }
  getSongDetails(songid, properties) {
    return this.connection.cmd('AudioLibrary.GetSongDetails', {
      properties: properties,
      songid: songid
    });
  }
  
  getSongs(properties, limits, sort, filter) {
    return this.connection.cmd('AudioLibrary.GetSongs', {
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }
  
  scan(directory = "") {
    return this.connection.cmd('AudioLibrary.Scan', {direction: direction});
  }
  
  setAlbumDetails(albumid, properties) {
    properties.albumid = albumid;

    return this.connection.cmd('AudioLibrary.SetAlbumDetails', properties);
  }

  setArtistDetails(albumid, properties) {
    properties.albumid = albumid;

    return this.connection.cmd('AudioLibrary.SetArtistDetails', properties);
  }
  setSongDetails(albumid, properties) {
    properties.albumid = albumid;

    return this.connection.cmd('AudioLibrary.SetSongDetails', properties);
  }
}

module.exports = KodiAudioLibraryApi;