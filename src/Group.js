export class Group {

	constructor( searchString = '' ) {

		if ( !! this._searchString )
			throw Error( `searchString not passed` );

		this._searchString = searchString.replace( /\s/g, '' ).split( '&' ).sort().join( '&' );
		const coms = this._searchString.split( '&' );
		this._requiredComs = coms.filter( ( c ) => c[ 0 ] !== '!' );
		this._disabledComs = coms.filter( ( c ) => c[ 0 ] === '!' ).map( ( c ) => c.slice( 1 ) );
		this._entities = [];

	}

	get searchString() {

		return this._searchString;

	}

	get entities() {

		return this._entities;

	}

	addEntity( e ) {

		if ( this.test( e ) && this._entities.indexOf( e ) < 0 ) {

			this._entities.push( e );
			return true;

		}
		return false;

	}

	removeEntity( e ) {

		const idx = this._entities.indexOf( e );
		if ( idx > - 1 )
			return this._entities.splice( idx, 1 )[ 0 ];
		return false;

	}

	test( e ) {

		return ! this._requiredComs.filter( com => ! e.com[ com ] ).length
            && ! this._disabledComs.filter( com => e.com[ com ] ).length;

	}

}
