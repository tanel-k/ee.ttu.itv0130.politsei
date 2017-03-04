import {inject, bindable, NewInstance} from 'aurelia-framework';
import {Report} from './models';
import {progressState, TrackerClickedEvent} from './resources/elements/progress-tracker';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import 'jquery';

@inject(EventAggregator, NewInstance.of(ValidationController))
export class ReportForm {
	constructor(eventAggregator, validationController) {
		this.eventAggregator = eventAggregator;
		validationController.validateTrigger = validateTrigger.changeOrBlur;
		this.validationController = validationController;
		this.report = new Report();
		
		this.pages = [
			{ pageKey: 'instructions-form.html', name: 'Juhend' },
			{ pageKey: 'event-form.html', name: 'Sündmus' },
			{ pageKey: 'reporter-form.html', name: 'Isikuandmed' },
			{ pageKey: 'reporter-contact-form.html', name: 'Kontaktandmed' },
			{ pageKey: 'damages-form.html', name: 'Varaline kahju' },
			{ pageKey: 'suspects-form.html', name: 'Süüdistatavad' },
			{ pageKey: 'witnesses-form.html', name: 'Tunnistajad' },
			{ pageKey: 'submission-form.html', name: 'Esitamine' }
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

	activate() {
		this.eventAggregator.subscribe(TrackerClickedEvent,
			event => {
				if (this.activePage.pageKey == event.pageKey)
					return;
				
				let targetPage = this.findPageByKey(event.pageKey);
				this.doNavigation(targetPage);
				
			}
		);
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

	navigateFromThreshold(targetPage) {
		let isPageValid = true;
		let backNav = targetPage.staticIndex < this.thresholdPage.staticIndex;
		
		if (backNav) {
			this.activePage.progressState = progressState.threshold;
			this.navigateToPage(targetPage);
			return;
		}
		
		this.validationController.validate().then(result => {
			if (result.valid) {
				this.thresholdPage = targetPage;
				this.activePage.progressState = progressState.visited;
				this.navigateToPage(targetPage);
			}
		});
	}

	navigateFromVisited(targetPage) {
		this.validationController.validate().then(result => {
			if (result.valid) {
				this.activePage.progressState = progressState.visited;
				this.navigateToPage(targetPage);
			}
		});
	}

	navigateToPage(targetPage) {
		targetPage.progressState = progressState.current;
		this.activePage = targetPage;
		this.scrollTop();
	}

	get hasPreviousPage() {
		return this.activePage.staticIndex > 0;
	}

	get hasNextPage() {
		return this.activePage.staticIndex < this.pages.length - 1;
	}

	get onFirstPage() {
		return this.activePage.staticIndex == 0;
	}

	get onLastPage() {
		return this.activePage.staticIndex == this.pages.length - 1;
	}

	nextPage() {
		if (this.hasNextPage) {
			let targetPage = this.findPageByIndex(this.activePage.staticIndex + 1);
			this.doNavigation(targetPage);
		}
	}

	previousPage() {
		if (this.hasPreviousPage) {
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

	scrollTop() {
		// document.body.scrollTop = 0;
		$('html, body').animate({ scrollTop: 0 }, 100, 'linear');
	}
}