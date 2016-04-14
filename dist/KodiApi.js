/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	
	function KodiApi(ip, port) {
	    var self = this;
	    this.connection = new KodiApiConnection(ip, port);
	    this.apis = [];
	}
	
	KodiApi.prototype.isApiInitiated = function(key, id) {
	    if(this.apis[key] == undefined)
	        return false;
	    else if(id != undefined && this.apis[key][id] === undefined)
	        return false;
	
	    return true;
	}
	KodiApi.prototype.get = function(key, id) {
	    key = key.toLowerCase();
	
	    if(!this.isApiInitiated(key, id))
	        this.initiateApi(key, id);
	
	    if(id != undefined)
	        return this.apis[key][id];
	
	    return this.apis[key];
	}
	KodiApi.prototype.initiateApi = function(key, id) {
	    switch(key) {
	        case 'addon':
	            this.apis[key][id] = new KodiAddonApi(this.connection, id);
	            break;
	        case 'application':
	            this.apis[key] = new KodiApplicationApi(this.connection);
	            break;
	        case 'player':
	            this.apis[key][id] = new KodiPlayerApi(this.connection, id);
	            break;
	        case 'playlist':
	            this.apis[key][id] = new KodiPlaylistApi(this.connection, id);
	            break;
	        case 'audiolibrary':
	            this.apis[key] = new KodiAudioLibraryApi(this.connection);
	            break;
	        case 'gui':
	            this.apis[key] = new KodiGuiApi(this.connection);
	            break;
	        case 'input':
	            this.apis[key] = new KodiGuiApi(this.connection);
	            break;
	        case 'system':
	            this.apis[key] = new KodiSystemApi(this.connection);
	            break;
	        default:
	            console.log('Error: Api not found ' + key);
	    }
	}
	global.KodiApi = KodiApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {class JsonRPC {
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
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** @preserve JsonRPC */
	class KodiApiConnection extends JsonRPC {
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
	
	global.KodiApiConnection = KodiApiConnection;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {class KodiAddonApi {
	
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
	
	global.KodiAddonApi = KodiAddonApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {class KodiApplicationApi {
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
	
	global.KodiApplicationApi = KodiApplicationApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 5 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {class KodiAudioLibraryApi {
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
	
	
	global.KodiAudioLibraryApi = KodiAudioLibraryApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {class KodiPlayerApi {
	  //const DIRECTIONS = ["left", "right", "up", "down"];
	
	  constructor(connection, playerId) {
	    this.connection = connection;
	    this.playerId = playerId;
	    this.DIRECTIONS = ["left", "right", "up", "down"];
	    this.REPEAT = ['off', 'one', 'all', 'circle'];
	  }
	  static getActivePlayers(connection) {
	    return connection.cmd('Player.GetActivePlayers');
	  }
	  getCurrentItem() {
	    return this.connection.cmd('Player.GetItem', {"playerid": this.playerId});
	  }
	  getProperties() {
	    return this.connection.cmd('Player.GetProperties', {"playerid": this.playerId});
	  }
	  goTo(to) {
	    return this.connection.cmd('Player.GoTo', {"playerid": this.playerId, "to": to});
	  }
	  move(direction) {
	    if(this.DIRECTIONS.indexOf(direction) === -1)
	      throw "Invalid direction. Possible directions: " + this.DIRECTIONS.join(',');
	
	    return this.connection.cmd('Player.GoTo', {"playerid": this.playerId, "direction": direction});
	  }
	  playPause(play = 'toggle') {
	    return this.connection.cmd('Player.PlayPause', {"playerid": this.playerId, "play": play});
	  }
	  rotate(value = "clockwise") {
	    return this.connection.cmd('Player.Rotate', {"playerid": this.playerId, "value": value});
	  }
	  seek(value) {
	    return this.connection.cmd('Player.Seek', {"playerid": this.playerId, "value": value});
	  }
	  setAudioStream(stream) {
	    return this.connection.cmd('Player.SetAudioStream', {"playerid": this.playerId, "stream": stream});
	  }
	  next() {
	    return this.setAudioStream('next');
	  }
	  previous() {
	    return this.setAudioStream('previous');
	  }
	  setPartyMode(partymode) {
	    return this.connection.cmd('Player.SetPartyMode', {"playerid": this.playerId, "partymode": partymode});
	  }
	  setRepeat(repeat) {
	    if(this.REPEAT.indexOf(repeat) === -1)
	      throw "Invalid parameter. Possible parameters: " + this.REPEAT.join(',');
	
	    return this.connection.cmd('Player.SetRepeat', {"playerid": this.playerId, "repeat": repeat});
	  }
	  setShuffel(shuffle) {
	    return this.connection.cmd('Player.SetShuffel', {"playerid": this.playerId, "shuffle": shuffle});
	  }
	  setSpeed(speed) {
	    return this.connection.cmd('Player.SetSpeed', {"playerid": this.playerId, "speed": speed});
	  }
	  setSubtitle(subtitle, enable = false) {
	    return this.connection.cmd('Player.SetSubtitle', {
	      "playerid": this.playerId, "subtitle": subtitle, "enable": enable
	    });
	  }
	  stop() {
	    return this.connection.cmd('Player.Stop', {"playerid": this.playerId});
	  }
	  zoom(zoom) {
	    return this.connection.cmd('Player.Stop', {"playerid": this.playerId, 'zoom': zoom});
	  }
	}
	
	global.KodiPlayerApi = KodiPlayerApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {class KodiPlaylistApi {
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
	
	global.KodiPlaylistApi = KodiPlaylistApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports) {

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

/***/ },
/* 9 */
/***/ function(module, exports) {

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

/***/ },
/* 10 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=KodiApi.js.map