export class Context {

	constructor() {

		this._entitys = [];

	}

	get entitys() {

		return this._entitys;

	}

	get count() {

		return this._entitys.length;

	}

	addEntity( e ) {

		if ( this._entitys.indexOf( e ) < 0 )
			this._entitys.push( e );
		else
			console.warn( `entity ${e} already existed` );

		return this;

	}

	removeEntity( e ) {

		const idx = this._entitys.indexOf( e );

		if ( idx > - 1 )
			this._entitys.splice( idx, 1 );

		return this;

	}

}
