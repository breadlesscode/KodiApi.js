class KodiVideoLibraryApi {
  constructor(connection) {
    this.connection = connection;
  }

  clean() {
    return this.connection.cmd('VideoLibrary.Clean');
  }

  export() {
    return this.connection.cmd('VideoLibrary.Export');
  }

  getEpisodeDetails(episodeid, properties) {
    return this.connection.cmd('VideoLibrary.GetEpisodeDetails', {
      episodeid: episodeid,
      properties: properties
    });
  }

  getEpisodes(tvshowid = -1, season = -1, properties, limits, sort, filter) {
    return this.connection.cmd('VideoLibrary.getEpisodes', {
      tvshowid: tvshowid,
      season: season,
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }

  getGenres(type, properties, limits, sort) {
    return this.connection.cmd('VideoLibrary.GetGenres', {
      type: type,
      properties: properties,
      limits: limits,
      sort: sort
    });
  }

  getMovieDetails(movieid, properties) {
    return this.connection.cmd('VideoLibrary.GetMovieDetails', {
      movieid: movieid,
      properties: properties
    });
  }

  getMovieSetDetails(setid, properties, movies) {
    return this.connection.cmd('VideoLibrary.GetMovieSetDetails', {
      setid: setid,
      properties: properties,
      movies: movies
    });
  }

  getMovies(properties, limits, sort, filter) {
    return this.connection.cmd('VideoLibrary.GetMovies', {
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }

  getMusicVideoDetails(musicvideoid, properties) {
    return this.connection.cmd('VideoLibrary.GetMusicVideoDetails', {
      musicvideoid: musicvideoid,
      properties: properties
    });
  }

  getMusicVideos(properties, limits, sort, filter) {
    return this.connection.cmd('VideoLibrary.GetMusicVideos', {
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }

  getRecentlyAddedEpisodes(properties, limits, sort) {
    return this.connection.cmd('VideoLibrary.GetRecentlyAddedEpisodes', {
      properties: properties,
      limits: limits,
      sort: sort
    });
  }

  getRecentlyAddedMovies(properties, limits, sort) {
    return this.connection.cmd('VideoLibrary.GetRecentlyAddedMovies', {
      properties: properties,
      limits: limits,
      sort: sort
    });
  }

  getRecentlyAddedMusicVideos(properties, limits, sort) {
    return this.connection.cmd('VideoLibrary.getRecentlyAddedMusicVideos', {
      properties: properties,
      limits: limits,
      sort: sort
    });
  }

  getTVShowDetails(tvshowid, properties) {
    return this.connection.cmd('VideoLibrary.GetTVShowDetails', {
      tvshowid: tvshowid,
      properties: properties
    });
  }

  getTVShows(properties, limits, sort, filter) {
    return this.connection.cmd('VideoLibrary.GetTVShows', {
      properties: properties,
      limits: limits,
      sort: sort,
      filter: filter
    });
  }

  removeEpisode(episodeid) {
    return this.connection.cmd('VideoLibrary.RemoveEpisode', {
      episodeid: episodeid
    });
  }

  removeMovie(movieid) {
    return this.connection.cmd('VideoLibrary.RemoveMovie', {
      movieid: movieid
    });
  }

  removeMusicVideo(musicvideoid) {
    return this.connection.cmd('VideoLibrary.RemoveMusicVideo', {
      musicvideoid: musicvideoid
    });
  }

  removeTVShow(tvshowid) {
    return this.connection.cmd('VideoLibrary.RemoveTVShow', {
      tvshowid: tvshowid
    });
  }

  scan() {
    return this.connection.cmd('VideoLibrary.Scan');
  }

  setEpisodeDetails(episodeid, properties) {
    var params = Object.assign(properties, {
      episodeid: episodeid
    });

    return this.connection.cmd('VideoLibrary.SetEpisodeDetails', params);
  }

  setMovieDetails(movieid, properties) {
    var params = Object.assign(properties, {
      movieid: movieid
    });

    return this.connection.cmd('VideoLibrary.SetMovieDetails', params);
  }

  setMusicVideoDetails(musicvideoid, properties) {
    var params = Object.assign(properties, {
      musicvideoid: musicvideoid
    });

    return this.connection.cmd('VideoLibrary.SetMusicVideoDetails', params);
  }

  setTVShowDetails(tvshowid, properties) {
    var params = Object.assign(properties, {
      tvshowid: tvshowid
    });

    return this.connection.cmd('VideoLibrary.SetTVShowDetails', params);
  }
}

module.exports = KodiVideoLibraryApi;