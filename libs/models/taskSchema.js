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
        ref: 'User'
    }
});

module.exports.Task = Task;


