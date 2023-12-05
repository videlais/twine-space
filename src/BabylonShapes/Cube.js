import { CreateBox } from '@babylonjs/core/Meshes/Builders/CreateBox';
import { Vector3 } from '@babylonjs/core/Maths/math/vector3';

/**
   * Cube
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
function Cube(name = '', position, options) {
    if(scene != null) {
      mesh = CreateBox(name, options);
      mesh.position = new Vector3(position.x, position.y, position.z);
    }
}
