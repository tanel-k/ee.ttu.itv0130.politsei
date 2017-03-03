import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';

export default function transferImages() {
	return gulp.src('src/images/**.{gif,png,svg,jpeg,jpg}')
		.pipe(gulp.dest('./images'));
}