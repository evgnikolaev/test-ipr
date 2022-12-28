import Slider from './constructor';

export default {
	init() {
		// слайдер на мобильных устройствах
		const sliderMobile = new Slider({
			init: true,
			wrap: '[data-slider-persons]',
			slider: '[data-slider]',
			prev: '[data-nav-arrow-prev]',
			next: '[data-nav-arrow-next]',
			options: {
				slidesPerView: 1,
				speed: 800,
				a11y: false,
				loop: false,
				observer: true,
				observeParents: true,
				simulateTouch: true,
				breakpoints: {
					[window.breakpoints.md]: {
						slidesPerView: 2,
					},
				},
			},
		});

		// слайдер в модалке
		const sliderModal = new Slider({
			init: true,
			wrap: '[data-modal-slider-persons]',
			slider: '[data-slider]',
			prev: '[data-nav-arrow-prev]',
			next: '[data-nav-arrow-next]',
			options: {
				slidesPerView: 1,
				speed: 800,
				a11y: false,
				loop: false,
				observer: true,
				observeParents: true,
				simulateTouch: true,
			},
		});

		window.addEventListener('sliderModal:slideTo', (e) => {
			if (e.detail.counter) {
				sliderModal.swiper.slideTo(e.detail.counter, false);
			}
		});
	},
};
