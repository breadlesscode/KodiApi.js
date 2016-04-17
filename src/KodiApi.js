import KodiAddonApi from './KodiAddonApi.js'
import KodiApiConnection from './KodiApiConnection.js'
import KodiApplicationApi from './KodiApplicationApi.js'
import KodiAudioLibraryApi from './KodiAudioLibraryApi.js'
import KodiGuiApi from './KodiGuiApi.js'
import KodiInputApi from './KodiInputApi.js'
import KodiPlayerApi from './KodiPlayerApi.js'
import KodiPlaylistApi from './KodiPlaylistApi.js'
import KodiSystemApi from './KodiSystemApi.js'
import KodiVideoLibraryApi from './KodiVideoLibraryApi.js'

class KodiApi {
  constructor(host, port) {
    var self = this;

    this.connection = new KodiApiConnection(host, port);
    this.apis = {'playlist': [], 'player': [], 'addon': []};
    
    return function(key, id) {
      key = key.toLowerCase();

      if(!self.isApiInitiated(key, id))
        self.initiateApi(key, id);

      if(id != undefined)
        return self.apis[key][id];

      return self.apis[key];
    }
  }

  isApiInitiated(key, id) {
    if(this.apis[key] == undefined)
      return false;
    else if(id != undefined && this.apis[key][id] === undefined)
      return false;

    return true;
  }

  initiateApi(key, id) {
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
      case 'videolibrary':
        this.apis[key] = new KodiVideoLibraryApi(this.connection);
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

  getActivePlayers() {
    return KodiPlayerApi.getActivePlayers();
  }

  getAddons() {
    return KodiAddonApi.getAddons();
  }

  getPlaylists() {
    return KodiPlaylistApi.getPlaylists();
  }
}

global.KodiApi = KodiApi;
