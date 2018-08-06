export class System {

	constructor( priority = 1, enable = true ) {

		this._priority = priority;
		this._enable = enable;

	}

	get priority() {

		return this._priority;

	}

	get enable() {

		return this._enable;

	}

	update( context ) { // eslint-disable-line

	}

}
