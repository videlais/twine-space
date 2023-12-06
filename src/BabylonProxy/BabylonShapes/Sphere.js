import { CreateSphere } from '@babylonjs/core/Meshes/Builders/CreateSphere';

/**
   * Sphere
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
function Sphere(name = '', position, options) {
    if(scene != null) {
      mesh = CreateSphere(name, options);
      mesh.position = new Vector3(position.x, position.y, position.z);
    }
}
