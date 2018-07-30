/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var Component = ecs.Component;
var Entity = ecs.Entity;

describe( 'Component', () => {
	function func1() {}
	function func2() {}

	var componentId1 = Component.inject( func1 );
	var componentId2 = Component.inject( func2 );

	var entity1 = new Entity();
	var entity2 = new Entity();
	var entity3 = new Entity();
	var component1 = entity1.addComponent( componentId1 );
	var component2 = entity1.addComponent( func1 );
	var component3 = entity2.addComponent( componentId1 );
	var component4 = entity1.getComponent( componentId1 );
	var component5 = entity1.getComponent( func1 );
	var component6 = entity1.getComponent( componentId2 );
	var component7 = entity3.addComponent( component1 );
	var component8 = entity1.getComponent( component1 );
	var component9 = entity1.getComponent( component3 );

	it( 'should have uuid', function () {
		assert.ok( !! entity1.uuid );
	} );
	it( 'should have com', function () {
		assert.ok( !! entity1.com );
	} );

	describe( '#addComponent()', () => {
		it( 'should return a component when create', function () {
			assert.ok( component1.componentKey );
		} );
		it( 'should return same type of component when create same type component', function () {
			assert.ok( component1.componentId === component3.componentId );
		} );
		it( 'should return the same component when create exist component type', function () {
			assert.ok( component1 === component2 );
		} );
		it( 'should return the same component when add with object', function () {
			assert.ok( component1 === component7 );
		} );
		it( 'should return undefined when argument wrong', function () {
			assert.ok( entity1.addComponent( '123' ) === undefined );
		} );
	} );

	describe( '#getComponent()', () => {
		it( 'should return the same component', function () {
			assert.ok( component1 === component4 );
		} );
		it( 'should return the same component', function () {
			assert.ok( component4 === component5 );
		} );
		it( 'should return the undefined when not have', function () {
			assert.ok( component6 === undefined );
		} );
		it( 'should return the component self when argument is object', function () {
			assert.ok( component1 === component8 );
		} );
		it( 'should return the component entity has with same type when argument is another object', function () {
			assert.ok( component1 === component9 );
		} );
	} );

	describe( '#removeComponent()', () => {

		var component10 = entity1.removeComponent( componentId1 );
		it( 'should return the removed component when pass component key', function () {
			assert.ok( component10 === component1 );
		} );

		entity1.addComponent( component1 );
		var component11 = entity1.removeComponent( func1 );
		it( 'should return the removed component when pass function', function () {
			assert.ok( component11 === component1 );
		} );

		entity1.addComponent( component1 );
		var component12 = entity1.removeComponent( component1 );
		it( 'should return the same component when pass the component', function () {
			assert.ok( component12 === component1 );
		} );

		entity1.addComponent( component1 );
		var component13 = entity1.removeComponent( component3 );
		it( 'should return the same component when pass the same type of component', function () {
			assert.ok( component13 === component1 );
		} );

		var component14 = entity1.removeComponent( 'component3' );
		it( 'should return the undefined when argument wrong', function () {
			assert.ok( component14 === undefined );
		} );

		var component15 = entity1.removeComponent( component3 );
		it( 'should return the undefined when not have the component', function () {
			assert.ok( component15 === undefined );
		} );

	} );

} );
