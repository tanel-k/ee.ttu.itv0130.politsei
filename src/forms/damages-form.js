import {CollectionForm} from 'collection-form';
import {Damage} from '../models';

export class DamagesForm extends CollectionForm {
	activate(report) {
		super.activate(report, report.damages, Damage);
	}
}