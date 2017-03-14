import 'jquery';
import 'block-ui';

export class FormSubmitted {
	attached() {
		setTimeout(() => $.unblockUI(), 150);
	}
}