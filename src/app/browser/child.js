process.on('message', function(message) {
    console.log('[message] ' + message);
    process.send({ foo: 'bar' });
});