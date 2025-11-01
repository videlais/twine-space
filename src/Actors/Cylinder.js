import { CreateCylinder } from '@babylonjs/core/Meshes/Builders/cylinderBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a cylinder.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (diameter: 1, height: 2, tessellation: 24).
   * 
   * @function cylinder
   * @param {string} name - The name of the cylinder.
   * @param {object} options - {diameter: number, height: number, tessellation: number, position: {x: number, y: number, z: number}}
   * @param {number} options.position.x - The x position of the cylinder.
   * @param {number} options.position.y - The y position of the cylinder.
   * @param {number} options.position.z - The z position of the cylinder.
   * @param {number} options.diameter - The diameter of the cylinder.
   * @param {number} options.height - The height of the cylinder.
   * @param {number} options.tessellation - The number of radial segments.
   * @returns {object} mesh - Cylinder or null.
   */
function create(name, options) {

  // Prepare default mesh.
  let mesh = null;

  // Get Director from window if available
  const Director = (typeof window !== 'undefined') ? window.Director : null;

  if(Director && Director.scene !== null) {
    // Check if name is a string.
    if(typeof name !== 'string') {
      name = '';
    }
    
    // Prepare default x, y, and z values.
    let x = 0;
    let y = 0;
    let z = 0;

    // Check if options is an object.
    if(typeof options !== 'object') {
      options = {};
    }

    // Check if options.position exists.
    if(Object.hasOwnProperty.call(options, 'position') === false) {
      options.position = {x: x, y: y, z: z};
    }

    // Check if position is an object.
    if(typeof options.position !== 'object') {
      options.position = {x: x, y: y, z: z};
    }

    // Check if position.x exists.
    if(Object.hasOwnProperty.call(options.position, 'x') === false) {
      options.position.x = x;
    }

    // Check if position.y exists.
    if(Object.hasOwnProperty.call(options.position, 'y') === false) {
      options.position.y = y;
    }

    // Check if position.z exists.
    if(Object.hasOwnProperty.call(options.position, 'z') === false) {
      options.position.z = z;
    }

    // Check if position.x is a number.
    if(typeof options.position.x !== 'number') {
      options.position.x = x;
    }
      
    // Check if position.y is a number.
    if(typeof options.position.y !== 'number') {
      options.position.y = y;
    }

    // Check if position.z is a number.
    if(typeof options.position.z !== 'number') {
      options.position.z = z;
    }

    // Set position.x
    x = options.position.x;

    // Set position.y
    y = options.position.y;

    // Set position.z
    z = options.position.z;
    
    // Prepare default diameter, height, and tessellation values.
    let diameter = 1;
    let height = 2;
    let tessellation = 24;

    // Check if options.diameter exists.
    if(Object.hasOwnProperty.call(options, 'diameter') === false) {
      options.diameter = diameter;
    }

    // Check if options.height exists.
    if(Object.hasOwnProperty.call(options, 'height') === false) {
      options.height = height;
    }

    // Check if options.tessellation exists.
    if(Object.hasOwnProperty.call(options, 'tessellation') === false) {
      options.tessellation = tessellation;
    }

    // Check if options.diameter is a number.
    if(typeof options.diameter !== 'number') {
      options.diameter = diameter;
    }

    // Check if options.diameter is greater than 0.
    if(options.diameter <= 0) {
      options.diameter = diameter;
    }

    // Check if options.height is a number.
    if(typeof options.height !== 'number') {
      options.height = height;
    }

    // Check if options.height is greater than 0.
    if(options.height <= 0) {
      options.height = height;
    }

    // Check if options.tessellation is a number.
    if(typeof options.tessellation !== 'number') {
      options.tessellation = tessellation;
    }

    // Check if options.tessellation is at least 3.
    if(options.tessellation < 3) {
      options.tessellation = tessellation;
    }

    // Set diameter.
    diameter = options.diameter;

    // Set height.
    height = options.height;

    // Set tessellation.
    tessellation = options.tessellation;
    
    // Create a cylinder.
    mesh = CreateCylinder(name, {diameter: diameter, height: height, tessellation: tessellation}, Director.scene);
    
    // Set the position of the cylinder.
    mesh.position = new Vector3(x, y, z);
  }

  // Return the Cylinder or null.
  return mesh;
}

export { create };
