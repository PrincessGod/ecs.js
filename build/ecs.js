'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var hex = [// hex identity values 0-255
"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];

var UUID = function () {
	function UUID() {
		classCallCheck(this, UUID);
	}

	createClass(UUID, null, [{
		key: "create",
		value: function create() {

			var d0 = Math.random() * 0xffffffff | 0;
			var d1 = Math.random() * 0xffffffff | 0;
			var d2 = Math.random() * 0xffffffff | 0;
			var d3 = Math.random() * 0xffffffff | 0;
			return hex[d0 & 0xff] + hex[d0 >> 8 & 0xff] + hex[d0 >> 16 & 0xff] + hex[d0 >> 24 & 0xff] + '-' + hex[d1 & 0xff] + hex[d1 >> 8 & 0xff] + '-' + hex[d1 >> 16 & 0x0f | 0x40] + hex[d1 >> 24 & 0xff] + '-' + hex[d2 & 0x3f | 0x80] + hex[d2 >> 8 & 0xff] + '-' + hex[d2 >> 16 & 0xff] + hex[d2 >> 24 & 0xff] + hex[d3 & 0xff] + hex[d3 >> 8 & 0xff] + hex[d3 >> 16 & 0xff] + hex[d3 >> 24 & 0xff];
		}
	}, {
		key: "hash",
		value: function hash(str) {

			var hash = 0,
			    i = void 0,
			    chr = void 0;
			if (str.length === 0) return hash;
			for (i = 0; i < str.length; i++) {

				chr = str.charCodeAt(i);
				hash = (hash << 5) - hash + chr;
				hash |= 0; // Convert to 32bit integer
			}
			return hash;
		}
	}]);
	return UUID;
}();

var Component = function () {
	function Component() {
		classCallCheck(this, Component);
	}

	createClass(Component, null, [{
		key: 'getInjectedComponents',


		/*
     Injected component info struct:
     {
         key: 'number' unique value for each type of component
         value: 'function' constructor for component
     }
     */
		value: function getInjectedComponents() {

			if (!Component._injected) Component._injected = new Map();

			return Component._injected;
		}

		/*
     return component unique id
     */

	}, {
		key: 'inject',
		value: function inject(fun) {

			if (typeof fun !== 'function') return console.error('component not type of function');

			var components = Component.getInjectedComponents();
			var key = UUID.hash(fun.name);
			if (components.has(key)) {

				console.warn('component ' + fun + ' has already injected');
				return key;
			}

			Object.defineProperties(fun, {

				componentKey: {
					get: function get$$1() {

						return key;
					}
				}

			});

			Object.defineProperties(fun.prototype, {
				uuid: {
					get: function get$$1() {

						return this._uuid;
					}
				},
				componentKey: {
					get: function get$$1() {

						return key;
					}
				}
			});

			components.set(key, fun);
			return key;
		}
	}, {
		key: 'create',
		value: function create(com) {

			var components = Component.getInjectedComponents();
			var Func = null;

			if (typeof com === 'function' && typeof com.componentKey === 'number' && components.get(com.componentKey) === com) Func = com;else if (typeof com === 'number' && components.has(com)) Func = components.get(com);else return console.error('unknown component info: ' + com);

			for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
				args[_key - 1] = arguments[_key];
			}

			var obj = new (Function.prototype.bind.apply(Func, [null].concat(args)))();
			obj._uuid = UUID.create();
			return obj;
		}
	}]);
	return Component;
}();

var Entity = function () {
	function Entity() {
		classCallCheck(this, Entity);


		this._uuid = UUID.create();
		this._com = {};
	}

	createClass(Entity, [{
		key: 'addComponent',
		value: function addComponent(com) {

			var componentName = void 0;
			if (typeof com === 'number') componentName = Component.getInjectedComponents().get(com).name;else if (typeof com === 'function') componentName = com.name;else if (com.componentKey) {

				componentName = com.constructor.name;
				this._com[componentName] = com;
				return this._com[componentName];
			} else return console.error('wrong argument type');

			if (this._com[componentName]) console.warn('componnet type ' + componentName + ' existed');else {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				var component = Component.create.apply(Component, [com].concat(args));
				this._com[componentName] = component;
			}
			return this._com[componentName];
		}
	}, {
		key: 'removeComponent',
		value: function removeComponent(com) {

			var componentName = void 0;
			if (typeof com === 'number') componentName = Component.getInjectedComponents().get(com).name;else if (typeof com === 'function') componentName = com.name;else if (com.componentKey) componentName = com.constructor.name;else return console.error('argument type error');

			var component = this._com[componentName];
			delete this._com[componentName];
			return component;
		}
	}, {
		key: 'getComponent',
		value: function getComponent(com) {

			var componentName = void 0;
			if (typeof com === 'number') componentName = Component.getInjectedComponents().get(com).name;else if (typeof com === 'function') componentName = com.name;else if (com.componentKey) {

				componentName = com.constructor.name;
				return this._com[componentName];
			} else return console.error('argument type error');

			return this._com[componentName];
		}
	}, {
		key: 'uuid',
		get: function get$$1() {

			return this._uuid;
		}
	}, {
		key: 'com',
		get: function get$$1() {

			return this._com;
		}
	}]);
	return Entity;
}();

