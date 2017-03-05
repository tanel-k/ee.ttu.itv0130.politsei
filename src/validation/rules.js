import {ValidationRules} from 'aurelia-validation';

ValidationRules.customRule(
	'phoneNumberContent',
	(value, obj) => {
		if (value) {
			return !value.replace(/[0-9 ()+]/g, '');
		}
		return true;
	},
	'${$displayName} is not a valid phone number.'
);

ValidationRules.customRule(
	'SSN',
	(value, obj) => {
		if (value) {
			value = value.replace(/\s/g, '');
			return value.length == 11
				&& /[1-6][0-9]{2}[1,2][0-9][0-9]{2}[0-9]{4}/.test(value);
		}
		
		return true;
	},
	'${$displayName} is not a valid SSN.'
);

ValidationRules.customRule(
	'currency',
	(value, obj) => {
		if (value) {
			value = value.replace(',', '.');
			if (!value.match(/^\d*(\.\d+)?$/)) {
				return false;
			}
			value = parseFloat(value);
			return !isNaN(value);
		}
		
		return true;
	},
	'${$displayName} is not a valid amount.'
);

ValidationRules.customRule(
	'year',
	(value, obj) => {
		if (value) {
			value = value.replace(/\s/g, '');
			if (value.match(/^\d\d\d\d$/)) {
				value = parseInt(value);
				return (value >= 1900) && (value <= new Date().getFullYear());
			}

			return false;
		}
		
		return true;
	},
	'${$displayName} is not a valid year.'
);