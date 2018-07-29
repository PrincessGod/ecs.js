import { UUID } from './UUID';
import { Component } from './Component';

for ( let i = 0; i < 10; i ++ ) {

	console.log( UUID.create() );

}

function test1( ...args ) {

	console.log( args );
	this.args = args;

}
function test2() {}

Component.inject( test1 );
Component.inject( test2 );
Component.inject( test2 );
window.com = Component.create( test1, 1, 2, 'test' );
console.log( com );

export { UUID, Component };
