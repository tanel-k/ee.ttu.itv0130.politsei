import {BaseForm} from 'base-form';
import 'jquery';

export class AggregationForm extends BaseForm {
	fadeInDuration = 500;

	activate(report) {
		this.report = report;
	}

	attached() {
		super.attached();
		let fadeInDuration = this.fadeInDuration;
		this.wrapper = document.querySelector('.agg-wrapper');
		
		this.removablePanelObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				if (!mutation.addedNodes) return;
				
				for (var i=0; i<mutation.addedNodes.length; i++) {
					let node = mutation.addedNodes[i];
					
					if (node.classList 
						&& node.classList.contains('removable-panel')) {
						// shitty fade-in workaround
						$(node).fadeOut(0);
						$(node).fadeIn(fadeInDuration);
					}
				}

				
			});
		});
		
		this.removablePanelObserver.observe(this.wrapper, {
			childList: true, 
			subtree: true, 
			attributes: false, 
			characterData: false
		});
	}
	
	detached() {
		this.removablePanelObserver.disconnect();
	}
}