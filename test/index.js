'use strict';
var test = require('tape');
var KafkaStream = require('../index');

test('correct export', function t(assert) {
  assert.ok(typeof KafkaStream === 'function', 'exported correctly');
  assert.end();
});
