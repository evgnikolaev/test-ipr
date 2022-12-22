import 'magnific-popup/dist/jquery.magnific-popup.min';
import Plyr from 'plyr';
import { disableScroll, enableScroll } from '../../utils/scroll';

const closeHandler = () => {
	$.magnificPopup.close();
};

export default {
	init() {
		const modal = document.querySelectorAll('[data-modal-video]');
		if (!modal.length) return;
		const playerWrapper = document.querySelector('[data-modal-player]');
		if (!playerWrapper) return;

		const frame = playerWrapper.querySelector('[data-frame]');
		if (!frame) return;

		let p;

		modal.forEach((el) => {
			const $el = $(el);

			$el.magnificPopup({
				preloader: false,
				removalDelay: 0,
				overflowY: 'hidden',
				closeBtnInside: false,
				fixedContentPos: true,
				callbacks: {
					beforeOpen() {
						window.dispatchEvent(new CustomEvent('player:pause'));

						const posterSrc = el.getAttribute('data-modal-poster') || '';
						const provider = el.getAttribute('data-provider');
						const source = el.getAttribute('data-modal-src');
						const type = el.getAttribute('data-modal-type');

						if (provider) {
							const initNode = document.createElement('div');
							initNode.classList.add('modal-player__init');

							if (posterSrc) {
								initNode.setAttribute('data-poster', posterSrc);
							}
							frame.prepend(initNode);
							initNode.setAttribute('data-plyr-embed-id', source);
							initNode.setAttribute('data-plyr-provider', provider);

							p = new Plyr(initNode, {
								ratio: '16:9',
								hideControls: false,
								autoplay: true,
								playsinline: true,
								clickToPlay: true,
							});
						}
					},
					open() {
						document.documentElement.classList.add('modal-opened');
						disableScroll();

						const closeBtn = this.container[0].querySelectorAll('[data-modal-close]');
						closeBtn.forEach((button) => {
							button.addEventListener('click', closeHandler);
						});

						p.on('play', () => {
							playerWrapper.classList.add('is-active');
						});

						p.on('ready', () => {
							if (!window.isIos) {
								p.play();
							}
						});

						playerWrapper.addEventListener('player:pause', () => {
							p.pause();
						});
					},
					close() {
						document.documentElement.classList.remove('modal-opened');
						enableScroll();

						p.destroy();

						const initNode = frame.querySelector('[data-modal-init]');
						if (initNode) {
							initNode.remove();
						}

						const closeBtn = this.container[0].querySelectorAll('[data-modal-close]');
						closeBtn.forEach((button) => {
							button.removeEventListener('click', closeHandler);
						});
					},
					afterClose() {
						frame.textContent = '';
					},
				},
			});
		});
	},
};
