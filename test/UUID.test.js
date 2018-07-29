/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );

describe( 'UUID', () => {
	describe( '#create()', () => {
		it( 'should return different value', function () {
			var id1 = ecs.UUID.create();
			var id2 = ecs.UUID.create();
			assert.ok( id1 !== id2 );
		} );
	} );
	describe( '#hash()', () => {
		var hash1 = ecs.UUID.hash( 'string1' );
		var hash2 = ecs.UUID.hash( 'string2' );
		var hash3 = ecs.UUID.hash( 'string2' );

		it( 'should return different value', () => {
			assert.ok( hash1 !== hash2 );
		} );
		it( "should return same value", () => {
			assert.ok( hash2 === hash3 );
		} );
	} );
} );
