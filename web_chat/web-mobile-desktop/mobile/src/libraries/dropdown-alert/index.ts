import DropdownManager from './dropdown-manager';
import { capitalizeFirstLetter } from 'helpers/utils';
export const TYPE = {
	SUCCESS: 'success',
	INFO: 'info',
	WARN: 'warn',
	ERROR: 'error',
};

export function showAlert(type: string, title: string, description?: string) {
	const ref = DropdownManager.getDefault();
	if (!!ref) {
		ref.alertWithType(type,title, capitalizeFirstLetter(description || ''));
	}
}

export function hideAlert() {
	const ref = DropdownManager.getDefault();

	if (!!ref) {
		ref.closeAction();
	}
}
