class KodiPlayerApi {
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