import './polyfills';
import './utils/throttle';
import './utils/slideToggle';
import './utils/scroll';
import './utils/userAgent';

import './libs';

import { devices } from './utils/breakpoints';

window.UPB = window.UPB || {};
window.breakpoints = devices;

__webpack_public_path__ = window.__webpack_public_path__ || '';

document.addEventListener('DOMContentLoaded', () => {

});

window.addEventListener('load', () => {
	document.documentElement.classList.add('is-loading');
});

window.addEventListener('reinit', () => {
	window.dispatchEvent(new CustomEvent('init.validation'));
});
