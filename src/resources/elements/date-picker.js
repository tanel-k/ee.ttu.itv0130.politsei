import {bindable, bindingMode, inject} from 'aurelia-framework';

import 'jquery';
import 'jquery-ui';
// import { datepicker } from 'jquery-ui-datepicker';

@inject(Element)
export class DatePicker {
	@bindable guid = '';
	@bindable options = {};

	constructor(Element) {
		this.element = Element;
	}

	attached() {
		console.log($);
		console.log($.ui);
		
		$(`#${this.guid}`).datepicker({});
		/*
			.on('change', e => {
				let changeEvent = new CustomEvent('input', {
					detail: {
						value: e.val
					},
					bubbles: true
				});

				this.element.dispatchEvent(changeEvent);
			});
		*/
	}

	detached() {
		$(`#${this.guid}`).datepicker('destroy').off('change');
	}
}