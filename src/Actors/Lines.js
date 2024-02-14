import { CreateLines } from '@babylonjs/core/Meshes/Builders/CreateLines';
import { Vector3 } from '@babylonjs/core/Maths/math/vector3';

/**
   * Line
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
function Line(scene, mesh, name = '', position, options) {
    if(scene != null) {
      mesh = CreateLines(name, options);
      mesh.position = new Vector3(position.x, position.y, position.z);
    }
}
