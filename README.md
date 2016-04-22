# KodiApi.js
Javascript warpper for Kodi Websocket JSON-RPC API/v6

## Documentation
It's a simple wrapper for the Kodi JSON-RPC Api. For more informations visit: http://kodi.wiki/view/JSON-RPC_API/v6

## Usage/Examble
```javascript
var api = new KodiApi('localhost', '9090');

api('application').setMute(); // for toggeling mute
api('application').setMute(true); // for muting

api('audiolibrary').getArtists().then(function(data) {
    console.log(data.result.artists);
});
// listen on rpc notifications
document.addEventListener('Player.OnPlay', function(event) {
    console.log(event.detail.params.data.item);
});
// change rpc notification callback (deafult throws JavaScript CustomEvents)
api.onNotification(function(data) {
    console.log(data);
});
```
## Todo
- [ ] write small wiki


## License
This project is licensed under the [MIT license](https://github.com/breadlesscode/KodiApi.js/blob/master/LICENSE). See License File for more information.
