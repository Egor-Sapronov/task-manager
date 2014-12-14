var Schema = require('mongoose').Schema;

var Task = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    _user: {
        type: String,
        ref: 'user'
    }
});

module.exports.Task = Task;


