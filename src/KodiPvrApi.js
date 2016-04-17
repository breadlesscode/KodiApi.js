class KodiPvrApi {
  constructor(connection) {
    this.connection = connection;
  }

  getChannelDetails(channelid, properties) {
    return this.connection.cmd('PVR.GetChannelDetails', {
      channelid: channelid,
      properties: properties
    });
  }

  getChannelGroupDetails(channelgroupid, channels) {
    return this.connection.cmd('PVR.GetChannelGroupDetails', {
      channelgroupid: channelgroupid,
      channels: channels
    });
  }

  getChannelGroups(channeltype, limits) {
    return this.connection.cmd('PVR.GetChannelGroups', {
      channeltype: channeltype,
      limits: limits
    });
  }

  getChannels(channelgroupid, properties, limits) {
    return this.connection.cmd('PVR.GetChannels', {
      channelgroupid: channelgroupid,
      properties: properties,
      limits: limits
    })
  }

  getProperties(properties) {
    return this.connection.cmd('PVR.GetProperties', {
      properties: properties
    });
  }

  record(record = 'toggle', channel = 'current') {
    return this.connection.cmd('PVR.Record', {
      record: record,
      channel: channel
    });
  }

  scan() {
    return this.connection.cmd('PVR.Scan');
  }


module.exports = KodiPvrApi;