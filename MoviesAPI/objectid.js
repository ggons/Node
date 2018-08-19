// _id: 5b79795f8911282fb06c2e83

// 12 bytes
  // 4 bytes: timestamp
  // 3 bytes: machine identifier
  // 2 bytes: process identifier
  // 3 bytes: counter

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 2 ^ 24 = 16M

// Driver -> MongoDB

const mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id);

console.log(mongoose.Types.ObjectId.isValid(id));