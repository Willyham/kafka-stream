# kafka-stream

Node 0.10 Stream compatible kafka consumer

## Overview

This modules aims to provide a simple and stream compatible interface to Prozess' kafka Consumer.
It hides the polling complexity of reading from a kafka stream.

## Installation

```
npm install kafka-stream
```

## Usage

```
var KafkaStream = require('kafka-stream');

var myStream = new KafkaStream({
  host: 'localhost',
  port: '9092',
  partition: 0,
  topic: 'test'
});

myStream.start(function(err) {
  if (err) {
    handleError(err);
    return;
  }
  myStream
    .pipe(es.parse())
    .pipe(stdout);
});

```

## Development

npm test
