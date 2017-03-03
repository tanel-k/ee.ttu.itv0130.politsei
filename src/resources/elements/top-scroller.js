import {customElement, inject} from 'aurelia-framework';
import 'jquery';

@customElement('top-scroller')
@inject(Element)
export class TopScroller {
	constructor(element) {
		this.element = element;
	}

	attached() {
		let wrapper = this.element.querySelector('.scroll-top-wrapper');
		
		document.addEventListener('scroll', function() {
			if ($(window).scrollTop() > 100) {
				wrapper.classList.add('show');
			} else {
				wrapper.classList.remove('show');
			}
		});
		
		wrapper.addEventListener('click', this.scrollToTop);
	}

	scrollToTop(e) {
		$('html, body').animate({ scrollTop: 0 }, 500, 'linear');
	}

	detached() {
		
	}
}