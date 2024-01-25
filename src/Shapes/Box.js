import { CreateBox } from '@babylonjs/core/Meshes/Builders/CreateBox';
import { Vector3 } from '@babylonjs/core/Maths/math/vector3';

/**
   * Box
   * @param {string} name
   * @param {object} position
   * @param {object} options
   */
export default function Box(name = '', position, options) {
    if(scene != null) {
      mesh = CreateBox(name, options);
      mesh.position = new Vector3(position.x, position.y, position.z);
    }
}
