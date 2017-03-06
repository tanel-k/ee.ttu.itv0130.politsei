export function configure(config) {
	config.globalResources([
		'./elements/top-scroller',
		'./elements/progress-tracker',
		'./elements/currency-field',
		'./elements/date-picker',
		'./value-converters/trim'
	]);
}
