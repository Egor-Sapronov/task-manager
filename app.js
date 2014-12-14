var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    oauth2 = require('./libs/oauth2'),
    passport = require('passport'),
    TaskModel = require('./libs/mongo').TaskModel,
    UserModel = require('./libs/mongo').UserModel,
    app = express();

require('./libs/auth');

app.set('views', path.join(__dirname, 'client/build/templates'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/oauth/token', oauth2.token);

app.post('/oauth/register', function (req, res) {
    oauth2.register(req.body.username, req.body.password, function (err, user) {
        if (err) {
            res.send(400);
        } else {
            res.send(200, {user: user.username});
        }
    });
});

app.get('/api/userInfo',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        res.json({user_id: req.user.userId, name: req.user.username, scope: req.authInfo.scope});
    }
);

app.get('/api/tasks', function (req, res) {
    TaskModel.find({}, function (err, data) {
        res.send(data);
    });
});

app.get('/api/user/tasks',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        TaskModel.find({_user: req.user.userId}, function (err, data) {
            res.status(200).send(data);
        });
    });

app.delete('/api/tasks/:id',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {

        TaskModel.remove({_id: req.params.id}, function (err) {
            res.send({});
        });
    });

app.post('/api/tasks',
    passport.authenticate('bearer', {session: false}),
    function (req, res) {
        var task = new TaskModel({
            title: req.body.title,
            content: req.body.content,
            _user: req.user.userId
        });
        task.save(function (err, entity) {
            UserModel.findOne({_id: req.user.userId}, function (err, creater) {
                creater.tasks.push(entity);

                creater.save(function (err, data) {
                    res.status(200).send({task: entity});
                });
            });
        });


    });

app.get('/', function (req, res) {
    res.render('layout');
});

module.exports = app;
