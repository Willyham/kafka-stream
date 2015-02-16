'use strict';
var util = require('util');
var Readable = require('stream').Readable;
var Kafka = require('prozess');
var setTimeout = require('timers').setTimeout;

util.inherits(KafkaStream, Readable);

function KafkaStream(options) {
  options = options || {};
  options.pollInterval = typeof options.pollInterval === 'number' ? options.pollInterval : 1000;
  this.options = options;

  Readable.call(this, options);
  this.consumer = new Kafka.Consumer(options);
}

KafkaStream.prototype.start = function start(callback) {
  this.consumer.connect(function connect(err) {
    if (err) {
      callback(err);
      return;
    }
    callback(null);
  });
};

KafkaStream.prototype.poll = function poll(timeout) {
  var consume = this.consume.bind(this);
  setTimeout(consume, timeout);
};

KafkaStream.prototype.consume = function consumer() {
  this.isConsuming = true;
  var pollInterval = this.options.pollInterval;
  var self = this;

  this.consumer.consume(function messageReceived(err, messages) {
    if (err) {
      this.emit('error', (err));
      self.poll(pollInterval);
      return;
    }
    if (!Array.isArray(messages) || !messages.length) {
      self.poll(pollInterval);
      return;
    }
    // Push each message to the stream
    messages.forEach(function pushPayload(message) {
      self.push(message.payload);
    });
    self.poll(0);
  });
};

KafkaStream.prototype.tamper = function tamper(data, timeout) {
  timeout = typeof timeout === 'number' ? timeout : 0;
  setTimeout(function pushToStream() {
    this.push(data);
  }.bind(this), timeout);
};

KafkaStream.prototype._read = function _read() {
  if (this.isConsuming) {
    return;
  }
  this.consume();
};

module.exports = KafkaStream;
