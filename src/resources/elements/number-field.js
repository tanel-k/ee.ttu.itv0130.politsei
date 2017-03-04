import {bindable, bindingMode, inject} from 'aurelia-framework';

@inject(Element)
export class NumberField {
	@bindable({ defaultBindingMode: bindingMode.twoWay }) value;
	@bindable id = '';

	constructor(element) {
		this.element = element;
	}

	attached() {
		this.input = this.element.firstChild;
		this.element.addEventListener('keydown', blockNonNumericKeyDown);
	}

	detached() {
		this.element.removeEventListener('keydown', blockNonNumericKeyDown);
	}

	/*
	valueChanged() {
		// pass
	}*/

	blur() {
		this.value = trimNonNumbers(this.value);
	}
}

function trimNonNumbers(value) {
	if (!value)
		return '';
	return value.replace(/\D/g, '');
}

function blockNonNumericKeyDown(event) {
	if (!isNonInputKeyEvent(event) && isNonNumericKeyEvent(event) ) {
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

function isNonNumericKeyEvent(e) {
	return (e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) 
		&& (e.keyCode < 96 || e.keyCode > 105);
}