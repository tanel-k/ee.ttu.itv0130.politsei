import {BaseForm} from 'base-form';
import {inject} from 'aurelia-framework';
import {ChangePageMessage} from 'report-form';
import {EventAggregator} from 'aurelia-event-aggregator';
import 'jquery';

@inject(EventAggregator)
export class SubmissionForm extends BaseForm {
	constructor(eventAggregator) {
		super();
		this.eventAggregator = eventAggregator;
	}
	
	attached() {
		$('*[data-toggle=popover]').popover();
	}
	
	isNonEmpty(v) {
		return isNonEmptyString(v);
	}
	
	defaultValue(value, valueIfEmpty='—') {
		if (!isNonEmptyString(value)) {
			return valueIfEmpty;
		}
		
		return value;
	}
	
	changePage(pageKey) {
		this.eventAggregator.publish(new ChangePageMessage(pageKey));
	}
}

function isNonEmptyString(str) {
	return str && str.trim();
}