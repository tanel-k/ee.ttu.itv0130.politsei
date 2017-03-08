import {bindable, bindingMode, inject} from 'aurelia-framework';

import 'jquery';
import selectize from 'selectize';

@inject(Element)
export class EnhancedSelect {
	@bindable({ defaultBindingMode: bindingMode.oneWay }) guid = '';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) values;
	@bindable({ defaultBindingMode: bindingMode.twoWay }) value;

	constructor(element) {
		this.element = element;
	}

	attached() {
		this.selector = $(this.element).find('select')
			.selectize({
				// allowEmptyOption: true
			});
	}
	
	detached() {
		
	}
}