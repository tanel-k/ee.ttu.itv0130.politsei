import {bindable, bindingMode, inject} from 'aurelia-framework';

import 'jquery';
import 'inputmask';
import {applyGlow, removeGlow} from './glow-fx';

@inject(Element)
export class Timepicker {
	@bindable guid = '';
	@bindable({ defaultBindingMode: bindingMode.twoWay }) value;
	
	@bindable({ defaultBindingMode: bindingMode.oneWay }) format = 'hh:mm';

	constructor(element) {
		this.element = element;
	}

	attached() {
		let _this = this;
		this.input = this.element.querySelector('input');
		this.button = this.element.querySelector('.btn');
		
		let defaults = {
			// autoClose: false,
			// appendActions: true,
			okText: 'Vali',
			cancelText: 'Tühista',
			position: 'top',
			alignment: 'left',
			format: '24h'
		};
		
		this.clockpicker = $(this.input)
			.jqclockpicker(defaults)
			.on('change', (e) => {
				_this.value = e.target.value;
			})
			.data('jqclockpicker');
		
		$(this.input).off('focus.jqclockpicker click.jqclockpicker blur');
		
		$(this.input)
			.on('focus', e => applyGlow(this.button))
			.on('focusout', e => removeGlow(this.button))
			.inputmask(this.format);
	}
	
	show() {
		$(this.input).focus();
		this.clockpicker.show();
	}

	detached() {
		this.clockpicker.remove();
	}
}