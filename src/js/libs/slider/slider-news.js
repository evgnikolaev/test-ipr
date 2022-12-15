import Slider from './constructor';

export default {
	init() {
		const slider = new Slider({
			init: true,
			wrap: '[data-slider-news]',
			slider: '[data-slider]',
			options: {
				slidesPerView: 1,
				speed: 800,
				a11y: false,
				loop: false,
				observer: true,
				observeParents: true,
				simulateTouch: true,
				breakpoints: {
					[window.breakpoints.lg]: {
						slidesPerView: 4,
					},
					[window.breakpoints.md]: {
						slidesPerView: 2,
					},
				},
			},
		});
	},
};
