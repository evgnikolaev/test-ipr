import 'parsleyjs';
import './parsley-ru';

export default {
	init() {
		const $forms = $('[data-parsley-validate]');
		$forms.each((index, form) => {
			const $form = $(form);
			$form.parsley();
			window.Parsley.setLocale('rus');
		});
	},
};
