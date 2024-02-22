import { create as createAnnotation } from './Actors/Annotation.js';
import { create as createBox } from './Actors/Box.js';
import { create as createPhotosphere } from './Actors/Photosphere.js';
import { create as createPlane } from './Actors/Plane.js';
import { create as createSphere } from './Actors/Sphere.js';

const actors = {
  annotation: createAnnotation,
  box: createBox,
  photosphere: createPhotosphere,
  plane: createPlane,
  sphere: createSphere
};

export default class ActorFactory {
  // Create an actor of the given type with the given options.
  static create (type, options) {
    // Default the options to an empty object.
    let result = null;

    // If the type exists in actors, call its create() function.
    if (Object.hasOwnProperty.call(actors, type)) {
      // Call the create() function of the actor type and pass the options.
      result = actors[type](type, options);
    }

    // If the type does not exist in this.actors, return null.
    return result;
  }
}
