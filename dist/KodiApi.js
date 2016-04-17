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

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _KodiAddonApi = __webpack_require__(1);
	
	var _KodiAddonApi2 = _interopRequireDefault(_KodiAddonApi);
	
	var _KodiApiConnection = __webpack_require__(2);
	
	var _KodiApiConnection2 = _interopRequireDefault(_KodiApiConnection);
	
	var _KodiApplicationApi = __webpack_require__(4);
	
	var _KodiApplicationApi2 = _interopRequireDefault(_KodiApplicationApi);
	
	var _KodiAudioLibraryApi = __webpack_require__(5);
	
	var _KodiAudioLibraryApi2 = _interopRequireDefault(_KodiAudioLibraryApi);
	
	var _KodiGuiApi = __webpack_require__(6);
	
	var _KodiGuiApi2 = _interopRequireDefault(_KodiGuiApi);
	
	var _KodiInputApi = __webpack_require__(7);
	
	var _KodiInputApi2 = _interopRequireDefault(_KodiInputApi);
	
	var _KodiPlayerApi = __webpack_require__(8);
	
	var _KodiPlayerApi2 = _interopRequireDefault(_KodiPlayerApi);
	
	var _KodiPlaylistApi = __webpack_require__(9);
	
	var _KodiPlaylistApi2 = _interopRequireDefault(_KodiPlaylistApi);
	
	var _KodiSystemApi = __webpack_require__(10);
	
	var _KodiSystemApi2 = _interopRequireDefault(_KodiSystemApi);
	
	var _KodiVideoLibraryApi = __webpack_require__(11);
	
	var _KodiVideoLibraryApi2 = _interopRequireDefault(_KodiVideoLibraryApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiApi = function () {
	  function KodiApi(host, port) {
	    _classCallCheck(this, KodiApi);
	
	    var self = this;
	
	    this.connection = new _KodiApiConnection2.default(host, port);
	    this.apis = { 'playlist': [], 'player': [], 'addon': [] };
	
	    return function (key, id) {
	      key = key.toLowerCase();
	
	      if (!self.isApiInitiated(key, id)) self.initiateApi(key, id);
	
	      if (id != undefined) return self.apis[key][id];
	
	      return self.apis[key];
	    };
	  }
	
	  _createClass(KodiApi, [{
	    key: 'isApiInitiated',
	    value: function isApiInitiated(key, id) {
	      if (this.apis[key] == undefined) return false;else if (id != undefined && this.apis[key][id] === undefined) return false;
	
	      return true;
	    }
	  }, {
	    key: 'initiateApi',
	    value: function initiateApi(key, id) {
	      switch (key) {
	        case 'addon':
	          this.apis[key][id] = new _KodiAddonApi2.default(this.connection, id);
	          break;
	        case 'application':
	          this.apis[key] = new _KodiApplicationApi2.default(this.connection);
	          break;
	        case 'player':
	          this.apis[key][id] = new _KodiPlayerApi2.default(this.connection, id);
	          break;
	        case 'playlist':
	          this.apis[key][id] = new _KodiPlaylistApi2.default(this.connection, id);
	          break;
	        case 'audiolibrary':
	          this.apis[key] = new _KodiAudioLibraryApi2.default(this.connection);
	          break;
	        case 'videolibrary':
	          this.apis[key] = new _KodiVideoLibraryApi2.default(this.connection);
	          break;
	        case 'gui':
	          this.apis[key] = new _KodiGuiApi2.default(this.connection);
	          break;
	        case 'input':
	          this.apis[key] = new _KodiGuiApi2.default(this.connection);
	          break;
	        case 'system':
	          this.apis[key] = new _KodiSystemApi2.default(this.connection);
	          break;
	        default:
	          console.log('Error: Api not found ' + key);
	      }
	    }
	  }, {
	    key: 'getActivePlayers',
	    value: function getActivePlayers() {
	      return _KodiPlayerApi2.default.getActivePlayers();
	    }
	  }, {
	    key: 'getAddons',
	    value: function getAddons() {
	      return _KodiAddonApi2.default.getAddons();
	    }
	  }, {
	    key: 'getPlaylists',
	    value: function getPlaylists() {
	      return _KodiPlaylistApi2.default.getPlaylists();
	    }
	  }]);
	
	  return KodiApi;
	}();
	
	global.KodiApi = KodiApi;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiAddonApi = function () {
	  function KodiAddonApi(connection, addonId) {
	    _classCallCheck(this, KodiAddonApi);
	
	    this.connection = connection;
	    this.addonId = addonId;
	  }
	
	  _createClass(KodiAddonApi, [{
	    key: 'executeAddon',
	    value: function executeAddon() {
	      var params = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	      var wait = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	      return this.connection.cmd('Addons.ExecuteAddon');
	    }
	  }, {
	    key: 'getAddonDetails',
	    value: function getAddonDetails() {
	      return this.connection.cmd('Addons.GetAddonDetails');
	    }
	  }, {
	    key: 'setAddonEnabled',
	    value: function setAddonEnabled() {
	      return this.connection.cmd('Addons.SetAddonEnabled');
	    }
	  }], [{
	    key: 'getAddons',
	    value: function getAddons(connection) {
	      return connection.cmd('Addon.GetAddons');
	    }
	  }]);
	
	  return KodiAddonApi;
	}();
	
	module.exports = KodiAddonApi;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _JsonRpc2 = __webpack_require__(3);
	
	var _JsonRpc3 = _interopRequireDefault(_JsonRpc2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var KodiApiConnection = function (_JsonRpc) {
	  _inherits(KodiApiConnection, _JsonRpc);
	
	  function KodiApiConnection(host, port) {
	    _classCallCheck(this, KodiApiConnection);
	
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(KodiApiConnection).call(this, 'ws://' + host + ':' + port + '/jsonrpc'));
	
	    _this.host = host;
	    _this.port = port;
	    _this.onNotification = function (data) {
	      document.dispatchEvent(new CustomEvent(data.method, { detail: data, bubbles: true }));
	    }.bind(_this);
	    return _this;
	  }
	
	  _createClass(KodiApiConnection, [{
	    key: 'getUrl',
	    value: function getUrl(host, port) {
	      return 'ws://' + host + ':' + port + '/jsonrpc';
	    }
	  }]);
	
	  return KodiApiConnection;
	}(_JsonRpc3.default);
	
	module.exports = KodiApiConnection;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var JsonRpc = function () {
	  function JsonRpc(url) {
	    _classCallCheck(this, JsonRpc);
	
	    this.url = url;
	    this.socket = new WebSocket(url);
	    this.lastId = 0;
	    this.methodCalls = [];
	    this.onNotification = function () {};
	
	    this.socket.onmessage = function (event) {
	      var data = JSON.parse(event.data);
	
	      if (data.id === undefined) return this.onNotification(data);
	
	      if (data.result != undefined) {
	        this.methodCalls[data.id].resolve(data);
	      } else this.methodCalls[data.id].reject(data);
	
	      delete this.methodCalls[data.id];
	    }.bind(this);
	  }
	
	  _createClass(JsonRpc, [{
	    key: "cmd",
	    value: function cmd(method) {
	      for (var _len = arguments.length, parameters = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        parameters[_key - 1] = arguments[_key];
	      }
	
	      if (parameters.length === 1) parameters = _typeof(parameters[0]) === 'object' ? parameters[0] : parameters;
	
	      var requestObj = this.getRequestObject(method, parameters);
	
	      return new Promise(function (resolve, reject) {
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
	  }, {
	    key: "batch",
	    value: function batch(cmds) {
	      // TODO
	    }
	  }, {
	    key: "getRequestObject",
	    value: function getRequestObject(method, parameters) {
	      return {
	        jsonrpc: "2.0",
	        method: method,
	        params: parameters,
	        id: this.nextId
	      };
	    }
	  }, {
	    key: "waitForConnection",
	    value: function waitForConnection(callback, interval) {
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
	  }, {
	    key: "nextId",
	    get: function get() {
	      this.lastId = String(new Date().getTime()) + Math.floor(Math.random() * 100);;
	      return this.lastId;
	    }
	  }]);
	
	  return JsonRpc;
	}();
	
	module.exports = JsonRpc;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiApplicationApi = function () {
	  function KodiApplicationApi(connection) {
	    _classCallCheck(this, KodiApplicationApi);
	
	    this.connection = connection;
	  }
	
	  _createClass(KodiApplicationApi, [{
	    key: 'quit',
	    value: function quit() {
	      return this.connection.cmd('Application.Quit');
	    }
	  }, {
	    key: 'setMute',
	    value: function setMute() {
	      var mute = arguments.length <= 0 || arguments[0] === undefined ? 'toggle' : arguments[0];
	
	      return this.connection.cmd('Application.SetMute', { 'mute': mute });
	    }
	  }, {
	    key: 'setVolume',
	    value: function setVolume(volume) {
	      return this.connection.cmd('Application.SetVolume', { 'volume': volume });
	    }
	  }, {
	    key: 'getProperties',
	    value: function getProperties(properties) {
	      return this.connection.cmd('Application.GetProperties', [properties]);
	    }
	  }]);
	
	  return KodiApplicationApi;
	}();
	
	module.exports = KodiApplicationApi;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiAudioLibraryApi = function () {
	  function KodiAudioLibraryApi(connection) {
	    _classCallCheck(this, KodiAudioLibraryApi);
	
	    this.connection = connection;
	  }
	
	  _createClass(KodiAudioLibraryApi, [{
	    key: 'clean',
	    value: function clean() {
	      return this.connection.cmd('AudioLibrary.Clean');
	    }
	  }, {
	    key: 'export',
	    value: function _export() {
	      var options = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];
	
	      if (options === undefined) return this.connection.cmd('AudioLibrary.export');else return this.connection.cmd('AudioLibrary.export', { options: options });
	    }
	  }, {
	    key: 'getAlbumDetails',
	    value: function getAlbumDetails(albumid) {
	      var properties = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];
	
	      return this.connection.cmd('AudioLibrary.GetAlbumDetails', { albumid: albumid, properties: properties });
	    }
	  }, {
	    key: 'getAlbums',
	    value: function getAlbums(properties, limits, sort, filter) {
	      return this.connection.cmd('AudioLibrary.GetAlbums', {
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'getArtistDetails',
	    value: function getArtistDetails(artistid, properties) {
	      return this.connection.cmd('AudioLibrary.GetArtistDetails', {
	        artistid: artistid, properties: properties
	      });
	    }
	  }, {
	    key: 'getArtists',
	    value: function getArtists(properties) {
	      var albumartistsonly = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	      var limits = arguments[2];
	      var sort = arguments[3];
	      var filter = arguments[4];
	
	      return this.connection.cmd('AudioLibrary.GetArtists', {
	        albumartistsonly: albumartistsonly,
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'getGenres',
	    value: function getGenres(properties, limits, sort) {
	      return this.connection.cmd('AudioLibrary.GetGenres', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getRecentlyAddedAlbums',
	    value: function getRecentlyAddedAlbums(properties, limits, sort) {
	      return this.connection.cmd('AudioLibrary.GetRecentlyAddedAlbums', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getRecentlyAddedSongs',
	    value: function getRecentlyAddedSongs() {
	      var albumlimit = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];
	      var properties = arguments[1];
	      var limits = arguments[2];
	      var sort = arguments[3];
	
	      return this.connection.cmd('AudioLibrary.GetRecentlyAddedAlbums', {
	        albumlimit: albumlimit,
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getRecentlyPlayedAlbums',
	    value: function getRecentlyPlayedAlbums(properties, limits, sort) {
	      return this.connection.cmd('AudioLibrary.GetRecentlyPlayedAlbums', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getRecentlyPlayedSongs',
	    value: function getRecentlyPlayedSongs(properties, limits, sort) {
	      return this.connection.cmd('AudioLibrary.GetRecentlyPlayedAlbums', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getSongDetails',
	    value: function getSongDetails(songid, properties) {
	      return this.connection.cmd('AudioLibrary.GetSongDetails', {
	        properties: properties,
	        songid: songid
	      });
	    }
	  }, {
	    key: 'getSongs',
	    value: function getSongs(properties, limits, sort, filter) {
	      return this.connection.cmd('AudioLibrary.GetSongs', {
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'scan',
	    value: function scan() {
	      var directory = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
	
	      return this.connection.cmd('AudioLibrary.Scan', { direction: direction });
	    }
	  }, {
	    key: 'setAlbumDetails',
	    value: function setAlbumDetails(albumid, properties) {
	      properties.albumid = albumid;
	
	      return this.connection.cmd('AudioLibrary.SetAlbumDetails', properties);
	    }
	  }, {
	    key: 'setArtistDetails',
	    value: function setArtistDetails(albumid, properties) {
	      properties.albumid = albumid;
	
	      return this.connection.cmd('AudioLibrary.SetArtistDetails', properties);
	    }
	  }, {
	    key: 'setSongDetails',
	    value: function setSongDetails(albumid, properties) {
	      properties.albumid = albumid;
	
	      return this.connection.cmd('AudioLibrary.SetSongDetails', properties);
	    }
	  }]);
	
	  return KodiAudioLibraryApi;
	}();
	
	module.exports = KodiAudioLibraryApi;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiGuiApi = function () {
	  function KodiGuiApi(connection) {
	    _classCallCheck(this, KodiGuiApi);
	
	    this.connection = connection;
	  }
	
	  _createClass(KodiGuiApi, [{
	    key: 'activateWindow',
	    value: function activateWindow(window, parameters) {
	      return this.connection.cmd('GUI.ActivateWindow', {
	        window: window,
	        parameters: parameters
	      });
	    }
	  }, {
	    key: 'getProperties',
	    value: function getProperties(properties) {
	      return this.connection.cmd('GUI.GetProperties', {
	        properties: properties
	      });
	    }
	  }, {
	    key: 'setFullscreen',
	    value: function setFullscreen() {
	      var toggle = arguments.length <= 0 || arguments[0] === undefined ? 'toggle' : arguments[0];
	
	      return this.connection.cmd('GUI.SetFullscreen', { toggle: toggle });
	    }
	  }, {
	    key: 'showNotification',
	    value: function showNotification(title, message, image) {
	      var displaytime = arguments.length <= 3 || arguments[3] === undefined ? 5000 : arguments[3];
	
	      return this.connection.cmd('GUI.ShowNotification', {
	        title: title,
	        message: message,
	        image: image,
	        displaytime: displaytime
	      });
	    }
	  }]);
	
	  return KodiGuiApi;
	}();
	
	module.exports = KodiGuiApi;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiInputApi = function () {
	  function KodiInputApi(connection) {
	    _classCallCheck(this, KodiInputApi);
	
	    this.connection = connection;
	  }
	
	  _createClass(KodiInputApi, [{
	    key: 'back',
	    value: function back() {
	      return this.connection.cmd('Input.Back');
	    }
	  }, {
	    key: 'contextMenu',
	    value: function contextMenu() {
	      return this.connection.cmd('Input.ContextMenu');
	    }
	  }, {
	    key: 'up',
	    value: function up() {
	      return this.connection.cmd('Input.Up');
	    }
	  }, {
	    key: 'down',
	    value: function down() {
	      return this.connection.cmd('Input.Down');
	    }
	  }, {
	    key: 'executeAction',
	    value: function executeAction() {
	      return this.connection.cmd('Input.ExecuteAction');
	    }
	  }, {
	    key: 'executeAction',
	    value: function executeAction() {
	      return this.connection.cmd('Input.ExecuteAction');
	    }
	  }, {
	    key: 'home',
	    value: function home() {
	      return this.connection.cmd('Input.Home');
	    }
	  }, {
	    key: 'info',
	    value: function info() {
	      return this.connection.cmd('Input.Info');
	    }
	  }, {
	    key: 'left',
	    value: function left() {
	      return this.connection.cmd('Input.Left');
	    }
	  }, {
	    key: 'right',
	    value: function right() {
	      return this.connection.cmd('Input.Right');
	    }
	  }, {
	    key: 'select',
	    value: function select() {
	      return this.connection.cmd('Input.Select');
	    }
	  }, {
	    key: 'sendText',
	    value: function sendText(text) {
	      var done = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      return this.connection.cmd('Input.SendText', {
	        text: text,
	        done: done
	      });
	    }
	  }, {
	    key: 'showCodec',
	    value: function showCodec() {
	      return this.connection.cmd('Input.ShowCodec');
	    }
	  }, {
	    key: 'showOSD',
	    value: function showOSD() {
	      return this.connection.cmd('Input.ShowOSD');
	    }
	  }]);
	
	  return KodiInputApi;
	}();
	
	module.exports = KodiInputApi;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiPlayerApi = function () {
	  //const DIRECTIONS = ["left", "right", "up", "down"];
	
	  function KodiPlayerApi(connection, playerId) {
	    _classCallCheck(this, KodiPlayerApi);
	
	    this.connection = connection;
	    this.playerId = playerId;
	    this.DIRECTIONS = ["left", "right", "up", "down"];
	    this.REPEAT = ['off', 'one', 'all', 'circle'];
	  }
	
	  _createClass(KodiPlayerApi, [{
	    key: "getCurrentItem",
	    value: function getCurrentItem() {
	      return this.connection.cmd('Player.GetItem', { "playerid": this.playerId });
	    }
	  }, {
	    key: "getProperties",
	    value: function getProperties() {
	      return this.connection.cmd('Player.GetProperties', { "playerid": this.playerId });
	    }
	  }, {
	    key: "goTo",
	    value: function goTo(to) {
	      return this.connection.cmd('Player.GoTo', { "playerid": this.playerId, "to": to });
	    }
	  }, {
	    key: "move",
	    value: function move(direction) {
	      if (this.DIRECTIONS.indexOf(direction) === -1) throw "Invalid direction. Possible directions: " + this.DIRECTIONS.join(',');
	
	      return this.connection.cmd('Player.GoTo', { "playerid": this.playerId, "direction": direction });
	    }
	  }, {
	    key: "playPause",
	    value: function playPause() {
	      var play = arguments.length <= 0 || arguments[0] === undefined ? 'toggle' : arguments[0];
	
	      return this.connection.cmd('Player.PlayPause', { "playerid": this.playerId, "play": play });
	    }
	  }, {
	    key: "rotate",
	    value: function rotate() {
	      var value = arguments.length <= 0 || arguments[0] === undefined ? "clockwise" : arguments[0];
	
	      return this.connection.cmd('Player.Rotate', { "playerid": this.playerId, "value": value });
	    }
	  }, {
	    key: "seek",
	    value: function seek(value) {
	      return this.connection.cmd('Player.Seek', { "playerid": this.playerId, "value": value });
	    }
	  }, {
	    key: "setAudioStream",
	    value: function setAudioStream(stream) {
	      return this.connection.cmd('Player.SetAudioStream', { "playerid": this.playerId, "stream": stream });
	    }
	  }, {
	    key: "next",
	    value: function next() {
	      return this.setAudioStream('next');
	    }
	  }, {
	    key: "previous",
	    value: function previous() {
	      return this.setAudioStream('previous');
	    }
	  }, {
	    key: "setPartyMode",
	    value: function setPartyMode(partymode) {
	      return this.connection.cmd('Player.SetPartyMode', { "playerid": this.playerId, "partymode": partymode });
	    }
	  }, {
	    key: "setRepeat",
	    value: function setRepeat(repeat) {
	      if (this.REPEAT.indexOf(repeat) === -1) throw "Invalid parameter. Possible parameters: " + this.REPEAT.join(',');
	
	      return this.connection.cmd('Player.SetRepeat', { "playerid": this.playerId, "repeat": repeat });
	    }
	  }, {
	    key: "setShuffel",
	    value: function setShuffel(shuffle) {
	      return this.connection.cmd('Player.SetShuffel', { "playerid": this.playerId, "shuffle": shuffle });
	    }
	  }, {
	    key: "setSpeed",
	    value: function setSpeed(speed) {
	      return this.connection.cmd('Player.SetSpeed', { "playerid": this.playerId, "speed": speed });
	    }
	  }, {
	    key: "setSubtitle",
	    value: function setSubtitle(subtitle) {
	      var enable = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	
	      return this.connection.cmd('Player.SetSubtitle', {
	        "playerid": this.playerId, "subtitle": subtitle, "enable": enable
	      });
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      return this.connection.cmd('Player.Stop', { "playerid": this.playerId });
	    }
	  }, {
	    key: "zoom",
	    value: function zoom(_zoom) {
	      return this.connection.cmd('Player.Stop', { "playerid": this.playerId, 'zoom': _zoom });
	    }
	  }], [{
	    key: "getActivePlayers",
	    value: function getActivePlayers(connection) {
	      return connection.cmd('Player.GetActivePlayers');
	    }
	  }]);
	
	  return KodiPlayerApi;
	}();
	
	module.exports = KodiPlayerApi;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiPlaylistApi = function () {
	  function KodiPlaylistApi(connection, playlistId) {
	    _classCallCheck(this, KodiPlaylistApi);
	
	    this.connection = connection;
	    this.playlistid = playlistId;
	  }
	
	  _createClass(KodiPlaylistApi, [{
	    key: 'add',
	
	    /**
	     * @param Playlist.Item
	     */
	    value: function add(item) {
	      return this.connection.cmd('Playlist.Add', { playlistid: this.playlistid, item: item });
	    }
	  }, {
	    key: 'clear',
	    value: function clear() {
	      return this.connection.cmd('Playlist.Clear', { playlistid: this.playlistid });
	    }
	  }, {
	    key: 'getItems',
	    value: function getItems(properties, limits, sort) {
	      return this.connection.cmd('Playlist.GetItems', {
	        playlistid: this.playlistid,
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getProperties',
	    value: function getProperties(properties) {
	      return this.connection.cmd('Playlist.GetProperties', {
	        playlistid: this.playlistid,
	        properties: properties
	      });
	    }
	  }, {
	    key: 'insert',
	    value: function insert(position, item) {
	      return this.connection.cmd('Playlist.Insert', {
	        playlistid: this.playlistid,
	        position: position,
	        item: item
	      });
	    }
	  }, {
	    key: 'insertLast',
	    value: function insertLast(item) {
	      return this.insert(-1, item);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(position) {
	      return this.connection.cmd('Playlist.Remove', {
	        playlistid: this.playlistid,
	        position: position
	      });
	    }
	  }, {
	    key: 'swap',
	    value: function swap(position1, position2) {
	      return this.connection.cmd('Playlist.Swap', {
	        playlistid: this.playlistid,
	        position1: position1,
	        position2: position2
	      });
	    }
	  }], [{
	    key: 'getPlaylists',
	    value: function getPlaylists(connection) {
	      return connection.cmd('Playlist.GetPlaylists');
	    }
	  }]);
	
	  return KodiPlaylistApi;
	}();
	
	module.exports = KodiPlaylistApi;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiSystemApi = function () {
	  function KodiSystemApi(connection) {
	    _classCallCheck(this, KodiSystemApi);
	
	    this.connection = connection;
	  }
	
	  _createClass(KodiSystemApi, [{
	    key: 'ejectOpticalDrive',
	    value: function ejectOpticalDrive() {
	      return this.connection.cmd('System.EjectOpticalDrive');
	    }
	  }, {
	    key: 'getProperties',
	    value: function getProperties(properties) {
	      return this.connection.cmd('System.GetProperties', { properties: properties });
	    }
	  }, {
	    key: 'hibernate',
	    value: function hibernate() {
	      return this.connection.cmd('System.Hibernate');
	    }
	  }, {
	    key: 'reboot',
	    value: function reboot() {
	      return this.connection.cmd('System.Reboot');
	    }
	  }, {
	    key: 'shutdown',
	    value: function shutdown() {
	      return this.connection.cmd('System.Shutdown');
	    }
	  }, {
	    key: 'suspend',
	    value: function suspend() {
	      return this.connection.cmd('System.Suspend');
	    }
	  }]);
	
	  return KodiSystemApi;
	}();
	
	module.exports = KodiSystemApi;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var KodiVideoLibraryApi = function () {
	  function KodiVideoLibraryApi(connection) {
	    _classCallCheck(this, KodiVideoLibraryApi);
	
	    this.connection = connection;
	  }
	
	  _createClass(KodiVideoLibraryApi, [{
	    key: 'clean',
	    value: function clean() {
	      return this.connection.cmd('VideoLibrary.Clean');
	    }
	  }, {
	    key: 'export',
	    value: function _export() {
	      return this.connection.cmd('VideoLibrary.Export');
	    }
	  }, {
	    key: 'getEpisodeDetails',
	    value: function getEpisodeDetails(episodeid, properties) {
	      return this.connection.cmd('VideoLibrary.GetEpisodeDetails', {
	        episodeid: episodeid,
	        properties: properties
	      });
	    }
	  }, {
	    key: 'getEpisodes',
	    value: function getEpisodes() {
	      var tvshowid = arguments.length <= 0 || arguments[0] === undefined ? -1 : arguments[0];
	      var season = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
	      var properties = arguments[2];
	      var limits = arguments[3];
	      var sort = arguments[4];
	      var filter = arguments[5];
	
	      return this.connection.cmd('VideoLibrary.getEpisodes', {
	        tvshowid: tvshowid,
	        season: season,
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'getGenres',
	    value: function getGenres(type, properties, limits, sort) {
	      return this.connection.cmd('VideoLibrary.GetGenres', {
	        type: type,
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getMovieDetails',
	    value: function getMovieDetails(movieid, properties) {
	      return this.connection.cmd('VideoLibrary.GetMovieDetails', {
	        movieid: movieid,
	        properties: properties
	      });
	    }
	  }, {
	    key: 'getMovieSetDetails',
	    value: function getMovieSetDetails(setid, properties, movies) {
	      return this.connection.cmd('VideoLibrary.GetMovieSetDetails', {
	        setid: setid,
	        properties: properties,
	        movies: movies
	      });
	    }
	  }, {
	    key: 'getMovies',
	    value: function getMovies(properties, limits, sort, filter) {
	      return this.connection.cmd('VideoLibrary.GetMovies', {
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'getMusicVideoDetails',
	    value: function getMusicVideoDetails(musicvideoid, properties) {
	      return this.connection.cmd('VideoLibrary.GetMusicVideoDetails', {
	        musicvideoid: musicvideoid,
	        properties: properties
	      });
	    }
	  }, {
	    key: 'getMusicVideos',
	    value: function getMusicVideos(properties, limits, sort, filter) {
	      return this.connection.cmd('VideoLibrary.GetMusicVideos', {
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'getRecentlyAddedEpisodes',
	    value: function getRecentlyAddedEpisodes(properties, limits, sort) {
	      return this.connection.cmd('VideoLibrary.GetRecentlyAddedEpisodes', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getRecentlyAddedMovies',
	    value: function getRecentlyAddedMovies(properties, limits, sort) {
	      return this.connection.cmd('VideoLibrary.GetRecentlyAddedMovies', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getRecentlyAddedMusicVideos',
	    value: function getRecentlyAddedMusicVideos(properties, limits, sort) {
	      return this.connection.cmd('VideoLibrary.getRecentlyAddedMusicVideos', {
	        properties: properties,
	        limits: limits,
	        sort: sort
	      });
	    }
	  }, {
	    key: 'getTVShowDetails',
	    value: function getTVShowDetails(tvshowid, properties) {
	      return this.connection.cmd('VideoLibrary.GetTVShowDetails', {
	        tvshowid: tvshowid,
	        properties: properties
	      });
	    }
	  }, {
	    key: 'getTVShows',
	    value: function getTVShows(properties, limits, sort, filter) {
	      return this.connection.cmd('VideoLibrary.GetTVShows', {
	        properties: properties,
	        limits: limits,
	        sort: sort,
	        filter: filter
	      });
	    }
	  }, {
	    key: 'removeEpisode',
	    value: function removeEpisode(episodeid) {
	      return this.connection.cmd('VideoLibrary.RemoveEpisode', {
	        episodeid: episodeid
	      });
	    }
	  }, {
	    key: 'removeMovie',
	    value: function removeMovie(movieid) {
	      return this.connection.cmd('VideoLibrary.RemoveMovie', {
	        movieid: movieid
	      });
	    }
	  }, {
	    key: 'removeMusicVideo',
	    value: function removeMusicVideo(musicvideoid) {
	      return this.connection.cmd('VideoLibrary.RemoveMusicVideo', {
	        musicvideoid: musicvideoid
	      });
	    }
	  }, {
	    key: 'removeTVShow',
	    value: function removeTVShow(tvshowid) {
	      return this.connection.cmd('VideoLibrary.RemoveTVShow', {
	        tvshowid: tvshowid
	      });
	    }
	  }, {
	    key: 'scan',
	    value: function scan() {
	      return this.connection.cmd('VideoLibrary.Scan');
	    }
	  }, {
	    key: 'setEpisodeDetails',
	    value: function setEpisodeDetails(episodeid, properties) {
	      var params = Object.assign(properties, {
	        episodeid: episodeid
	      });
	
	      return this.connection.cmd('VideoLibrary.SetEpisodeDetails', params);
	    }
	  }, {
	    key: 'setMovieDetails',
	    value: function setMovieDetails(movieid, properties) {
	      var params = Object.assign(properties, {
	        movieid: movieid
	      });
	
	      return this.connection.cmd('VideoLibrary.SetMovieDetails', params);
	    }
	  }, {
	    key: 'setMusicVideoDetails',
	    value: function setMusicVideoDetails(musicvideoid, properties) {
	      var params = Object.assign(properties, {
	        musicvideoid: musicvideoid
	      });
	
	      return this.connection.cmd('VideoLibrary.SetMusicVideoDetails', params);
	    }
	  }, {
	    key: 'setTVShowDetails',
	    value: function setTVShowDetails(tvshowid, properties) {
	      var params = Object.assign(properties, {
	        tvshowid: tvshowid
	      });
	
	      return this.connection.cmd('VideoLibrary.SetTVShowDetails', params);
	    }
	  }]);
	
	  return KodiVideoLibraryApi;
	}();
	
	module.exports = KodiVideoLibraryApi;

/***/ }
/******/ ]);
//# sourceMappingURL=KodiApi.js.map