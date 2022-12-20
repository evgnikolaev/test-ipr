import Plyr from 'plyr';

export default {
	init() {
		const videos = document.querySelectorAll('[data-player-video]');
		if (!videos) return;
		videos.forEach((el) => {
			const parent = el.closest('.video');
			if (parent && parent.classList.contains('init')) return;

			const poster =
				el.getAttribute('poster') || el.getAttribute('data-poster');

			const player = new Plyr(el, {
				ratio: '16:9',
				poster: poster || false,
				fullscreen: {
					iosNative: true,
				},
			});

			if (parent) {
				parent.classList.add('init');
			}

			const trigger = parent.querySelector('.plyr__poster');

			if (trigger) {
				trigger.addEventListener('click', () => {
					player.play();
				});
			}
		});
	},
};
