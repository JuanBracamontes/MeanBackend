 const uploadImageDto = class {
    folder;
    fileName;
    path;
    id;
  
    constructor(data) {
      this.folder = data.folder;
      this.fileName = data.fileName;
      this.path = data.path;
      this.id = data.id;
    }
  }

  module.exports = {
    uploadImageDto
  }