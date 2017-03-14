import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-framework';
import 'jquery';

@inject(Element, EventAggregator)
export class BaseForm {
	scrollDuration = 500;
	
	constructor(element, eventAggregator) {
		this.element = element;
		this.eventAggregator = eventAggregator;
	}
	
	activate(report) {
		this.report = report;
	}
	
	attached() {
		this.eventAggregator.publish(new FormAttachedEvent());
		if (document.body.querySelectorAll('.has-error').length === 0) {
			// anti-pattern :C
			scrollToTop(0, yieldFocus);
		}
	}

	detached() {
		this.eventAggregator.publish(new FormDetachedEvent());
	}
}

export function scrollToTop(duration, complete) {
	$('html, body').animate(
		{ scrollTop: 0 }, 
		duration, 
		'linear', 
		complete);
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