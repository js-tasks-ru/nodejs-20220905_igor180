const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.totalBytes = options.limit;
    this.counter = 0;

  }

  _transform(chunk, encoding, callback) {

    this.counter += this.writableLength; 

    var err;
    if (this.counter > this.totalBytes){
      err = new LimitExceededError;
    }

    callback(err, chunk)

  }
}

module.exports = LimitSizeStream;
