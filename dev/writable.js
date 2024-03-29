'use strict';

const { Writable } = require('node:stream');
const { setTimeout: wait } = require('node:timers/promises');

class MyWritable extends Writable {
  constructor() {
    super({
      highWaterMark: 2,
      objectMode: true,
    });
  }

  async _write(i, encoding, callback) {
    await wait(5000);
    console.log('WRITABLE', i);
    callback();
  }

  // async _writev(arrI, callback) {
  //   await wait(5000);
  //   console.log('WRITABLE', ...arrI);
  //   callback();
  // }
}

module.exports = {
  MyWritable,
};
