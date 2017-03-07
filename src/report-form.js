import {inject, bindable, NewInstance} from 'aurelia-framework';
import {Report, Damage, Witness, Suspect} from './models';
import {progressState, TrackerClickedEvent} from './resources/elements/progress-tracker';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import 'jquery';

@inject(EventAggregator, NewInstance.of(ValidationController))
export class ReportForm {
	fadeOutDuration = 300;
	fadeInDuration = 750;
	errorScrollDuration = 300;
	
	constructor(eventAggregator, validationController) {
		this.eventAggregator = eventAggregator;
		validationController.validateTrigger = validateTrigger.changeOrBlur;
		this.validationController = validationController;
		this.report = new Report();
		
		this.pages = [
			{ pageKey: 'instructions-form', name: 'Juhend', loadBind: 'alertFalse' },
			{ pageKey: 'event-form', name: 'Sündmus' },
			{ pageKey: 'reporter-form', name: 'Isikuandmed' },
			{ pageKey: 'reporter-contact-form', name: 'Kontaktandmed' },
			{ pageKey: 'damages-form', name: 'Varaline kahju' },
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
	}

	activate() {
		this.eventAggregator.subscribe(TrackerClickedEvent,
			event => {
				if (this.activePage.pageKey == event.pageKey) {
					return;
				}
				
				let targetPage = this.findPageByKey(event.pageKey);
				this.doNavigation(targetPage);
			}
		);
	}

	get onFirstPage() {
		return this.activePage.staticIndex == 0;
	}

	get onLastPage() {
		return this.activePage.staticIndex == this.pages.length - 1;
	}

	addDamage() {
		this.report.damages.unshift(new Damage());
	}

	removeDamage(index) {
		this.fadeAndRemoveFromArray(
				this.report.damages, 
				index, 
				`#damage-${index}`
			);
	}

	addWitness() {
		this.report.witnesses.unshift(new Witness());
	}

	removeWitness(index) {
		this.fadeAndRemoveFromArray(
				this.report.witnesses, 
				index, 
				`#witness-${index}`
			);
	}

	addSuspect() {
		this.report.suspects.unshift(new Suspect());
	}

	removeSuspect(index) {
		this.fadeAndRemoveFromArray(
				this.report.suspects, 
				index, 
				`#suspect-${index}`
			);
	}

	fadeAndRemoveFromArray(fromArray, index, selector) {
		let element = this.formArea.querySelector(selector);

		$(element).fadeOut(this.fadeOutDuration, function() {
			fromArray.splice(index, 1);
		});
	}


	doNavigation(targetPage) {
		if (this.onThresholdPage()) {
			// on active page
			this.navigateFromThreshold(targetPage);
		} else {
			// navigation in visited section
			this.navigateFromVisited(targetPage);
		}
	}

	purgeAggregates() {
		[
		 this.report.damages, 
		 this.report.suspects, 
		 this.report.witnesses
		].forEach(array => clearEmptyObjectsInArr(array));
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
		this.purgeAggregates();
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

function clearEmptyObjectsInArr(array) {
	let removeIndexes = [];
	
	array.forEach((obj, index) => {
		if (Object.values(obj).every(value => !value && !value.trim())) {
			removeIndexes.push(index);
		}
	});
	
	removeIndexes.forEach(index => array.splice(index, 1));
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