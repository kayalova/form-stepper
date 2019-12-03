const { task, src, dest, watch } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')
const concat = require('gulp-concat')

const buildCss = () => {
    return src("source/*.css")
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(dest("build/css"))
}

const buildJs = () => {
    return src('source/js/*.js')
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(dest("build/js/"))
}

task('watch', () => {
    watch('./source/*.css', buildCss)
})

task("build-js", buildJs)
task("build-css", buildCss)