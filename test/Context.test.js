/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var Entity = ecs.Entity;
var Context = ecs.Context;
var Component = ecs.Component;

describe( 'Context', () => {

	function test1() {}
	function test2() {}
	Component.inject( test1 );
	Component.inject( test2 );

	var context = new Context();

	var entity1 = new Entity();
	var entity2 = new Entity();
	var entity3 = new Entity();

	entity1.addComponent( test1 );
	entity2.addComponent( test2 );
	entity3.addComponent( test1 );
	entity3.addComponent( test2 );

	context.addEntity( entity1 )
		.addEntity( entity2 )
		.addEntity( entity3 );

	var group1 = context.getGroup( 'test1' );
	var group2 = context.getGroup( 'test2' );
	var group3 = context.getGroup( 'test1&!test2' );

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

	describe( '#getGroup()', () => {

		it( 'should return the right group', function () {
			assert.ok( group1.entities.length === 2 && group2.entities.length === 2 && group3.entities.length === 1 );
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
		it( 'should have same entities in groups', function () {
			assert.ok( group1.entities.length === 2 && group2.entities.length === 2 && group3.entities.length === 1 );
		} );
	} );

	describe( '#removeEntity()', () => {

		it( 'should remove entity and count less 1', function () {
			context.removeEntity( entity1 );
			assert.ok( context.count === 2 );
		} );

		it( 'should remove entity in groups', function () {
			assert.ok( group1.entities.length === 1 && group2.entities.length === 2 && group3.entities.length === 0 );
		} );

		it( 'should return 0 count to support cascade', function () {
			context.removeEntity( entity1 )
				.removeEntity( entity2 )
				.removeEntity( entity3 );
			assert.ok( context.count === 0 );
		} );

		it( 'should remove all entities in groups', function () {
			assert.ok( group1.entities.length === 0 && group2.entities.length === 0 && group3.entities.length === 0 );
		} );

	} );

} );
