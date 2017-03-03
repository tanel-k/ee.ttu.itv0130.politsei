import gulp from 'gulp';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';

export default function transferImages() {
	return gulp.src('src/css/**.css')
		.pipe(gulp.dest('./css'));
}