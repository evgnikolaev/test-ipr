import Validation from './validation';
import Mask from './imask';
import Counter from './counter';
import Sal from './sal';

document.addEventListener('DOMContentLoaded', () => {
	Validation.init();
	Mask.init();
	Counter.init();
	Sal.init();
});

window.addEventListener('init.validation', () => {
	Validation.init();
});

window.addEventListener('init.mask', () => {
	Mask.init();
});
