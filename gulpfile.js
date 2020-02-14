const { src, dest, series, watch } = require('gulp'),
  babel = require('gulp-babel'),
  eslint = require('gulp-eslint'),
  del = require('del');

// Subtasks
const clean = (done) => {
  del(['./dist']);
  done();
}

const lint = (done) => {
  src('src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
  done();
}

const compile = (done) => {
  src('src/**/*.js')
    .pipe(babel())
    .pipe(dest('dist'))
  done();
};

// Main tasks
const build = series(clean, lint, compile);

const watchFiles = (done) => {
  watch('./src/**/*.js', build);
  done();
}

module.exports = {
  watchFiles,
  build,
  compile,
  lint,
  clean,
};
