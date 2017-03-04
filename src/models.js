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
	}

	firstName = '';
	lastName = '';
	SSN = '';
	dateOfBirth = '';
	nationality = '';
	occupation = '';
	phoneNumber = '';
	email = '';
	address = '';
}

export class Reporter extends Person {
	constructor() {
		super();
		ValidationRules
			.ensure('firstName').required().withMessage('See väli on kohustuslik.')
			.ensure('lastName').required().withMessage('See väli on kohustuslik.')
			.on(this);
		
	}

	preferredModeOfContact = 'phone';
	contactTime = '';
	isJuridicialPerson = false;
}

export class Suspect extends Person {
	constructor() {
		super();
	}

	description = '';
}

export class Witness extends Person {
	constructor() {
		super();
	}
}

export class Event {
	constructor() {
		ValidationRules
			.ensure('description')
				.required().withMessage('See väli on kohustuslik.')
			.on(this);
	}

	description = '';
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