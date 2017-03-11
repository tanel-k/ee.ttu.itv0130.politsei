let glowClass = 'is-glowing';

export function applyGlow(element) {
	if (!elementIsGlowing(element)) {
		element.classList.add(glowClass);
	}
}

export function removeGlow(element) {
	if (elementIsGlowing(element)) {
		element.classList.remove(glowClass);
	}
}

function elementIsGlowing(element) {
	return element && element.classList.contains(glowClass);
}