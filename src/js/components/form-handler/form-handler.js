import axios from 'axios';

export default class FormHandler {
	constructor() {
		this.form = null;
		this.url = null;
		this.formData = null;
		this.modal = null;

		this.init();
	}

	init() {
		window.addEventListener('form:submit', (e) => this.handler(e));
		window.addEventListener('form:result', (e) => this.showResult(e));
	}

	handler(e) {
		this.form = e.detail.target;
		if (!this.form) return;

		this.url = this.form.getAttribute('action');
		this.formData = new FormData(this.form);

		if (!this.url) return;

		// Loader
		this.showLoader();

		this.modal = this.form.getAttribute('data-modal-name');

		axios.post(this.url, this.formData)
			.then((res) => {
				this.hideLoader();
				window.dispatchEvent(new CustomEvent('form:result', { detail: res.data }));
			})
			.catch((error) => {
				console.error(error);
				this.hideLoader();

				const data = {
					status: 'error',
					title: 'Ошибка',
					message: 'Попробуйте позже',
				};

				// Show result modal
				window.dispatchEvent(new CustomEvent('form:result', { detail: data }));
			});
	}

	showResult(e) {
		const data = e.detail;

		let title = null;
		let text = null;

		this.clearForm();

		if (this.modal) {
			const modal = document.querySelector(`#${this.modal}.modal`);

			title = document.querySelector(`#${this.modal} [data-ajax-heading]`);
			text = document.querySelector(`#${this.modal} [data-ajax-text]`);

			if (data.status === 'success') {
				modal.classList.add('is-success');
			} else if (data.status === 'error') {
				modal.classList.add('is-error');
			}

			if (title && text) {
				title.innerHTML = data.title;
				text.innerHTML = data.message;
			}

			window.modalOpen(this.modal);
		} else {
			const modal = this.form.closest('.modal');
			if (!modal) return;

			title = modal.querySelector('[data-ajax-heading]');
			text = modal.querySelector('[data-ajax-text]');

			if (data.status === 'success') {
				modal.classList.add('is-success');
			} else if (data.status === 'error') {
				modal.classList.add('is-error');
			}

			if (title && text) {
				title.innerHTML = data.title;
				text.innerHTML = data.message;
			}
		}

		title = null;
		text = null;

		window.dispatchEvent(new CustomEvent('form:sent'));
	}

	showLoader() {
		const submitBtn = this.form.querySelector('button[type=submit]');

		submitBtn.classList.add('is-loading');
	}

	hideLoader() {
		const submitBtn = this.form.querySelector('button[type=submit]');

		submitBtn.classList.remove('is-loading');
	}

	clearForm() {
		const fields = this.form.querySelectorAll('input, textarea, select');

		for (let i = 0; i < fields.length; i++) {
			const field = fields[i];

			if (field.getAttribute('type') === 'hidden'
				|| field.getAttribute('type') === 'checkbox') continue;

			field.value = '';
			if (field.hasAttribute('data-select')) {
				const $field = $(field);
				$field.val('')
					.trigger('change');
			}

			field.classList.remove('not-empty');
			field.classList.remove('parsley-success');
		}
	}
}
