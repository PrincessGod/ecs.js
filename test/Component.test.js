/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var Component = ecs.Component;

describe( 'Component', () => {
	function func1( ...args ) { this.args = args }
	function func2() {}

	var componentId1 = Component.inject( func1 );
	var componentId2 = Component.inject( func2 );
	var componentId3 = Component.inject( func2 );
	var componentIdNull = Component.inject( 'string' );

	const args = [ 1, '2', 3 ];
	var component1 = Component.create( func1, ...args );
	var component2 = Component.create( componentId1 );
	var component3 = Component.create( 'unknown' );
	describe( '#getInjectedComponents()', () => {
		it( 'should return a Map', function () {
			assert.ok( Component.getInjectedComponents().constructor.name === "Map" );
		} );
	} );
	describe( '#inject()', () => {
		it( 'should renture number', () => {
			assert.ok( typeof componentId2 === 'number' );
		} );
		it( 'should return different id when component is different', () => {
			assert.ok( componentId1 !== componentId2 );
		} );
		it( 'should return same id when inject an exist component', () => {
			assert.ok( componentId3 === componentId2 );
		} );
		it( 'should return the undefined when not function', () => {
			assert.ok( componentIdNull === undefined );
		} );
	} );
	describe( '#create()', () => {
		it( 'should create object from function', () => {
			assert.ok( component1 instanceof func1 );
		} );
		it( 'should create object from component id', () => {
			assert.ok( component2 instanceof func1 );
		} );
		it( 'should receive parameters', () => {
			assert.ok( component1.args = args );
		} );
		it( 'should return undefined when not have component', () => {
			assert.ok( component3 === undefined );
		} );
	} );
} );
