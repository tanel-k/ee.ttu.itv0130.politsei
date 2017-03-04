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
		// do not use required() here
		ValidationRules
			.ensure('email')
				.email().withMessage('See pole korrektne e-maili aadress.');
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
		ValidationRules
			.ensure('firstName')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('lastName')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('phoneNumber')
				.required().withMessage('See väli on kohustuslik.')
			.ensure('email')
				.required().withMessage('See väli on kohustuslik.')
				.email().withMessage('See pole korrektne e-mail.')
			.on(this);
		
	}

	preferredModeOfContact = 'phone';
	contactTime = '';
	isJuridicialPerson = false;
}

export class Suspect extends Person {
	constructor() {
		super();
		ValidationRules
			.ensure('email')
				.email().withMessage('See pole korrektne e-mail.')
			.on(this);
	}

	description = '';
}

export class Witness extends Person {
	constructor() {
		super();
		ValidationRules
			.ensure('email')
				.email().withMessage('See pole korrektne e-mail.')
			.on(this);
	}
}

export class Event {
	constructor() {
		ValidationRules
			.ensure('description')
				.required().withMessage('See väli on kohustuslik.')
			.on(this);
	}

	description = 'X';
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