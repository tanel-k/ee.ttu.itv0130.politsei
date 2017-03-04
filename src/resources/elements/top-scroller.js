import {customElement, inject, bindable} from 'aurelia-framework';
import 'jquery';

// @customElement('top-scroller')
@inject(Element)
export class TopScroller {
	@bindable scrollDuration = 100;
	@bindable appearBound = 100;

	constructor(element) {
		this.element = element;
	}

	attached() {
		let wrapper = this.element.querySelector('.scroll-top-wrapper');
		let appearBound = this.appearBound;
		
		document.addEventListener('scroll', function() {
			if ($(window).scrollTop() > appearBound) {
				wrapper.classList.add('show');
			} else {
				wrapper.classList.remove('show');
			}
		});
		
		wrapper.addEventListener('click', this.scrollToTop);
	}

	scrollToTop(e) {
		$('html, body').animate({ scrollTop: 0 }, this.scrollDuration, 'linear');
	}

	detached() {
		
	}
}