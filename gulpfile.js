"use strict";

const gulp = require('gulp');
const inline = require('gulp-inline');
const autoprefixer = require('gulp-autoprefixer')
const del = require('del')
const runSequence = require('run-sequence');
const path = require('path')
const dirname = path.dirname(__filename)
const dest = path.join(dirname, 'dist')
const src = path.join(dirname, 'src')

gulp.task('clean', function () {
  return del([dest], {force: true})
})

gulp.task('compile', function () {
  return gulp.src([`${src}/app/**/*.html`])
    .pipe(inline({
      css: [autoprefixer({browsers: ['last 2 versions']})],
      disabledTypes: ['img'],
      ignore: []
    }))
    .pipe(gulp.dest(dest))
});

gulp.task('build', function (done) {
  runSequence('clean',
    ['compile'],
    done)
})

gulp.task('default', ['build'])