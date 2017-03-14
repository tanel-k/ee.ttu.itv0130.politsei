import {bindable, bindingMode, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export var progressState = {
	'threshold': 'threshold',
	'unvisited': 'new',
	'visited': 'completed',
	'current': 'active'
};

export class TrackerPageRequestEvent {
	constructor(pageKey) {
		this.pageKey = pageKey;
	}
}

export class TrackerExternalChangeEvent {
	constructor(changes) {
		this.changes = changes;
	}
}

class PageProxy {
	constructor(source) {
		this.pageKey = source.pageKey;
		this.progressState = source.progressState;
		this.name = source.name;
	}
}

@inject(EventAggregator)
export class ProgressTracker {
	@bindable({ defaultBindingMode: bindingMode.oneTime }) pages = [];
	
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
		this.eventAggregator.subscribe(TrackerExternalChangeEvent, event => {
			if (event.changes) {
				for (let pageKey in event.changes) {
					let page = this.pageCache.find(page => page.pageKey == pageKey);
					if (page) {
						page.progressState = event.changes[pageKey];
					}
				}
			}
		});
	}
	
	attached() {
		this.pageCache = this.pages.map(page => new PageProxy(page));
	}
	
	trackerClick(pageKey) {
		let targetPage = this.pageCache.find(page => page.pageKey == pageKey);
		if (targetPage && targetPage.progressState != progressState.unvisited) {
			this.eventAggregator.publish(new TrackerPageRequestEvent(pageKey));
		}
	}
}

