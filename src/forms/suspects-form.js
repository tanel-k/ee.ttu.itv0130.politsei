import {CollectionForm} from 'collection-form';
import {Suspect} from '../models';

export class SuspectsForm extends CollectionForm {
	activate(report) {
		super.activate(report, report.suspects, Suspect);
	}
}