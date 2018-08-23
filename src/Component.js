import { UUID } from "./UUID";

export class Component {

	/*
    Injected component info struct:
    {
        key: 'number' unique value for each type of component
        value: 'function' constructor for component
    }
    */
	static getInjectedComponents() {

		if ( ! Component._injected )
			Component._injected = new Map();

		return Component._injected;

	}

	/*
    return component unique id
    */
	static inject( fun ) {

		if ( typeof fun !== 'function' )
			return	console.error( 'component not type of function' );

		const components = Component.getInjectedComponents();
		const key = UUID.hash( fun.name );
		if ( components.has( key ) ) {

			console.warn( `component ${fun} has already injected` );
			return key;

		}

		Object.defineProperties( fun, {

			componentKey: {
				get() {

					return key;

				}
			}

		} );

		Object.defineProperties( fun.prototype, {
			uuid: {
				get() {

					return this._uuid;

				}
			},
			componentKey: {
				get() {

					return key;

				}
			}
		} );

		components.set( key, fun );
		return key;

	}

	static create( com, ...args ) {

		const components = Component.getInjectedComponents();
		let Func = null;

		if ( typeof com === 'function' &&
			typeof com.componentKey === 'number' &&
			components.get( com.componentKey ) === com )
			Func = com;
		else if ( typeof com === 'number' && components.has( com ) )
			Func = components.get( com );
		else
			return console.error( `unknown component info: ${com}` );

		const obj = new Func( ...args );
		obj._uuid = UUID.create();
		return obj;

	}

}
