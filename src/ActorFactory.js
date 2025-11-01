import { create as createAnnotation } from './Actors/Annotation.js';
import { create as createBox } from './Actors/Box.js';
import { create as createCapsule } from './Actors/Capsule.js';
import { create as createCylinder } from './Actors/Cylinder.js';
import { create as createPhotosphere } from './Actors/Photosphere.js';
import { create as createPlane } from './Actors/Plane.js';
import { create as createSphere } from './Actors/Sphere.js';
import { create as createTorus } from './Actors/Torus.js';

const actors = {
  annotation: createAnnotation,
  box: createBox,
  capsule: createCapsule,
  cylinder: createCylinder,
  photosphere: createPhotosphere,
  plane: createPlane,
  sphere: createSphere,
  torus: createTorus
};

export default class ActorFactory {
  // Create an actor of the given type with the given options.
  static create (type, options) {
    console.log('ActorFactory.create', 'type: ', type, 'options: ', options);

    // Default the options to an empty object.
    let result = null;

    // If the type exists in actors, call its create() function.
    if (Object.hasOwnProperty.call(actors, type)) {
      // Generate a default name if one isn't provided in options
      const name = (options && options.name) ? options.name : type;
      
      // Call the create() function of the actor type and pass the name and options.
      result = actors[type](name, options);
    }

    // If the type does not exist in this.actors, return null.
    return result;
  }
}
