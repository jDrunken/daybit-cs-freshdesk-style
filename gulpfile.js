// --------------------------------------------------------------------------------
// daybit cs channel - freshdesk UI 설정
// --------------------------------------------------------------------------------

var gulp = require('gulp'),

    // css
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),

    // image inliner(for theme editor)
    base64 = require('gulp-base64'),

    // source tracking
	sourcemaps = require('gulp-sourcemaps'),

    // sequancial task running
    runSequence = require('run-sequence'),

    // gulp-gh-pages
    publish = require('gulp-gh-pages');

// --------------------------------------------------------------------------------
// 환경설정
// --------------------------------------------------------------------------------

var path = {
    source:      'source',
    deploy:      'deploy',
    cssFileName: 'style.scss'
};

// 파일 변경 감지 :: local
gulp.task('watch', function(callback) {
    gulp.watch([
        path.source+'/*.{scss,sass,css}',
        path.source+'/*.{png,jpg,gif}'
    ],['convert:sass:sourcemap'],callback);
});

// css 처리
gulp.task('convert:sass:sourcemap', function () {

    return gulp.src(path.source + '/' + path.cssFileName)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 11'],
            expand: true,
            flatten: true
        }))
        .pipe(base64({
            maxImageSize: 120*1024                                  // bytes,
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(path.deploy));
});

// 배포용 css 만들기
gulp.task('convert:sass', function () {

    return gulp.src(path.source + '/' + path.cssFileName)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 11'],
            expand: true,
            flatten: true
        }))
        .pipe(base64({
            maxImageSize: 120*1024                                  // bytes,
        }))
        .pipe(gulp.dest(path.deploy));
});
// freshdesk에 연결하기 위해서 github page에 연결시킴
gulp.task('release', function () {
    return gulp.src(path.deploy + '/*')
        .pipe(publish({
            force : true,
            message : 'Pushed Github Page'
        }))
});

// --------------------------------------------------------------------------------
// pipe running
// --------------------------------------------------------------------------------
gulp.task('default', function () {
	runSequence('convert:sass:sourcemap','watch');
});

gulp.task('deploy', function () {
	runSequence('convert:sass','release');
});
