import {ValidationRules} from 'aurelia-validation';

export class Report {
	constructor() {
		
	}

	reporter = new Reporter();
	event = new Event();
	damages = [];
	suspects = [];
	witnesses = [];

	agreeToSettlement = false;
	agreeToEmailedDocs = false;
	useEDossier = false;
}

export class Person {
	constructor() {
		// ValidationRules are not inheritable
	}

	firstName = 'John';
	lastName = 'Doe';
	SSN = '';
	dateOfBirth = '';
	nationality = '';
	occupation = '';
	phoneNumber = '55514212';
	email = 'john-doe@domain.com';
	address = '';
}

export class Reporter extends Person {
	constructor() {
		super();
		// applyPersonValidationRules(this);
		getPersonValidationRules()
			.ensure('firstName')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('lastName')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('phoneNumber')
				.maxLength(50).withMessage('Number on liiga pikk')
				.minLength(5).withMessage('Number on liiga lühike')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('email')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('SSN')
				.required().withMessage('See väli on kohustuslik.')
			.on(this);
		
	}

	preferredModeOfContact = 'phone';
	contactTime = '';
	isJuridicialPerson = false;
}

export class Suspect extends Person {
	constructor() {
		super();
		getPersonValidationRules().on(this);
	}

	description = '';
}

export class Witness extends Person {
	constructor() {
		super();
		getPersonValidationRules().on(this);
	}
}

function getPersonValidationRules() {
	return ValidationRules
		.ensure('phoneNumber')
			.maxLength(50).withMessage('Number on liiga pikk')
			.minLength(5).withMessage('Number on liiga lühike')
		.ensure('email')
			.required().withMessage('See väli on kohustuslik.')
			.email().withMessage('See pole korrektne e-mail.')
		.ensure('SSN')
			.matches(/[1-6][0-9]{2}[1,2][0-9][0-9]{2}[0-9]{4}/).withMessage('Pole korrektne isikukood');
}

export class Event {
	constructor() {
		ValidationRules
			.ensure('description')
				.required().withMessage('See väli on kohustuslik.')
			.on(this);
	}

	description = 'Random text';
	dateEvent = '';
	timeEvent = '';
	country = '';
	address = '';
	location = '';
}

export class Damage {
	constructor() {
		
	}

	name = '';
	valueEstimate = '';
	yearOfPurchase = '';
	dateLastHad = '';
	timeLastHad = '';
	dateNoticedMissing = '';
	timeNoticedMissing = '';
	description = '';
}