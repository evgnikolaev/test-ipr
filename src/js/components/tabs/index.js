import PerfectScrollbar from 'perfect-scrollbar';

require('select2/dist/js/select2.full.js');

export default {
	init() {
		const tabsWrap = document.querySelectorAll('[data-tabs]');
		if (!tabsWrap.length) return;

		tabsWrap.forEach((wrap) => {
			this.render(wrap);
		});
	},

	render(wrap) {
		const tabNodes = wrap.querySelectorAll('[data-tab]');
		const paneNodes = wrap.querySelectorAll('[data-pane]');
		const select = wrap.querySelector('[data-tabs-select]');

		if (!tabNodes.length || !paneNodes.length || !select) return;

		const $select = $(select);

		const size = $select.data('select-size') || 'default';
		const placeholder = $select.data('select-placeholder') || $select.attr('placeholder') || false;

		// Icon class
		const icon = $select.data('select-icon');
		let iconClass = '';

		if ($select.ps && $select.ps.destroy()) {
			$select.ps.destroy();
			$select.ps = null;
		}

		if (icon) {
			iconClass = ` select2--icon-${icon}`;
		}

		const containerCssClass = `select2-selection--${size}${iconClass}`;
		const dropdownCssClass = `select2-dropdown--${size}`;

		$select.select2({
			width: $select.data('width') || '100%',
			theme: $select.data('select-theme') || '',
			containerCssClass,
			dropdownCssClass,
			placeholder,
			minimumResultsForSearch: Infinity,
			dropdownPosition: 'below',
			closeOnSelect: true,
			language: {
				noResults: () => 'Совпадений не найдено',
			},
		});

		$select.on('select2:open', () => {
			setTimeout(() => {
				const content = document.querySelector(
					'.select2-results__options',
				);
				if ($select.ps && $select.ps.update) {
					$select.ps.update();
				} else {
					$select.ps = new PerfectScrollbar(content, {
						suppressScrollX: true, // disable scrollX
						minScrollbarLength: 32,
					});
				}
			}, 10);
		});

		$select.on('select2:closing', () => {
			if ($select.ps && $select.ps.update) {
				$select.ps.update();
			}
		});

		$select.on('change', () => {
			const index = select.selectedIndex; // index = loop.index0

			this.toggleClasses(tabNodes, index, 'tabs__button--active');
			this.toggleClasses(paneNodes, index);
		});

		tabNodes.forEach((tab) => {
			tab.addEventListener('click', () => {
				const index = tab.getAttribute('data-tab');

				this.toggleClasses(tabNodes, index, 'tabs__button--active');
				this.toggleClasses(paneNodes, index);

				$select.val(index)
					.trigger('change'); // value = index.loop0
			});
		});
	},

	toggleClasses(arr, index, clazz = 'active') {
		arr[index].classList.add(clazz);

		for (let i = 0; i < arr.length; i++) {
			if (+index === i) continue;

			arr[i].classList.remove(clazz);
		}
	},
};
