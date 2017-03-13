import {BaseForm} from 'base-form';

export class SubmissionForm extends BaseForm {
	isNonEmpty(v) {
		return isNonEmptyString(v);
	}
	
	defaultValue(value, valueIfEmpty='—') {
		if (!isNonEmptyString(value)) {
			return valueIfEmpty;
		}
		
		return value;
	}
}

function isNonEmptyString(str) {
	return str && str.trim();
}