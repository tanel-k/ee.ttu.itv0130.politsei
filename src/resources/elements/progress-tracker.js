import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export var progressState = {
	'threshold': 'threshold',
	'unvisited': 'new',
	'visited': 'completed',
	'current': 'active'
};

export class TrackerClickedEvent {
	constructor(pageKey) {
		this.pageKey = pageKey;
	}
}

@inject(EventAggregator)
export class ProgressTracker {
	@bindable pages = [];

	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
	}

	trackerClick(pageKey) {
		let targetPage = this.pages.find(page => page.pageKey == pageKey);
		if (targetPage && targetPage.progressState != progressState.unvisited) {
			this.eventAggregator.publish(new TrackerClickedEvent(pageKey));
		}
	}
}

