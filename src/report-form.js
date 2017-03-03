import {inject} from 'aurelia-framework';
import {Report} from './models';
import {progressState, TrackerClickedEvent} from './resources/elements/progress-tracker';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ReportForm {
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
		this.report = new Report();
		
		this.pages = [
			{ pageKey: 'instructions-form', name: 'Juhend' },
			{ pageKey: 'event-form', name: 'Sündmus' },
			{ pageKey: 'reporter-form', name: 'Isikuandmed' },
			{ pageKey: 'reporter-contact-form', name: 'Kontaktandmed' },
			{ pageKey: 'damages-form', name: 'Varaline kahju' },
			{ pageKey: 'suspects-form', name: 'Süüdistatavad' },
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
		
		if (backNav || isPageValid) {	
			if (backNav) {
				// back to visited page
				this.activePage.progressState = progressState.threshold;
			} else {
				// next pressed && valid
				this.activePage.progressState = progressState.visited;
				this.thresholdPage = targetPage;
				
			}
			
			targetPage.progressState = progressState.current;
			this.activePage = targetPage;
		}
	}

	navigateFromVisited(targetPage) {
		let isPageValid = true;
		
		if (isPageValid) {
			this.activePage.progressState = progressState.visited;
			targetPage.progressState = progressState.current;
			this.activePage = targetPage;
		}
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
			console.log(targetPage);
			this.doNavigation(targetPage);
		}
	}

	previousPage() {
		if (this.hasPreviousPage) {
			let targetPage = this.findPageByIndex(this.activePage.staticIndex - 1);
			console.log(targetPage);
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