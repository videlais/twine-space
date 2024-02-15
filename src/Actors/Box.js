import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a box.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (width: 1, height: 1, depth: 1).
   * 
   * @param {string} name - The name of the box.
   * @param {object} position - {x: number, y: number, z: number}
   * @param {number} position.x - The x position of the box.
   * @param {number} position.y - The y position of the box.
   * @param {number} position.z - The z position of the box.
   * @param {object} options - {width: number, height: number, depth: number}
   * @param {number} options.width - The width of the box.
   * @param {number} options.height - The height of the box.
   * @param {number} options.depth - The depth of the box.
   * @returns {object} mesh - Box or null.
   */
export default function Box(name, position, options) {

    // Prepare default mesh.
    let mesh = null;

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

      // Prepare default width, height, and depth values.
      let width = 1;
      let height = 1;
      let depth = 1;

      // Check if options is an object.
      if(typeof options !== 'object') {
        options = {};
      } else {
        // Check if options.width is a number.
        if(typeof options.width !== 'number') {
          options.width = 1;
        } else {
          // Check if options.width is less than 0.
          if(options.width < 0) {
            // Avoid negative width.
            options.width = 1;
          } else {
            // Assign options.width to width.
            width = options.width;
          }
        }

        // Check if options.height is a number.
        if(typeof options.height !== 'number') {
          options.height = 1;
        } else {
          // Check if options.height is less than 0.
          if(options.height < 0) {
            // Avoid negative height.
            options.height = 1;
          } else {
            // Assign options.height to height.
            height = options.height;
          }
        }

        // Check if options.depth is a number.
        if(typeof options.depth !== 'number') {
          options.depth = 1;
        } else {
          // Check if options.depth is less than 0.
          if(options.depth < 0) {
            // Avoid negative depth
            options.depth = 1;
          } else {
            // Assign options.depth to depth.
            depth = options.depth;
          }
        }
      }

      // Create box.
      // Assign box to Director.mesh.
      // Use a default name if name is empty.
      // Use default positions if position is empty.
      // Use default width, height, and depth if options are empty.
      // Use Director.scene.
      mesh = CreateBox(name, {width: width, height: height, depth: depth}, Director.scene);
      
      // Assign position to mesh.position.
      mesh.position = new Vector3(x, y, z);
    }

     // Return Box or null.
     return mesh;
}
