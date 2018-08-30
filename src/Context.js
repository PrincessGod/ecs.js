import { Group } from './Group';
import { System } from './System';

export class Context {

	constructor() {

		this._entitys = [];
		this._groups = new Map();
		this._systems = [];

	}

	get entitys() {

		return this._entitys;

	}

	get entityCount() {

		return this._entitys.length;

	}

	get systems() {

		return this._systems;

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

	addSystem( s ) {

		if ( s instanceof System ) {

			this._systems.push( s );
			this._systems.sort( ( a, b ) => a.priority - b.priority );
			s.onAddToContext( this );

		}

		return this;

	}

	removeSystem( s ) {

		while ( this._systems.indexOf( s ) > - 1 ) {

			const idx = this._systems.indexOf( s );
			this._systems.splice( idx, 1 );
			s.onRemoveFromContext( this );

		}

		return this;

	}

	execute() {

		this._systems.forEach( ( s ) => s.enable && s.update( this ) );
		return this;

	}

}
