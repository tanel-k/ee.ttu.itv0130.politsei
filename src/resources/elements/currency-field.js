import {bindable, bindingMode, inject} from 'aurelia-framework';

@inject(Element)
export class CurrencyField {
	@bindable({ defaultBindingMode: bindingMode.twoWay }) value;
	@bindable guid = '';
	
	constructor(element) {
		this.element = element;
	}

	attached() {
		this.input = this.element.firstChild;
		this.element.addEventListener('keydown', blockInvalidKey);
	}

	detached() {
		this.element.removeEventListener('keydown', blockInvalidKey);
	}

	blur() {
		if (this.value) {
			let tempValue = this.value.replace(',', '.');
			if (tempValue.match(/^-?\d*(\.\d+)?$/)) {
				let parsedValue = parseFloat(tempValue);
				if (!isNaN(parsedValue)) {
					this.value = parsedValue;
				}
			}
		}
	}
}

function blockInvalidKey(event) {
	if (!isNonInputKeyEvent(event) && isNonFloatKeyEvent(event) ) {
		event.preventDefault();
	}
}

function isNonInputKeyEvent(e) {
  // Allow: backspace, delete, tab, escape, enter and .
	return ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 
	 // Allow: Ctrl+A/X/C/V/Z/Y, Command+A/X/C/V/Z/Y
	|| ([65, 67, 86, 88, 89, 90].indexOf(e.keyCode) !== -1 && (e.ctrlKey === true || e.metaKey === true)) 
	// Allow: home, end, left, right, down, up
	|| (e.keyCode >= 35 && e.keyCode <= 40));
}

function isNonFloatKeyEvent(e) {
	return (e.shiftKey 
			|| (e.keyCode < 48 || e.keyCode > 57))
		&& (e.keyCode < 96 || e.keyCode > 105)
		&& (e.keyCode != 188 && e.keyCode != 190);
}