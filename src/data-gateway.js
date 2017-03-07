import {inject} from 'aurelia-framework';
import {HttpClient, json} from 'aurelia-fetch-client';
import environment from './environment';

@inject(HttpClient)
export class DataGateway {
	constructor(httpClient) {
		this.httpClient = httpClient.configure(config => {
				config.useStandardConfiguration();
			});
	}

	getCountries() {
		return this.httpClient.fetch('data/countries.json')
			.then(response => response.json())
	}

	getNationalities() {
		return this.httpClient.fetch('data/nationalities.json')
			.then(response => response.json());
	}

	getMunicipalities() {
		return this.httpClient.fetch('data/municipalities.json')
			.then(response => response.json());
	}
}