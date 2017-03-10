import {BaseForm} from 'base-form';
import 'jquery';

export class CollectionForm extends BaseForm {
	fadeInDuration = 500;
	fadeOutDuration = 500;

	activate(report, sourceArray, ItemClass) {
		let initialId = 1;
		this.generateId = function() {
			return initialId++;
		};
		
		this.report = report;
		this.array = new Array();
		this.wrapItems(sourceArray, this.array);
		this.sourceArray = sourceArray;
		this.ItemClass = ItemClass;
	}

	attached() {
		super.attached();
		this.formArea = document.body.querySelector('.form-area');
		
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
		this.sourceArray.splice(0);
		this.unwrapItems(this.array, this.sourceArray);
	}

	addItem() {
		this.array.unshift({
			id: this.generateId(),
			isActive: true,
			item: new this.ItemClass()
		});
	}

	deactivateItem(container) {
		this.fadeAndRemove(container);
	}

	activateItem(container) {
		container.isActive = true;
	}
	
	destroyItem(container) {
		let index = this.array.findIndex(ctr => ctr.id == container.id);
		this.array.splice(index, 1);
	}

	wrapItems(fromArray, toArray) {
		fromArray.splice(0).forEach((item, index) => {
			toArray.push({
				id: this.generateId(),
				isActive: true,
				item: item
			});
		});
	}

	unwrapItems(fromArray, toArray) {
		fromArray.forEach((container, index) => {
			if (container.isActive && isNonEmptyObject(container.item)) {
				alert('good!');
				console.log(container.item);
				console.log(this.ItemClass);
				toArray.push(container.item);
			}
		});
	}

	fadeAndRemove(container) {
		let element = this.formArea.querySelector(`#item-${container.id}`);

		$(element).fadeOut(this.fadeOutDuration, function() {
			container.isActive = false;
		});
	}
}

// BROKEN
function isNonEmptyObject(o) {
	return Object.getOwnPropertyNames(o).every(name => o[name]);
	// return o && Object.values(o).every(value => !value && !value.trim());
}