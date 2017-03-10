import {bindable, bindingMode, inject} from 'aurelia-framework';
import 'jquery';

@inject(Element)
export class ConfirmButton {
	@bindable({ defaultBindingMode: bindingMode.oneWay }) icon = 'cross';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) classes = '';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) placement = 'top';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) ok = 'Yes';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) cancel = 'No';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) content = '';
	@bindable({ defaultBindingMode: bindingMode.oneWay }) title = 'Are you sure?';
	
	@bindable action;
	
	constructor(element) {
		this.element = element;
	}

	attached() {
		this.selector = $(this.element).find('button')
			.confirmation({
				
			});
	}
	
	detached() {
		
	}
}