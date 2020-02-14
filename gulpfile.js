const { src, dest, series, watch } = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const del = require('del');

// Subtasks
const clean = (done) => {
  del(['./dist']);
  done();
};

const lint = (done) => {
  src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
  done();
};

const compile = (done) => {
  src('src/**/*.js')
    .pipe(babel())
    .pipe(dest('./dist'));
  done();
};

// Main tasks
const build = series(lint, compile);

const watchFiles = (done) => {
  watch('./src/**/*.js', build);
  done();
};

module.exports = {
  watchFiles,
  build,
  compile,
  lint,
  clean,
};
