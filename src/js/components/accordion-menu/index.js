import gsap from 'gsap';

export default {
	init() {
		const accordions = document.querySelectorAll('[data-accordion-menu]');
		const timelines = [];
		for (let i = 0; i < accordions.length; i++) {
			const toggle = accordions[i].querySelector('[data-toggle]');
			if (!toggle) continue;

			const content = accordions[i].querySelector('[data-content]');
			if (!content) continue;

			const timeline = gsap.timeline({
				paused: true,
			});

			let height = content.clientHeight || 'auto';

			timeline.fromTo(
				content,
				{
					height: 0,
				},
				{
					height,
					duration: 0.4,
					ease: 'power1.out',
					onComplete: () => {
						height = content.clientHeight || 'auto';
						timeline.invalidate();
					},
					onReverseComplete: () => {
						timeline.invalidate();
					},
				}
			);

			timelines.push(timeline);

			toggle.addEventListener('click', () => {
				accordions[i].classList.add('active');
				timeline.play();

				if (!toggle.hasAttribute('data-sub-toggle')) {
					timelines.forEach((t, idx) => {
						if (idx !== i) {
							if (
								accordions[idx].closest(
									'[data-accordion-menu-parent]'
								) !== accordions[i]
							) {
								accordions[idx].classList.remove('active');
								t.reverse();
							}
						}
					});
				}
			});
		}
	},
};
