# czpg-ecs

Entity Component System architecture in javascript

## Usage

```
npm i --save czpg-ecs
```

### Struct

```js

Context       // Top level container for ECS

Entity        // Entity object

Component     // Component object

System        // System base class

```

### Inject Component type

```js
import { Component } from 'czpg-ecs';

class Position {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

const positionComId = Component.inject( Position );
```

### Create Entity

```js
import { Entity } from 'czpg-ecs';

let entity = new Entity();

// add component
let positionCom = entity.addComponent( positionComId, 1, 2 );
// or use contructor instead
let positionCom = entity.addComponent( Position, 1, 2 );
// positionCom = { x: 1, y: 2 }

// remove component
entity.removeComponent( positionCom );
// or use constructor instead
entity.removeComponent( Position );

```

### Create System
```js
import { System } from 'czpg-ecs';

class PositionSystem extends System {

    constructor() {

        // priority is 10, enable is true
        super( 10, true );

    }

    update( context ) {

        // get group of entities with Position component
        let group = context.getGroup( 'Position' );

        group.entities.forEach( entity => {
            entity.com.Position.x += 1;
            entity.com.Position.y += 1;
        } );

    }

}

let positionSystem = new PositionSystem();

```

### Create Context
```js
import { Context } from 'czpg-ecs'

let context = new Context();

// add entity
context.addEntity( entity );

// remove entity
context.removeEntity( entity );

// add system
conetxt.addSystem( positionSystem );

// remove system
context.removeSystem( positionSystem );

// run systems
context.execute();

```

## Run in local

```
// clone and move to directory
git clone https://github.com/PrincessGod/ecs.js.git
cd ecs.js

// install npm packages
npm i

// build
npm run build

// build minify version
npm run build-min

// develop
npm run dev

// lint
npm run lint

// test
npm test
```
