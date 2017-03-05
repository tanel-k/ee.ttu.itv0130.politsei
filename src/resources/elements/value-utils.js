export function trimNonNumbers(value) {
	if (!value)
		return '';
	return value.replace(/\D/g, '');
}