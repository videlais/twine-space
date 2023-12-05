import { CreatePolygon } from '@babylonjs/core/Meshes/Builders/createPolygon';
import { Vector3 } from '@babylonjs/core/Maths/math/vector3';

/**
   * Polygon
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
function Polygon(scene, mesh, name = '', position, options) {
    if(scene != null) {
      mesh = CreatePolygon(name, options);
      mesh.position = new Vector3(position.x, position.y, position.z);
    }
  }