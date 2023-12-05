import { CreatePlane } from '@babylonjs/core/Meshes/Builders/CreateSphere';
import { Vector3 } from '@babylonjs/core/Maths/math/vector3';

/**
   * Plane
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
function Plane(name = '', position, options) {
    if(scene != null) {
      mesh = CreatePlane(name, options);
      mesh.position = new Vector3(position.x, position.y, position.z);
    }
}
