export class TrimValueConverter {
	toView(value) {
		if (!value)
			return value;
		
		return value.trim();
	}
}