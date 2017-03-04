import {inject, bindable, NewInstance} from 'aurelia-framework';
import {Report, Damage, Witness, Suspect} from './models';
import {progressState, TrackerClickedEvent} from './resources/elements/progress-tracker';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ValidationController, validateTrigger} from 'aurelia-validation';
import 'jquery';

@inject(EventAggregator, NewInstance.of(ValidationController))
export class ReportForm {
	fadeOutDuration = 300;
	fadeInDuration = 100;
	
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
			{ pageKey: 'suspects-form.html', name: 'Süüdlased' },
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

	attached() {
		this.formArea = document.body.querySelector('.form-area');
		
		
		let fadeInDuration = this.fadeInDuration;
		this.removablePanelObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (!mutation.addedNodes) return
				
				for (var i=0; i<mutation.addedNodes.length; i++) {
					let node = mutation.addedNodes[i];
					if (node.classList 
						&& node.classList.contains('removable-panel')) {
						$('html, body').animate({scrollTop: $(node).offset().top}, fadeInDuration, 'linear');
					}
				}
			});
		});
		
		this.removablePanelObserver.observe(this.formArea, {
			childList: true, 
			subtree: true, 
			attributes: false, 
			characterData: false
		});
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

	clearEmptyObjects() {
		[this.report.damages].forEach(array => this.clearEmptyObjectsInArr(array));
	}

	clearEmptyObjectsInArr(array) {
		let removeIndexes = [];
		
		array.forEach((obj, index) => {
			if (Object.values(obj).every(value => !value && !value.trim())) {
				removeIndexes.push(index);
			}
		});
		
		removeIndexes.forEach(index => array.splice(index, 1));
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
			}
		});
	}

	navigateFromVisited(targetPage) {
		this.validationController.validate().then(result => {
			if (result.valid) {
				this.activePage.progressState = progressState.visited;
				this.performNavigation(targetPage);
			}
		});
	}

	performNavigation(targetPage) {
		targetPage.progressState = progressState.current;
		this.activePage = targetPage;
		this.scrollTop();
		this.clearEmptyObjects();
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

	scrollTop() {
		$('html, body').animate({ scrollTop: 0 }, 100, 'linear');
	}
}