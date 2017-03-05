import 'jquery';

export class BaseForm {
	activate(report) {
		this.report = report;
	}
	
	attached() {
		scrollToTop();
		yieldFocus();
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