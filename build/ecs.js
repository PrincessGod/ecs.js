(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  function test() {

  	console.log('test');
  }

  var Main = function Main() {
  	classCallCheck(this, Main);


  	console.log('1');
  };

  test();

  var m = new Main();

})));
