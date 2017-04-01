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


function compile(watch) {
  var bundler = watchify(
      browserify('./app/main.js', {
        debug: true,
        paths: ['./app/']
      }).transform(babelify)
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

gulp.task('concat', function() {
  var bowerPath = "./bower_components/"
  return gulp.src([
      bowerPath + 'skulpt/skulpt.min.js',
      bowerPath + 'skulpt/skulpt-stdlib.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('concat-css', function() {
  var modulesPath = "./node_modules/"
  return gulp.src([
      modulesPath + 'codemirror/lib/codemirror.css',
      modulesPath + 'codemirror/theme/dracula.css'
    ])
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./build/'));
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

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return compile(true); });

gulp.task('default', ['watch', 'watch-sass']);