var Group = function () {
	function Group() {
		var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
		classCallCheck(this, Group);


		if (!searchString) throw Error('searchString not passed');

		this._searchString = Group.getSearchString(searchString);
		var coms = this._searchString.split('&');
		this._requiredComs = coms.filter(function (c) {
			return c[0] !== '!';
		});
		this._disabledComs = coms.filter(function (c) {
			return c[0] === '!';
		}).map(function (c) {
			return c.slice(1);
		});
		this._entities = [];
	}

	createClass(Group, [{
		key: 'addEntity',
		value: function addEntity(e) {

			if (this.test(e) && this._entities.indexOf(e) < 0) {

				this._entities.push(e);
				return true;
			}
			return false;
		}
	}, {
		key: 'removeEntity',
		value: function removeEntity(e) {

			var idx = this._entities.indexOf(e);
			if (idx > -1) return this._entities.splice(idx, 1)[0];
			return false;
		}
	}, {
		key: 'test',
		value: function test(e) {

			return !this._requiredComs.filter(function (com) {
				return !e.com[com];
			}).length && !this._disabledComs.filter(function (com) {
				return e.com[com];
			}).length;
		}
	}, {
		key: 'searchString',
		get: function get$$1() {

			return this._searchString;
		}
	}, {
		key: 'entities',
		get: function get$$1() {

			return this._entities;
		}
	}], [{
		key: 'getSearchString',
		value: function getSearchString(searchString) {

			if (typeof searchString !== 'string' || !searchString) return console.error('unvalued search string ' + searchString);

			return searchString.replace(/\s/g, '').split('&').sort().join('&');
		}
	}]);
	return Group;
}();

var System = function () {
	function System() {
		var priority = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
		var enable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		classCallCheck(this, System);


		this._priority = priority;
		this._enable = enable;
	}

	createClass(System, [{
		key: "update",
		value: function update(context) {// eslint-disable-line

		}
	}, {
		key: "priority",
		get: function get$$1() {

			return this._priority;
		}
	}, {
		key: "enable",
		get: function get$$1() {

			return this._enable;
		}
	}]);
	return System;
}();

var Context = function () {
	function Context() {
		classCallCheck(this, Context);


		this._entitys = [];
		this._groups = new Map();
		this._systems = [];
	}

	createClass(Context, [{
		key: 'addEntity',
		value: function addEntity(e) {

			if (this._entitys.indexOf(e) < 0) {

				this._entitys.push(e);
				this._groups.forEach(function (group) {
					return group.addEntity(e);
				});
			} else console.warn('entity ' + e + ' already existed');

			return this;
		}
	}, {
		key: 'removeEntity',
		value: function removeEntity(e) {

			var idx = this._entitys.indexOf(e);

			if (idx > -1) {

				this._entitys.splice(idx, 1);
				this._groups.forEach(function (group) {
					return group.removeEntity(e);
				});
			}

			return this;
		}
	}, {
		key: 'getGroup',
		value: function getGroup(searchString) {

			var key = Group.getSearchString(searchString);
			if (this._groups.has(key)) return this._groups.get(key);

			var group = new Group(key);
			this._entitys.forEach(function (e) {
				return group.addEntity(e);
			});
			this._groups.set(key, group);
			return group;
		}
	}, {
		key: 'addSystem',
		value: function addSystem(s) {

			if (s instanceof System) {

				this._systems.push(s);
				this._systems.sort(function (a, b) {
					return a.priority - b.priority;
				});
			}

			return this;
		}
	}, {
		key: 'removeSystem',
		value: function removeSystem(s) {

			while (this._systems.indexOf(s) > -1) {

				var idx = this._systems.indexOf(s);
				this._systems.splice(idx, 1);
			}

			return this;
		}
	}, {
		key: 'execute',
		value: function execute() {
			var _this = this;

			this._systems.forEach(function (s) {
				return s.enable && s.update(_this);
			});
			return this;
		}
	}, {
		key: 'entitys',
		get: function get$$1() {

			return this._entitys;
		}
	}, {
		key: 'entityCount',
		get: function get$$1() {

			return this._entitys.length;
		}
	}, {
		key: 'systems',
		get: function get$$1() {

			return this._systems;
		}
	}]);
	return Context;
}();

exports.UUID = UUID;
exports.Component = Component;
exports.Entity = Entity;
exports.Context = Context;
exports.Group = Group;
exports.System = System;
//# sourceMappingURL=ecs.js.map
