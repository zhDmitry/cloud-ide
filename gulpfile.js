var gulp = require('gulp');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var reactify = require('reactify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var stringify = require('stringify');

function compile(watch) {
  var bundler = watchify(
      browserify('./app/main.js', {
        debug: true,
        paths: ['./app/', './examples/']
      }).transform(
        babelify.configure({
          stage: 0
        })
      ).transform(
        stringify(['.py', '.rb', '.md'])
      )
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { 
        console.error(err.message); 
        this.emit('end'); 
      })
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulp.dest('./build'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function buildWorker(name, scripts) {
  var workerName = 'workers/' + name + '.js',
      workerBundle = name + '.worker.js';
  return gulp.src(scripts.concat([workerName]))
           .pipe(concat(workerBundle))
           .pipe(gulp.dest('./build/'));
}

gulp.task('buildWorkers', function() {
  var bowerPath = "./bower_components/"

  buildWorker('opal', [
    bowerPath + 'opal/opal/current/opal.min.js',
    bowerPath + 'opal/opal/current/opal-parser.min.js',
  ]);

  buildWorker('skulpt', [
    bowerPath + 'skulpt/skulpt.min.js',
    bowerPath + 'skulpt/skulpt-stdlib.js',
  ]);
  
});

gulp.task('sass', function () {
  gulp.src('./styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build'));
});

gulp.task('watch-sass', function() {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('compress', function() {
  return gulp.src('build/main.js')
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('js', function() { return compile(); });
gulp.task('watch', function() { return compile(true); });
gulp.task('build', ['concat', 'js', 'buildWorkers', 'sass']);

gulp.task('default', ['watch', 'watch-sass']);