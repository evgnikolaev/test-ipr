import Slider from './constructor';

export default {
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-slider-cards]',
			slider: '[data-slider]',
			prev: '[data-nav-arrow-prev]',
			next: '[data-nav-arrow-next]',
			paginationSelector: '.swiper-pagination',
			options: {
				slidesPerView: 1,
				speed: 800,
				a11y: false,
				loop: false,
				observer: true,
				observeParents: true,
				simulateTouch: false,
				lazy: {
					loadPrevNext: true,
					loadPrevNextAmount: 2,
					checkInView: true,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					bulletElement: 'button',
				},
				breakpoints: {
					[window.breakpoints.lg]: {
						slidesPerView: 3,
					},
					[window.breakpoints.md]: {
						slidesPerView: 2,
					},
				}
			},
		});
	},
};
