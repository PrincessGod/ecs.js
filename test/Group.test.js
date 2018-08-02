/* globals describe: true, it: true */
/* eslint padded-blocks: 0 */

var assert = require( 'assert' );
var ecs = require( '../' );
var Entity = ecs.Entity;
var Group = ecs.Group;

describe( 'Context', () => {

	function com1() {}
	function com2() {}

	var entity1 = new Entity();
	var entity2 = new Entity();
	var entity3 = new Entity();

	entity1.addComponent( com1 );
	entity2.addComponent( com2 );
	entity3.addComponent( com1 );
	entity3.addComponent( com2 );

	var group1 = new Group( 'com1' );
	var group2 = new Group( 'com2' );
	var group3 = new Group( 'com1&com2' );
	var group4 = new Group( 'com1&!com2' );

	describe( '#constructor()', () => {
		it( 'should return undefined and throw error when passing nothing', function () {
			try {
				var group = new Group();
			} catch ( error ) {
				assert.ok( error && group === undefined );
			}
		} );
	} );

	describe( '#test()', () => {
		it( 'should return true when marching', function () {
			assert.ok( group1.test( entity1 ) && group1.test( entity3 ) );
		} );
		it( 'should return false when not marching', function () {
			assert.ok( ! group3.test( entity1 ) && ! group3.test( entity2 ) );
		} );
		it( 'should work when marching has revese', function () {
			assert.ok( group4.test( entity1 ) && ! group4.test( entity3 ) );
		} );
	} );

	describe( '#searchString', () => {
		it( 'should return string type value', function () {
			assert.ok( typeof group1.searchString === 'string' );
		} );
		it( 'should return same search string when have spaces', function () {
			var group = new Group( 'c om1 ' );
			assert.ok( group1.searchString === group.searchString );
		} );
		it( 'should return same search string when have different order', function () {
			var group = new Group( 'com2 & com1' );
			assert.ok( group3.searchString === group.searchString );
		} );
	} );

	describe( '#addEntity()', () => {
		var addE1 = group1.addEntity( entity1 );
		var addE1Again = group1.addEntity( entity1 );
		var addE3G2 = group2.addEntity( entity3 );
		var addE3G3 = group3.addEntity( entity3 );
		var testRevert1 = group4.addEntity( entity1 );
		var testRevert2 = group4.addEntity( entity3 );
		it( 'should return true when add success', function () {
			assert.ok( addE1 );
		} );
		it( 'should return false when add existed entity', function () {
			assert.ok( ! addE1Again );
		} );
		it( 'should return true when march searching string\'s subset', function () {
			assert.ok( addE3G2 );
		} );
		it( 'should return true when march searching string\'s all condition', function () {
			assert.ok( addE3G3 );
		} );
		it( 'should use reverse condition', function () {
			assert.ok( testRevert1 && ! testRevert2 );
		} );
	} );

	describe( '#removeEntity()', () => {
		var removeE1G1 = group1.removeEntity( entity1 );
		var removeE1G1Again = group1.removeEntity( entity1 );
		it( 'should return entity when remove success', function () {
			assert.ok( removeE1G1 === entity1 );
		} );
		it( 'should return false when remove fail', function () {
			assert.ok( ! removeE1G1Again );
		} );
	} );

} );
