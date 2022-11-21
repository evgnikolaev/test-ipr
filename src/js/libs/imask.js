import IMask from 'imask';

export default {
	init() {
		const elements = document.querySelectorAll('[data-mask-tel]');

		const maskOptions = {
			mask: [
				{
					mask: '+{7} 000 000-00-00',
					lazy: true,
				},
			],
		};

		elements.forEach((el) => {
			if (el.hasAttribute('data-initialized-mask')) return;
			let maskInstance = IMask(el, maskOptions);
			el.setAttribute('data-initialized-mask', '');
		});
	},
};
