'use strict';

const { Readable } = require('node:stream');

class MyReadable extends Readable {
  constructor() {
    super({
      objectMode: true,
      highWaterMark: 1,
    });
    // this._data = [];
    // this.readData = this.readData.bind(this);
    this.on('resume', () => console.log('resume'));
    this.on('end', () => console.log('end'));
    this.on('close', () => console.log('close'));
  }

  // set data(data) {
  //   this._data.push(...data);
  //   this.emit('continue');
  // }

  // get data() {
  //   return this._data;
  // }

  // readData() {
  //   if (this.data.length) {
  //     const item = this.data.shift();
  //     this.push(item);
  //   }
  //   else this.once('continue', this.readData);
  // }

  async _read() {
    // await wait(200);
    // this.readData();
  }
}

module.exports = {
  MyReadable,
};
