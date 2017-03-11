import {bindable, bindingMode, inject} from 'aurelia-framework';

import 'jquery';
import 'inputmask';
import 'bootstrap';
import 'bootstrap-datepicker';
import 'bootstrap-datepicker-i18n-et';
import {applyGlow, removeGlow} from './glow-fx';

@inject(Element)
export class Datepicker {
	@bindable({ defaultBindingMode: bindingMode.twoWay }) value;
	
	@bindable({ defaultBindingMode: bindingMode.oneWay }) guid = '';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) title = '';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) format = 'dd.mm.yyyy';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) start;

	constructor(element) {
		this.element = element;
		overwriteInputmaskEETPlaceholder();
	}

	attached() {
		let defaults = {
				format: this.format,
				language: "et",
				clearBtn: true,
				title: this.title,
				endDate: new Date(),
				autoclose: true,
				forceParse: false,
				showOnFocus: false,
				keyboardNavigation: false,
				startView: this.start 
					? this.start 
					: 'day'
			};
		
		let _this = this;
		this.button = this.element.querySelector('.btn');
		this.input = this.element.querySelector('input');
		
		$(this.input).inputmask(this.format);
		
		this.datepicker = $(this.input)
			.datepicker(defaults)
			.on('focus', e => applyGlow(this.button))
			.on('focusout', e => removeGlow(this.button))
			.on('change', e => {
				_this.value = e.target.value;
			})
			.on('changeDate', e => {
				// _this.datepicker.hide();
			})
			.data('datepicker');
	}

	show() {
		this.datepicker.show();
	}

	detached() {
		$(this.input).inputmask('remove');
		$(this.input).datepicker('destroy').off();
	}
}

function overwriteInputmaskEETPlaceholder() {
	Inputmask.extendAliases({'dd.mm.yyyy': {
		mask: "1.2.y",
		placeholder: "pp.kk.aaaa",
		leapday: "29.02.",
		separator: ".",
		alias: "dd/mm/yyyy"
	}});
}