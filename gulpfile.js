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
const build = series(clean, lint, compile);

const buildWatch = (done) => {
  watch('./src/**/*.js', build);
  done();
};

module.exports = {
  'build:watch': buildWatch,
  build,
  compile,
  lint,
  clean,
};
