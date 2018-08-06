/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var Entity = ecs.Entity;
var Context = ecs.Context;
var Component = ecs.Component;
var System = ecs.System;

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

	let countNum = 0;
	class System1 extends System {
		constructor() {
			super();
		}
		update() {
			countNum ++;
		}
	}
	class System2 extends System {
		constructor() {
			super( 5, false );
		}
		update() {
			countNum -= 1;
		}
	}

	var system1 = new System1();
	var system2 = new System2();

	describe( '#entitys', () => {
		it( 'should have entitys array', function () {
			assert.ok( typeof context.entitys === 'object' );
		} );
	} );

	describe( '#entityCount', () => {
		it( 'should have 3 entities', function () {
			assert.ok( context.entityCount === 3 );
		} );
	} );

	describe( '#getGroup()', () => {

		it( 'should return the right group', function () {
			assert.ok( group1.entities.length === 2 && group2.entities.length === 2 && group3.entities.length === 1 );
		} );

	} );

	describe( '#addEntity()', () => {
		it( 'should have 3 entities', function () {
			assert.ok( context.entityCount === 3 );
		} );
		it( 'should have same entities when add existing entity', function () {
			context.addEntity( entity1 );
			assert.ok( context.entityCount === 3 );
		} );
		it( 'should have same entities in groups', function () {
			assert.ok( group1.entities.length === 2 && group2.entities.length === 2 && group3.entities.length === 1 );
		} );
	} );

	describe( '#removeEntity()', () => {

		it( 'should remove entity and entityCount less 1', function () {
			context.removeEntity( entity1 );
			assert.ok( context.entityCount === 2 );
		} );

		it( 'should remove entity in groups', function () {
			assert.ok( group1.entities.length === 1 && group2.entities.length === 2 && group3.entities.length === 0 );
		} );

		it( 'should return 0 entityCount to support cascade', function () {
			context.removeEntity( entity1 )
				.removeEntity( entity2 )
				.removeEntity( entity3 );
			assert.ok( context.entityCount === 0 );
		} );

		it( 'should remove all entities in groups', function () {
			assert.ok( group1.entities.length === 0 && group2.entities.length === 0 && group3.entities.length === 0 );
		} );

	} );

	describe( '#addSystem', () => {
		it( 'should add system success', function () {
			context.addSystem( system1 );
			assert.ok( context.systems.length === 1 );
		} );
		it( 'should add existed system', function () {
			context.addSystem( system1 );
			assert.ok( context.systems.length === 2 );
		} );
		it( 'should not add other function', function () {
			context.addSystem( test1 );
			assert.ok( context.systems.length === 2 );
		} );
		it( 'should have right order for systems', function () {
			context.addSystem( system2 );
			assert.ok( context.systems[ 0 ] === system1 && context.systems[ 1 ] === system1 && context.systems[ 2 ] === system2 );
		} );
	} );

	describe( '#execute', () => {

		it( 'should update system1 2 times', function () {
			context.execute();
			assert.ok( countNum === 2 );
		} );

	} );

	describe( '#removeSystem', () => {

		it( 'should remove system success', function () {
			context.removeSystem( system2 );
			assert.ok( context.systems.length === 2 );
		} );
		it( 'should remove all systems in context', function () {
			context.removeSystem( system1 );
			assert.ok( context.systems.length === 0 );
		} );

	} );

} );
