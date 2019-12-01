const { task, src, dest } = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const cleanCss = require('gulp-clean-css')

const buildCss = () => {
    return src("source/*.css")
        .pipe(autoprefixer())
        .pipe(cleanCss())
        .pipe(dest("build"))
}

const buildJs = () => {
    return src('source/*.js')
        .pipe(babel({
            presets: ["@babel/env"]
        }))
        .pipe(uglify())
        .pipe(dest("build"))
}

task("build-js", buildJs)
task("build-css", buildCss)