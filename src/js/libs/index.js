import Validation from './validation';
import Mask from './imask';
import Counter from './counter';
import Sal from './sal';
import Select from './select';
import Lazyload from './lazyload';

document.addEventListener('DOMContentLoaded', () => {
	Validation.init();
	Mask.init();
	// Counter.init();
	Sal.init();
	Select.init();
	Lazyload.init();
});

window.addEventListener('init.validation', () => {
	Validation.init();
});

window.addEventListener('init.mask', () => {
	Mask.init();
});
