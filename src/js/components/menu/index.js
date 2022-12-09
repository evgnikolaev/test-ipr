import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { disableScroll, enableScroll } from '../../utils/scroll';

gsap.registerPlugin(ScrollTrigger);

export default class Menu {
	constructor() {
		this.header = document.querySelector('.header');
		if (!this.header) return;

		this.menuOpener = document.querySelectorAll('[data-menu-opener]');
		if (!this.menuOpener.length) return;

		this.menuOpenerAnimate = document.querySelector(
			'[data-hamburger-animate]'
		);
		if (!this.menuOpenerAnimate) return;

		this.lines = document.querySelectorAll('[data-menu-opener-lines]');
		this.cross = document.querySelectorAll('[data-menu-opener-cross]');

		this.menu = document.querySelector('[data-menu]');
		if (!this.menu) return;

		this.menuContainer = this.menu.querySelector('[data-menu-container]');
		if (!this.menuContainer) return;

		this.items = this.menu.querySelectorAll('[data-menu-item]');
		if (!this.items.length) return;

		this.actions = this.menu.querySelectorAll('[data-menu-action]');

		this.menuState = false;

		this.render();
	}

	render() {
		this.menuOpener.forEach((button) => {
			button.addEventListener('click', () => {
				if (!this.menuState) {
					this.openMenu();
				} else {
					this.closeMenu();
				}
			});
		});
		this.menuTimeline();

		this.menuCloser = this.menu.querySelector('[data-menu-close]');
		if (this.menuCloser) {
			this.menuCloser.addEventListener('click', () => {
				this.closeMenu();
			});
		}
	}

	menuTimeline() {
		this.timeline = gsap.timeline({
			paused: true,
		});

		this.hamburgerTimeline = gsap.timeline({
			paused: true,
		});

		this.hamburgerTimeline.fromTo(
			this.menuOpenerAnimate,
			{
				opacity: 0,
				display: 'none',
			},
			{
				opacity: 1,
				display: 'block',
			}
		);

		this.scrollTriggerAnimate = ScrollTrigger.create({
			animation: this.hamburgerTimeline,
			trigger: this.header,
			start: '+=120',
			scrub: true,
			// markers: true,
		});

		this.timeline
			.fromTo(
				this.menu,
				{
					opacity: 0,
					display: 'none',
				},
				{
					duration: 0.5,
					opacity: 1,
					display: 'block',
					ease: 'none',
				}
			)
			.fromTo(
				this.menuContainer,
				{
					x: '100%',
				},
				{
					duration: 0.5,
					x: 0,
					ease: 'power1.out',
				}
			)
			.fromTo(
				this.actions,
				{
					translateX: 20,
					opacity: 0,
				},
				{
					stagger: 0.05,
					translateX: 0,
					opacity: 1,
					duration: 0.2,
					ease: 'power1.out',
				}
			)
			.set(
				this.header,
				{
					className: `${[]
						.concat(this.header.classList)
						.join(' ')} in-transition`,
				},
				0.7
			)
			.fromTo(
				this.items,
				{
					translateY: 20,
					opacity: 0,
				},
				{
					stagger: 0.05,
					translateY: 0,
					opacity: 1,
					duration: 0.2,
					ease: 'power1.out',
				}
			)
			.fromTo(
				this.lines,
				{
					opacity: 1,
				},
				{
					opacity: 0,
					duration: 0.4,
					ease: 'power4.easeOut',
				},
				0
			)
			.fromTo(
				this.cross,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.4,
					ease: 'power4.easeOut',
				},
				0.5
			);

		this.timeline.eventCallback('onStart', () => {
			disableScroll();

			document.body.classList.add('menu-opened');

			this.scrollTriggerAnimate.refresh(true);

			if (this.scrollTriggerAnimate.progress) {
				document.body.classList.add('menu-pinned');
			}
		});
		this.timeline.eventCallback('onReverseComplete', () => {
			enableScroll();

			document.body.classList.remove('menu-opened');

			this.scrollTriggerAnimate.refresh(true);

			document.body.classList.remove('menu-pinned');
		});
	}

	openMenu() {
		this.timeline.play();
		this.menuState = true;
	}

	closeMenu() {
		this.timeline.reverse();
		this.menuState = false;
	}
}
