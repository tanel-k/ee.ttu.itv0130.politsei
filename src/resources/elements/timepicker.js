import {bindable, bindingMode, inject} from 'aurelia-framework';

import 'jquery';

@inject(Element)
export class Timepicker {
	@bindable guid = '';
	@bindable({ defaultBindingMode: bindingMode.twoWay }) value;

	constructor(element) {
		this.element = element;
	}

	attached() {
		let _this = this;
		this.input = this.element.querySelector('input');
		
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
		
		$(this.input).off('focus.jqclockpicker click.jqclockpicker');
	}
	
	show() {
		console.log(this.input);
		$(this.input).focus();
		this.clockpicker.show();
	}

	detached() {
		this.clockpicker.remove();
	}
}