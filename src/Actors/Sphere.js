import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a sphere.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (diameter: 1, segments: 16).
   * 
   * @function sphere
   * @param {string} name - The name of the sphere.
   * @param {object} position - {x: number, y: number, z: number}
   * @param {number} position.x - The x position of the sphere.
   * @param {number} position.y - The y position of the sphere.
   * @param {number} position.z - The z position of the sphere.
   * @param {object} options - {diameter: number, segments: number}
   * @param {number} options.diameter - The diameter of the sphere.
   * @param {number} options.segments - The segments of the sphere.
   */
export default function Sphere(name, position, options) {
  if(Director.isReady()) {
    // Check if name is a string.
    if(typeof name !== 'string') {
      name = '';
    }
    
    // Prepare default x, y, and z values.
    let x = 0;
    let y = 0;
    let z = 0;

    // Check if position is an object.
    if(typeof position !== 'object') {
      position = {x: x, y: y, z: z};
    } else {
      // Check if position.x is a number.
      if(typeof position.x !== 'number') {
        position.x = x;
      } else {
        x = position.x;
      }

      // Check if position.y is a number.
      if(typeof position.y !== 'number') {
        position.y = y;
      } else {
        y = position.y;
      }

      // Check if position.z is a number.
      if(typeof position.z !== 'number') {
        position.z = z;
      } else {
        z = position.z;
      }
    }

    // Prepare default diameter and segments values.
    let diameter = 1;
    let segments = 16;

    // Check if options is an object.
    if(typeof options !== 'object') {
      options = {diameter: diameter, segments: segments};
    } else {
      // Check if options.diameter is a number.
      if(typeof options.diameter !== 'number') {
        options.diameter = diameter;
      }

      // Check if options.segments is a number.
      if(typeof options.segments !== 'number') {
        options.segments = segments;
      }
    }
    
    // Create a sphere.
    const mesh = CreateSphere(name, options);
    
    // Set the position of the sphere.
    mesh.position = new Vector3(position.x, position.y, position.z);
    
    // Return the mesh.
    return mesh;
  }
}
