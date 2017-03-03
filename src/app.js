export class App {
	configureRouter(config, router) {
		this.router = router;
		router.title = 'Politsei';
		
		config.map([
			{ route: ['', 'report'], name: 'report', moduleId: 'report-form', title: 'Avalduse esitamine' },
			{ route: 'complete', name: 'complete', moduleId: 'form-submitted', title: 'Avaldus esitatud' }
		]);
	}
}
