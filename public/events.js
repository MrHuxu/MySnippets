var EventEmitter = require("events").EventEmitter;

module.exports = {
  listEvent: new EventEmitter(),
  snippetEvent: new EventEmitter()
};