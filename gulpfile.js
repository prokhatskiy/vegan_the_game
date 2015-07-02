'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');

var path = {
    js: ['js/events.js', 'js/Game.js', 'js/Meal.js', 'js/Player.js', 'js/app.js']
};

gulp.task('js', function() {
    return gulp.src(path.js)
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest('js/build'));
});

gulp.task('watch', function() {
    gulp.watch('js/*', ['js']);
});

gulp.task('default', ['js', 'watch']);

