import gsap from 'gsap';
import { throttle } from 'throttle-debounce';

export default {
	init() {
		const header = document.querySelector('.header');
		if (!header) return;

		const triggers = header.querySelectorAll('[data-submenu-trigger]');
		for (let i = 0; i < triggers.length; i++) {
			const items = triggers[i].querySelectorAll('[data-submenu-item]');
			const timeline = gsap.timeline({
				paused: true,
			});

			timeline.fromTo(items, {
				translateY: 20,
				opacity: 0,
			}, {
				stagger: 0.1,
				translateY: 0,
				opacity: 1,
				duration: 0.2,
				ease: 'power1.out',
				delay: 0.35,
			});

			timeline.eventCallback('onStart', () => {
				header.classList.add('in-transition');
			});

			timeline.eventCallback('onReverseComplete', () => {
				header.classList.remove('in-transition');
			});

			triggers[i].addEventListener('mouseenter', throttle(100, () => {
				timeline.play();
				header.classList.add('submenu-opened');
				triggers[i].classList.add('active');
			}));

			triggers[i].addEventListener('mouseleave', throttle(100, () => {
				timeline.reverse();
				header.classList.remove('submenu-opened');
				triggers[i].classList.remove('active');
			}));
		}
	},
};
