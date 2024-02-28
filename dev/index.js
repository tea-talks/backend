'use strict';

const { MyReadable } = require('./readable');
const { MyWritable } = require('./writable');

const {
  setTimeout: wait,
  setInterval: interval,
} = require('node:timers/promises');

// const readable = new MyReadable();
// const writable = new MyWritable();

// const read = async () => {
//   for await (const i of readable)
//     console.log('FOR AWAIT', i);
// };

// const push = async () => {
//   let i = 0;
//   for await (const _ of interval(5000))
//     readable.data = [i++, i++, i++];
// };

// read();
// readable.pipe(writable, { end: false });

// push();

const readable1 = new MyReadable();
const readable2 = new MyReadable();
wait(15000).then(() => readable1.data = [null])
const writable = new MyWritable();

const push1 = async () => {
  let i = 0;
  for await (const _ of interval(5000)) {
    readable1.data = [i++, i++, i++];
  }
};

const push2 = async () => {
  let i = 0;
  for await (const _ of interval(2000)) {
    readable2.data = [--i, --i, --i];
  }
};

readable1.pipe(writable, { end: false });
readable2.pipe(writable, { end: false });

push1();
push2();
