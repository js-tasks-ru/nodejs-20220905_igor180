const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.remainder = '';
  }

  _transform(chunk, encoding, callback) {

    const blocks = this.remainder.concat(chunk.toString()).split(os.EOL);

    this.remainder = blocks.pop();
    
    blocks.forEach(element => this.push(element));
    
    callback();
  }

  _flush(callback) {
    callback(null, this.remainder);
  }
}

module.exports = LineSplitStream;
