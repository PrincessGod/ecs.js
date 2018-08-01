/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var Entity = ecs.Entity;
var Context = ecs.Context;

describe( 'Context', () => {

	var context = new Context();

	var entity1 = new Entity();
	var entity2 = new Entity();
	var entity3 = new Entity();

	context.addEntity( entity1 )
		.addEntity( entity2 )
		.addEntity( entity3 );

	describe( '#entitys', () => {
		it( 'should have entitys array', function () {
			assert.ok( typeof context.entitys === 'object' );
		} );
	} );

	describe( '#count', () => {
		it( 'should have 3 entities', function () {
			assert.ok( context.count === 3 );
		} );
	} );

	describe( '#addEntity()', () => {
		it( 'should have 3 entities', function () {
			assert.ok( context.count === 3 );
		} );
		it( 'should have same entities when add existing entity', function () {
			context.addEntity( entity1 );
			assert.ok( context.count === 3 );
		} );
	} );

	describe( '#removeEntity()', () => {

		it( 'should remove entity and count less 1', function () {
			context.removeEntity( entity1 );
			assert.ok( context.count === 2 );
		} );

		it( 'should return 0 count to support cascade', function () {
			context.removeEntity( entity1 )
				.removeEntity( entity2 )
				.removeEntity( entity3 );
			assert.ok( context.count === 0 );
		} );

	} );

} );
