# KodiApi.js
Javascript warpper for Kodi Websocket JSON-RPC API/v6

## Documentation
It's a simple wrapper for the Kodi JSON-RPC Api. For more informations visit: http://kodi.wiki/view/JSON-RPC_API/v6

## Usage/Examble
```javascript
    var api = new KodiApi('192.168.178.150', '9090');
    var applicationApi = api.get('application');

    applicationApi.setMute(); // for toggeling mute
    applicationApi.setMute(true); // for muting 
```

## Status
Implemented:
- [x] Addon Api
- [x] Application Api
- [x] AudioLibrary Api
- [x] Files Api 
- [x] Player Api
- [x] Playlist Api
- [x] Gui Api
- [x] Input Api
- [ ] JSONRPC Api
- [ ] PVR Api
- [ ] System Api
- [ ] VideoLibrary Api
- [ ] Kodi Api