import Accordion from './constructor';

window.addEventListener('init.accordion', () => {
	new Accordion({
		init: true,
		wrap: '[data-accordion-row]',
		toggle: '[data-accordion-toggle]',
		activeClass: 'shown',
		roll: '[data-accordion-roll]',
		group: '[data-accordion]',
		duration: 300, // не обязательно
	});
});

window.dispatchEvent(new CustomEvent('init.accordion'));
