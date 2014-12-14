var gulp = require('gulp'),
    clean = require('gulp-clean'),
    jade = require('gulp-jade'),
    plumber = require('gulp-plumber'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    paths = {
        src: './client/app/',
        dest: './client/build/',
        templates: './client/app/templates/',
        stylesheets: './client/app/stylesheets/',
        vendor: './client/app/vendor/'
    };

gulp.task('templates', function () {
    gulp.src(paths.templates + '**/*.jade')
        .pipe(gulp.dest(paths.dest + 'templates/'));
});

gulp.task('vendor', function () {
    gulp.src(paths.vendor + '**')
        .pipe(gulp.dest(paths.dest + 'vendor'));
});

gulp.task('scripts', function () {
    gulp.src(paths.src + 'init.js')
        .pipe(plumber())
        .pipe(browserify({shim: require('./browserify-shim')(paths)}))
        .pipe(gulp.dest(paths.dest + 'assets/scripts/'));
});

gulp.task('stylesheets', function () {
    gulp.src(paths.stylesheets + '**')
        .pipe(gulp.dest(paths.dest + 'assets/stylesheets'));
});

gulp.task('html', function () {
    gulp.src(paths.templates + '**/*.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dest + 'templates/'));
});


gulp.task('clean', function () {
    gulp.src(paths.dest, {read: false})
        .pipe(clean());
});

gulp.task('serve', function () {
    var app = require('./app'),
        config = require('./libs/config'),
        log = require('./libs/log')(module);

    app.listen(config.get('port'), function () {
        log.info('Express server listening on port ' + config.get('port'));
    });
});

gulp.task('watch', function () {
    gulp.watch(paths.templates + '**/*.jade', ['templates', 'html']);

    gulp.watch(paths.vendor + '**', ['vendor']);

    gulp.watch(paths.src + '**/*.js', ['scripts']);

    gulp.watch(paths.stylesheets + '**', ['stylesheets']);
});

gulp.task('start', ['watch', 'serve']);

gulp.task('build', ['templates', 'html', 'scripts', 'vendor', 'stylesheets']);

