var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require('tsify');


var config = {
    distRoot: './src/',
    app: {
        root: './src/app/app.ts',
        dest: 'app.bundle.js',
        distRoot: './dist/'
    },
    static: {
        distRoot: './dist',
        baseRoot: './src',
        sources: [
            './src/index.html',
            './src/site.css'
        ],
    },
    vendors: {
        distRoot: './dist/lib/',
        js: {
            sources: [
                'node_modules/angular/angular.js'
            ],
            dest: 'vendors.js'
        },
        css: {
            sources: [
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/angular/angular-csp.css'
            ],
            dest: 'vendors.css'
        }
    }
};

gulp.task('default', ['build:app', 'build:vendorjs', 'build:vendorcss']);

gulp.task('build:app', function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: [config.app.root],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source(config.app.dest))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.app.distRoot));
});

gulp.task('build:static', () => {
    return gulp.src(config.static.sources, { base: config.static.baseRoot })
        //.pipe(filelog())
        .pipe(gulp.dest(config.static.distRoot));
});

gulp.task('build:vendorjs', () => {
    return gulp.src(config.vendors.js.sources)
        .pipe(concat(config.vendors.js.dest))
        .pipe(gulp.dest(config.vendors.distRoot));
});

gulp.task('build:vendorcss', () => {
    return gulp.src(config.vendors.css.sources)
        .pipe(concat(config.vendors.css.dest))
        .pipe(gulp.dest(config.vendors.distRoot));
});
