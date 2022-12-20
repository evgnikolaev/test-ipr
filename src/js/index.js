import './polyfills';
import './utils/throttle';
import './utils/slideToggle';
import './utils/scroll';
import './utils/userAgent';

import './libs';

import {devices} from './utils/breakpoints';


import Menu from './components/menu';
import Submenu from './components/submenu';
import Video from './components/video';
import Sliders from './components/slider';
import './components/accordion';
import AccordionMenu from './components/accordion-menu';

window.UPB = window.UPB || {};
window.breakpoints = devices;

__webpack_public_path__ = window.__webpack_public_path__ || '';

document.addEventListener('DOMContentLoaded', () => {
	new Menu();
	Submenu.init();
	AccordionMenu.init();
	Video.init();
	Sliders.init();
});

window.addEventListener('load', () => {
	document.documentElement.classList.add('is-loaded');
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.validation'));
});
