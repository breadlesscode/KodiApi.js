class KodiFilesApi {
  constructor(connection) {
    this.connection = connection;
  }

  download(file) {
    return this.connection.cmd('Files.Download', {file: file});
  }

  getDiretory(directory, media = "files", properties, sort) {
    return this.connection.cmd('Files.GetDiretory', {
      directory: directory,
      media: media,
      properties: properties,
      sort: sort
    });
  }

  getFileDetails(file, media ="files", properties) {
    return this.connection.cmd('Files.GetFileDetails', {
      file: file,
      media: media,
      properties: properties
    });
  }

  getSources(media, limits, sort) {
    return this.connection.cmd('Files.GetSources', {
      media: media,
      limits: limits,
      sort: sort
    });
  }

  prepareDownload(path) {
    return this.connection.cmd('Files.PrepareDownload', {path: path});
  }
}