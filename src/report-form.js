import {inject, bindable, NewInstance} from 'aurelia-framework';
import {Report, Damage, Witness, Suspect} from './models';
import {progressState, TrackerClickedEvent} from './resources/elements/progress-tracker';
import {FormAttachedEvent, FormDetachedEvent} from './base-form';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import {DataGateway} from './data-gateway';
import 'jquery';

@inject(EventAggregator, NewInstance.of(ValidationController), DataGateway)
export class ReportForm {
	fadeOutDuration = 300;
	fadeInDuration = 750;
	errorScrollDuration = 300;
	// patch for navigation spam
	isNavigating = true;
	
	constructor(eventAggregator, validationController, dataGateway) {
		this.eventAggregator = eventAggregator;
		validationController.validateTrigger = validateTrigger.changeOrBlur;
		this.validationController = validationController;
		this.dataGateway = dataGateway;
		this.report = new Report();
		
		this.pages = [
			{ pageKey: 'instructions-form', name: 'Juhend', loadBind: 'alertFalse' },
			{ pageKey: 'event-form', name: 'Sündmus' },
			{ pageKey: 'reporter-form', name: 'Isikuandmed' },
			{ pageKey: 'reporter-contact-form', name: 'Kontaktandmed' },
			{ pageKey: 'damages-form', name: 'Kahju' },
			{ pageKey: 'suspects-form', name: 'Süüdlased' },
			{ pageKey: 'witnesses-form', name: 'Tunnistajad' },
			{ pageKey: 'submission-form', name: 'Esitamine' }
		];
		this.pages.forEach((page, i) => {
			page.progressState = progressState.unvisited;
			page.staticIndex = i;
		});
		let firstForm = this.pages[0];
		
		firstForm.progressState = progressState.current;
		this.activePage = firstForm;
		this.thresholdPage = firstForm;
	}

	attached() {
		this.formArea = document.body.querySelector('.form-area');
		this.isNavigating = false;
	}

	activate() {
		this.dataGateway.getCountries().then(countries => {
			this.countries = countries.map(c => { return { value: c.name, name: c.name } });
			this.countries.unshift({});
		});
		
		this.dataGateway.getNationalities().then(nationalities => {
			this.nationalities = nationalities.map(n => { return { value: n.name, name: n.name } });
			this.nationalities.unshift({});
		});
		
		this.dataGateway.getMunicipalities().then(municipalities => {
			this.municipalities = municipalities.map(m => { return { value: m.name, name: m.name } });
			this.municipalities.unshift({});
		});
		
		this.eventAggregator.subscribe(TrackerClickedEvent,
			event => {
				if (this.activePage.pageKey == event.pageKey) {
					return;
				}
				
				let targetPage = this.findPageByKey(event.pageKey);
				this.doNavigation(targetPage);
			}
		);

		this.eventAggregator.subscribe(FormAttachedEvent,
			event => this.isNavigating = false
		);

		this.eventAggregator.subscribe(FormDetachedEvent,
			event => this.isNavigating = true
		);
	}

	get onFirstPage() {
		return this.activePage.staticIndex == 0;
	}

	get onLastPage() {
		return this.activePage.staticIndex == this.pages.length - 1;
	}

	doNavigation(targetPage) {
		if (!this.isNavigating) {
			if (this.onThresholdPage()) {
				// on active page
				this.navigateFromThreshold(targetPage);
			} else {
				// navigation in visited section
				this.navigateFromVisited(targetPage);
			}
		}
	}

	navigateFromThreshold(targetPage) {
		let isPageValid = true;
		let backNav = targetPage.staticIndex < this.thresholdPage.staticIndex;
		
		if (backNav) {
			this.activePage.progressState = progressState.threshold;
			this.performNavigation(targetPage);
			return;
		}
		
		this.validationController.validate().then(result => {
			if (result.valid) {
				this.thresholdPage = targetPage;
				this.activePage.progressState = progressState.visited;
				this.performNavigation(targetPage);
			} else {
				scrollToFirstError(this.errorScrollDuration);
			}
		});
	}

	navigateFromVisited(targetPage) {
		this.validationController.validate().then(result => {
			if (result.valid) {
				this.activePage.progressState = progressState.visited;
				this.performNavigation(targetPage);
			} else {
				scrollToFirstError(this.errorScrollDuration);
			}
		});
	}

	performNavigation(targetPage) {
		targetPage.progressState = progressState.current;
		this.activePage = targetPage;
	}

	nextPage() {
		if (!this.onLastPage) {
			let targetPage = this.findPageByIndex(this.activePage.staticIndex + 1);
			this.doNavigation(targetPage);
		}
	}

	previousPage() {
		if (!this.onFirstPage) {
			let targetPage = this.findPageByIndex(this.activePage.staticIndex - 1);
			this.doNavigation(targetPage);
		}
	}

	onThresholdPage() {
		return this.thresholdPage.staticIndex == this.activePage.staticIndex;
	}

	findPageByKey(pageKey) {
		return this.pages.find(page => page.pageKey == pageKey);
	}

	findPageByIndex(index) {
		return this.pages.find(page => page.staticIndex == index);
	}
}

function scrollToFirstError(scrollDuration) {
	let errorDiv = document.querySelector('div.has-error');
	if (errorDiv) {
		$('html, body').animate({ scrollTop: $(errorDiv).offset().top }, scrollDuration, 'linear');
		let formInput = errorDiv.querySelector('.form-control');
		if (formInput) {
			$(formInput).focus();
		}
	}
}