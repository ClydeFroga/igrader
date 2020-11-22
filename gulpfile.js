let preprocessor = "less";

const { src, dest, parallel, series, watch } = require("gulp");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const sass = require("gulp-sass");
const scss = require("gulp-sass");
const less = require("gulp-less");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const newer = require("gulp-newer");
const del = require("del");
const critical = require('critical');

function browsersync() {
  // страничка где происходят изменения
  browserSync.init({
    server: { baseDir: "app/" },
    notify: false,
  });
}

function cleanimg() {
  // удаление всего в папке
  return del("app/images/dest/**/*", { forse: true });
}

function cleandist() {
  //очистка папки
  return del("dist/**/*", { forse: true });
}

function styles() {
  // из сасс/лесс в ксс
  return src("app/" + preprocessor + "**/*")
    .pipe(eval(preprocessor)())
    .pipe(concat("style.css")) //имя
    .pipe(autoprefixer({ overrideBrowserslist: ["last 10 versions"] }))
    .pipe(
      cleancss({ level: { 1: { specialComments: 0 } }, /*format: "beautify"*/ })
    )
      // .pipe(dest("app"))
    // .pipe(dest("C:\\Users\\hahle\\OneDrive\\Documents\\code\\grader\\assets"))
	// .pipe(dest("../../../../../xampp5.6/htdocs/nuxtGrader/grader/assets"))  // выгрузка
	.pipe(dest("C:\\xampp\\htdocs\\igrader\\wp-content\\themes\\igrader"))  // выгрузка
    .pipe(browserSync.stream());
}

function criticalR() {
  return critical.generate({
    base: 'app/',
    src: 'index.html',
    target: {css: 'css/critical.css',
      uncritical: 'css/uncritical.css'},
    width: 1920,
    height: 1200,
    css: 'style.css'
  });
}

function scripts() {
  // обновление при изменении js
  return src(["node_modules/jquery/dist/jquery.min.js", "app/js/**/*"])
    .pipe(concat("app.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js/"))
    .pipe(browserSync.stream());
}

function images() {
  // оптимизация изображений
  return src("app/images/src/**/*")
    .pipe(newer("app/images/dest/"))
    .pipe(imagemin())
    .pipe(dest("app/images/dest/"));
}

function buildcopy() {
  // создать копию app
  return src(
    [
      "app/css/**/*.min.css",
      "app/js/**/*.min.js",
      "app/images/dest/**/*",
      "app/**/*.html",
    ],
    { base: "app" }
  ).pipe(dest("dist"));
}

function startwatch() {
  //слежка за изменением файлов
  watch("app/" + preprocessor + "/**/*", styles);
  // watch(["app/**/*.js", "!app/**/*.min.js"], scripts);
  watch("app/**/*.html").on("change", browserSync.reload);
  watch("app/images/src/**/*", images);
}

exports.browsersync = browsersync;
exports.scripts = scripts;
exports.styles = styles;
exports.images = images;
exports.cleanimg = cleanimg;
exports.critical = criticalR;
exports.build = series(cleandist, styles, scripts, images, buildcopy);

exports.default = parallel(styles, startwatch);
