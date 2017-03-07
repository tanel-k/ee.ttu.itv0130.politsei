import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import 'jquery';

@inject(EventAggregator)
export class BaseForm {
	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
	}
	
	activate(report) {
		this.report = report;
	}
	
	attached() {
		// scrollToTop();
		this.eventAggregator.publish(new FormAttachedEvent());
		yieldFocus();
	}

	detached() {
		this.eventAggregator.publish(new FormDetachedEvent());
	}
}

export function scrollToTop() {
	$('html, body').animate({ scrollTop: 0 }, 100, 'linear');
}

export function yieldFocus() {
	let focusNode = document.body.querySelector('*[steal-focus]');
	if (focusNode) {
		if (focusNode.getAttribute('steal-focus')) {
			focusNode = focusNode.querySelector(focusNode.getAttribute('steal-focus'));
		}
		
		$(focusNode).focus();
	}
}

export class FormAttachedEvent {
	
}

export class FormDetachedEvent {
	
}