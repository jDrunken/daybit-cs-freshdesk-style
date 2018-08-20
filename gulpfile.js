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
    publish = require('gulp-gh-pages'),

	// multi-browser test tool
	browserSync = require('browser-sync');

// --------------------------------------------------------------------------------
// 환경설정
// --------------------------------------------------------------------------------

var path = {
    source:      'source',
    deploy:      'deploy',
    injection:   'chain-partners.github.io/daybit-cs-freshdesk-style',
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
        .pipe(gulp.dest(path.injection));
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


// 멀티브라우저 테스트용 browser-sync test
// 이게 가능할런지 모르겠다;
// 이 기능은 좀 더 다듬어보고 넣던가 해야될거 같으네.
// !!!! 프록시 기능 추가해야된다.
gulp.task('cross',function () {
	browserSync.init({

	})
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




