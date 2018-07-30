import { UUID } from './UUID';
import { Component } from './Component';

export class Entity {

	constructor() {

		this._uuid = UUID.create();
		this._com = {};

	}

	get uuid() {

		return this._uuid;

	}

	get com() {

		return this._com;

	}

	addComponent( com, ...args ) {

		let componentName;
		if ( typeof com === 'number' )
			componentName = Component.getInjectedComponents().get( com ).name;
		else if ( typeof com === 'function' )
			componentName = com.name;
		else if ( com.componentKey ) {

			componentName = com.constructor.name;
			this._com[ componentName ] = com;
			return this._com[ componentName ];

		} else
			return console.error( 'wrong argument type' );

		if ( this._com[ componentName ] )
			console.warn( `componnet type ${componentName} existed` );
		else {

			const component = Component.create( com, ...args );
			this._com[ componentName ] = component;

		}
		return this._com[ componentName ];

	}

	removeComponent( com ) {

		let componentName;
		if ( typeof com === 'number' )
			componentName = Component.getInjectedComponents().get( com ).name;
		else if ( typeof com === 'function' )
			componentName = com.name;
		else if ( com.componentKey )
			componentName = com.constructor.name;
		else
			return console.error( 'argument type error' );

		const component = this._com[ componentName ];
		delete this._com[ componentName ];
		return component;

	}

	getComponent( com ) {

		let componentName;
		if ( typeof com === 'number' )
			componentName = Component.getInjectedComponents().get( com ).name;
		else if ( typeof com === 'function' )
			componentName = com.name;
		else if ( com.componentKey ) {

			componentName = com.constructor.name;
			return this._com[ componentName ];

		} else
			return console.error( 'argument type error' );

		return this._com[ componentName ];

	}

}
