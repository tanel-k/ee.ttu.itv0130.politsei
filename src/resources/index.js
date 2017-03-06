export function configure(config) {
	config.globalResources([
		'./elements/top-scroller',
		'./elements/progress-tracker',
		'./elements/currency-field',
		'./elements/datepicker',
		'./elements/timepicker',
		'./value-converters/trim'
	]);
}
