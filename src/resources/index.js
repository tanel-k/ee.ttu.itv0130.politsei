export function configure(config) {
	config.globalResources([
		'./elements/top-scroller',
		'./elements/progress-tracker',
		'./elements/currency-field',
		'./elements/year-field',
		'./value-converters/trim'
	]);
}
