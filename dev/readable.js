'use strict';

const { Readable } = require('node:stream');
const { MyWritable } = require('./writable');

const {
  setTimeout: wait,
  setInterval: interval,
} = require('node:timers/promises');

class MyReadable extends Readable {
  constructor() {
    super({
      objectMode: true,
    });
    this._data = [];
    this.onResume = this.onResume.bind(this);
    this.on('resume', () => console.log('resume'));
  }

  set data(data) {
    this._data.push(...data);
    this.emit('continue');
    console.log('RESUME');
    this.resume();
  }

  get data() {
    return this._data;
  }

  onResume() {
    this.readData();
  }

  readData() {
    const i = this.data.shift();
    if (i !== undefined) this.push(i);
    else {
      this.pause();
      this.once('resume', this.onResume);
    }
    // else this.once('continue', this.onResume);
  }

  async _read() {
    await wait(200);
    this.readData();
  }
}

const readable = new MyReadable();
const writable = new MyWritable();

const read = async () => {
  for await (const i of readable) {
    console.log(i);
  }
};

const push = async () => {
  let i = 0;
  for await (const _ of interval(5000)) {
    readable.data = [i++, i++, i++];
  }
};

// read();
readable.pipe(writable, { end: false });
push();
