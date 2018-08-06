import { Group } from './Group';

export class Context {

	constructor() {

		this._entitys = [];
		this._groups = new Map();

	}

	get entitys() {

		return this._entitys;

	}

	get count() {

		return this._entitys.length;

	}

	addEntity( e ) {

		if ( this._entitys.indexOf( e ) < 0 ) {

			this._entitys.push( e );
			this._groups.forEach( ( group ) => group.addEntity( e ) );

		} else
			console.warn( `entity ${e} already existed` );

		return this;

	}

	removeEntity( e ) {

		const idx = this._entitys.indexOf( e );

		if ( idx > - 1 ) {

			this._entitys.splice( idx, 1 );
			this._groups.forEach( ( group ) => group.removeEntity( e ) );

		}

		return this;

	}

	getGroup( searchString ) {

		const key = Group.getSearchString( searchString );
		if ( this._groups.has( key ) )
			return this._groups.get( key );

		const group = new Group( key );
		this._entitys.forEach( e => group.addEntity( e ) );
		this._groups.set( key, group );
		return group;

	}

}
