import Annotation from './Actors/Annotation.js';
import Box from './Actors/Box.js';
import Photosphere from './Actors/Photosphere.js';
import Plane from './Actors/Plane.js';
import Sphere from './Actors/Sphere.js';

class ActorFactory {
  constructor() {
    this.actors = {
      annotation: Annotation,
      box: Box,
      photosphere: Photosphere,
      plane: Plane,
      sphere: Sphere
    };
  }

  create(type, options) {
    if(this.actors[type]) {
      return this.actors[type](options);
    }
    return null;
  }
}