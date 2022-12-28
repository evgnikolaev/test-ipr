import 'magnific-popup/dist/jquery.magnific-popup.min';
import { disableScroll, enableScroll } from '../../utils/scroll';

export default function modalInit() {
	const modal = document.querySelectorAll('[data-modal]');
	if (!modal.length) return;

	modal.forEach((el) => {
		const $el = $(el);
		const delay = el.getAttribute('data-delay') || 800;

		$el.magnificPopup({
			preloader: false,
			removalDelay: delay,
			overflowY: 'hidden',
			closeBtnInside: false,
			callbacks: {
				beforeOpen() {
					console.log('before');

					if (el.hasAttribute('data-modal-persons')) {
						const modalCounter = el.getAttribute(
							'data-modal-counter'
						);
						if (modalCounter) {
							window.dispatchEvent(
								new CustomEvent('sliderModal:slideTo', {
									detail: { counter: modalCounter },
								})
							);
						}
					}
				},
				open() {
					console.log('openclick');
					disableScroll();
				},
				close() {
					console.log('closeclick');
					enableScroll();
				},
			},
		});
	});

	$('.popup__close, [data-modal-close], .mfp-close').click(function (e) {
		e.preventDefault();
		$.magnificPopup.close();
	});
}

document.addEventListener('DOMContentLoaded', () => {
	modalInit();
});
