import Slider from './constructor';

export default {
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-main-hero]',
			slider: '[data-slider]',
			paginationSelector: '.swiper-pagination',
			options: {
				slidesPerView: 1,
				speed: 800,
				a11y: false,
				loop: false,
				observer: true,
				observeParents: true,
				allowTouchMove: false,
				effect: 'fade',
				fadeEffect: {
					crossFade: true,
				},
				lazy: {
					loadPrevNext: true,
					checkInView: true,
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					bulletElement: 'button',
				},
			},
		});
	},
};
