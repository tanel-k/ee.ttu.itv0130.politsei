import {ValidationRules} from 'aurelia-validation';

let requiredMsg = 'See väli on kohustuslik';

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

export class Event {
	constructor() {
		ValidationRules
			.ensure('description')
				.required().withMessage(requiredMsg)
			.ensure('timeEvent')
				.satisfiesRule('time24h')
					.withMessage('Kellaaeg peab vastama formaadile tt:mm')
			.ensure('dateEvent')
				.satisfiesRule('dateEET')
					.withMessage('Kuupäev peab vastama formaadile pp/kk/aaaa')
			.on(this);
	}

	description = 'Random text';
	dateEvent = '';
	timeEvent = '';
	country = '';
	address = '';
	location = '';
}

export class Person {
	constructor() {
		// ValidationRules are not inheritable
	}

	firstName = 'John';
	lastName = 'Doe';
	SSN = '39210130864';
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
				.required().withMessage(requiredMsg)
			.ensure('lastName')
				.required().withMessage(requiredMsg)
			.ensure('phoneNumber')
				.required().withMessage(requiredMsg)
			.ensure('email')
				.required().withMessage(requiredMsg)
			.ensure('hasDateOfBirthOrSSN')
				.satisfiesRule('isTruthy').withMessage('Vähemalt üks väli on vaja ära täita')
			.on(this);
		
	}

	preferredModeOfContact = 'phone';
	contactTime = '';
	isJuridicialPerson = false;

	get hasDateOfBirthOrSSN() {
		// workaround for lack of multi-property validation
		return (this.SSN || this.dateOfBirth) ? true : false;
	}
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
		.ensure('dateOfBirth')
			.satisfiesRule('dateEET')
				.withMessage('Kuupäev peab vastama formaadile pp/kk/aaaa')
		.ensure('phoneNumber')
			.satisfiesRule('phoneNumberContent').withMessage('See pole korrektne telefoninumber')
		.ensure('email')
			.email().withMessage('See pole korrektne e-mail.')
		.ensure('SSN')
			.satisfiesRule('SSN').withMessage('See pole korrektne isikukood');
}

export class Damage {
	constructor() {
		ValidationRules
			.ensure('valueEstimate')
				.satisfiesRule('currency').withMessage('See pole korrektne summa.')
			.ensure('yearOfPurchase')
				.satisfiesRule('year').withMessage('See pole korrentkne aasta.')
			.ensure('timeLastHad')
				.satisfiesRule('time24h')
					.withMessage('Kellaaeg peab vastama formaadile tt:mm')
			.ensure('timeNoticedMissing')
				.satisfiesRule('time24h')
					.withMessage('Kellaaeg peab vastama formaadile tt:mm')
			.on(this);
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