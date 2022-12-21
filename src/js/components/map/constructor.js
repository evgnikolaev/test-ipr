import ymapsTouchScroll from 'ymaps-touch-scroll';
import parseData from '../../utils/parseData';

export default class Map {
	constructor({
		selector = '[data-ymap-box]',
		pointsAttr = 'data-ymap-points',
		centerAttr = 'data-ymap-center',
		zoomAttr = 'data-ymap-zoom',
	}) {
		this.selector = selector;
		this.pointsAttr = pointsAttr;
		this.centerAttr = centerAttr;
		this.zoomAttr = zoomAttr;
		this.lang = 'ru_RU';

		this.api_key =
			window.yandex_api_key || '61c18709-ab36-44d1-80e0-03f614719188';
		this.scriptUrl = `https://api-maps.yandex.ru/2.1?apikey=${this.api_key}&lang=${this.lang}&mode=debug`;

		this.circleIconShape = {
			type: 'Circle',
			coordinates: [0, -24],
			radius: 24,
		};

		this.render();
	}

	render() {
		this.maps = document.querySelectorAll(this.selector);
		if (!this.maps.length) return;

		const self = this;

		this.loadScript((event) => {
			// eslint-disable-next-line no-undef
			ymaps.ready((yandexMapsInstance) => {
				self.ymaps = yandexMapsInstance;
				self.ready(yandexMapsInstance);
				window.mapScriptStatus = 'loaded';
			});
		});
	}

	loadScript(callback) {
		if (
			window.mapScriptStatus === 'loading' ||
			window.mapScriptStatus === 'loaded'
		) {
			callback();
		} else {
			const scriptEl = document.createElement('script');
			scriptEl.onload = callback;
			scriptEl.src = this.scriptUrl;
			document.body.appendChild(scriptEl);
			window.mapScriptStatus = 'loading';
		}
	}

	ready(ymaps) {
		this.maps.forEach((el) => {
			const initialized = el.hasAttribute('data-map-initialized');
			if (initialized) return;

			el.setAttribute('data-map-initialized', '');

			const center = parseData(el.getAttribute(this.centerAttr)) || [
				55.76,
				37.64,
			];
			const zoom = parseData(el.getAttribute(this.zoomAttr)) || 10;
			const pointsList = el.getAttribute(this.pointsAttr);

			const MAP = new ymaps.Map(el, {
				center,
				zoom,
				controls: [],
				margin: 10,
			});

			ymapsTouchScroll(MAP);

			el.MAP = MAP;
			const zoomControl = new ymaps.control.ZoomControl({
				options: {
					position: {
						left: 'auto',
						bottom: 48,
						top: 'auto',
						right: 16,
					},
					size: 'small',
				},
			});
			MAP.controls.add(zoomControl);

			if (pointsList) {
				let points = [];
				try {
					points = JSON.parse(pointsList);
				} catch (e) {
					console.log(e);
				}

				const pointsArray = points.map((point) =>
					this.createPoints(point)
				);
				// const pointsCluster = new ymaps.Clusterer({
				// 	clusterIconLayout: this.createClusterPlacemarkLayout(),
				// 	clusterIconShape: this.circleIconShape,
				// 	minClusterSize: 3,
				// });
				// pointsCluster.add(pointsArray);
				// MAP.geoObjects.add(pointsCluster);

				pointsArray.forEach((point) => {
					MAP.geoObjects.add(point);
				});

				window.addEventListener('fitMap', () => {
					MAP.container.fitToViewport();
				});
			}
		});
	}

	createPoints(point) {
		return new this.ymaps.Placemark(
			point.coords,
			{
				title: point.title || false,
				id: point.id || false,
				address: point.address || false,
				text: point.text || false,
				hintContent: point.hint ? point.hint : false,
			},
			{
				iconLayout: this.createPlacemarkLayout(),
				iconShape: this.circleIconShape,
			}
		);
	}

	createClusterPlacemarkLayout() {
		return this.ymaps.templateLayoutFactory.createClass(
			'<div class="ymaps-cluster{% if properties.color %} color-{{properties.color}}{% endif %}">' +
				'<div class="ymaps-cluster__content">{{properties.geoObjects.length}}</div></div>'
		);
	}

	createPlacemarkLayout() {
		return this.ymaps.templateLayoutFactory.createClass(
			'<div class="ymaps-placemark{% if properties.color %} color-{{properties.color}}{% endif %}"></div>'
		);
	}
}
