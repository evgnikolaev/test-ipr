import {Server} from 'miragejs';
import errorModalSuccess from '../../public/ajax/error/success.json';

const requestTime = 1000;

export default function ({environment = 'development'} = {}) {
	return new Server({
		environment,

		routes() {
			this.post('/ajax/error', () => errorModalSuccess, {timing: requestTime});

			// For other requests dont use fake API routes
			this.passthrough();
			this.passthrough('https://corpnlmk.uplab.digital/**');
			this.passthrough('https://api.jsonbin.io/**');
		},
	});
}
