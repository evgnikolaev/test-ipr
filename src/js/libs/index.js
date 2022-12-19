import Validation from './validation';
import Mask from './imask';
import Counter from './counter';
import Sal from './sal';
import Select from './select';
import Sliders from './slider';
import Lazyload from './lazyload';
import Plur from './plyr';

document.addEventListener('DOMContentLoaded', () => {
	Validation.init();
	Mask.init();
	// Counter.init();
	Sal.init();
	Select.init();
	Sliders.init();
	Lazyload.init();
	Plur.init();
});

window.addEventListener('init.validation', () => {
	Validation.init();
});

window.addEventListener('init.mask', () => {
	Mask.init();
});
