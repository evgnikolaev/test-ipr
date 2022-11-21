import Validation from './validation';
import Mask from './imask';

document.addEventListener('DOMContentLoaded', () => {
	Validation.init();
	Mask.init();
});

window.addEventListener('init.validation', () => {
	Validation.init();
});

window.addEventListener('init.mask', () => {
	Mask.init();
});
