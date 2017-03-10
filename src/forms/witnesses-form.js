import {CollectionForm} from 'collection-form';
import {Witness} from '../models';

export class WitnessesForm extends CollectionForm {
	activate(report) {
		super.activate(report, report.witnesses, Witness);
	}
}