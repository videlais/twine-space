import { CreatePlane } from '@babylonjs/core/Meshes/Builders/planeBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a plane.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (width: 1, height: 1, sideOrientation: 0).
   * 
   * @function Plane
   * @param {string} name - The name of the plane. 
   * @param {object} position - {x: number, y: number, z: number}
   * @param {number} position.x - The x position of the plane.
   * @param {number} position.y - The y position of the plane.
   * @param {number} position.z - The z position of the plane.
   * @param {object} options - {width: number, height: number, sideOrientation: number}
   * @param {number} options.width - The width of the plane.
   * @param {number} options.height - The height of the plane.
   * @param {number} options.sideOrientation - The side orientation of the plane.
   */
export default function Plane(name = '', position, options) {
  // Check if Director is ready.
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

      // Prepare default width, height, and sideOrientation values.
      let width = 1;
      let height = 1;
      let sideOrientation = 0;

      // Check if options is an object.
      if(typeof options !== 'object') {
        options = {width: width, height: height, sideOrientation: sideOrientation};
      } else {
        // Check if options.width is a number.
        if(typeof options.width !== 'number') {
          options.width = width;
        } else {
          width = options.width;
        }

        // Check if options.height is a number.
        if(typeof options.height !== 'number') {
          options.height = height;
        } else {
          height = options.height;
        }

        // Check if options.sideOrientation is a number.
        if(typeof options.sideOrientation !== 'number') {
          options.sideOrientation = sideOrientation;
        } else {
          sideOrientation = options.sideOrientation;
        }
      }
    
      // Create a plane.
      const mesh = CreatePlane(name, options);
      
      // Set the position of the plane.
      mesh.position = new Vector3(position.x, position.y, position.z);
      
      // Return the plane.
      return mesh;
    }
}
