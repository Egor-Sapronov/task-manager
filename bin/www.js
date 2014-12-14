
var debug = require('debug')('around-me');
var app = require('../app');
var log = require('../libs/log')(module);




var server = app.listen(8080, function () {
    log.info('Express server listening on port ' + server.address().port);
});
