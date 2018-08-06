/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var System = ecs.System;

describe( 'System', () => {

	var system1 = new System();
	var system2 = new System( 5, false );

	describe( '#constructor()', () => {
		it( 'should have defaulte priority vaule 1 when not pass', function () {
			assert.ok( system1.priority === 1 );
		} );
		it( 'should have priority vaule 5', function () {
			assert.ok( system2.priority === 5 );
		} );
		it( 'should have defaulte enable vaule true when not pass', function () {
			assert.ok( system1.enable === true );
		} );
		it( 'should have enable vaule false', function () {
			assert.ok( system2.enable === false );
		} );
	} );

	describe( '#update()', () => {
		it( 'should have update function', function () {
			assert.ok( typeof system1.update === 'function' );
		} );
	} );

} );
