import Map from './constructor';

export default {
	init() {
		const maps = new Map({
			selector: '[data-ymap-box]',
			pointsAttr: 'data-ymap-points',
			zoomAttr: 'data-ymap-zoom',
		});
	},
};
