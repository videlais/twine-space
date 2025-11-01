import { CreateTorus } from '@babylonjs/core/Meshes/Builders/torusBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a torus (donut shape).
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (diameter: 1, thickness: 0.5, tessellation: 16).
   * 
   * @function torus
   * @param {string} name - The name of the torus.
   * @param {object} options - {diameter: number, thickness: number, tessellation: number, position: {x: number, y: number, z: number}}
   * @param {number} options.position.x - The x position of the torus.
   * @param {number} options.position.y - The y position of the torus.
   * @param {number} options.position.z - The z position of the torus.
   * @param {number} options.diameter - The diameter of the torus.
   * @param {number} options.thickness - The thickness of the torus tube.
   * @param {number} options.tessellation - The number of segments.
   * @returns {object} mesh - Torus or null.
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
    
    // Prepare default diameter, thickness, and tessellation values.
    let diameter = 1;
    let thickness = 0.5;
    let tessellation = 16;

    // Check if options.diameter exists.
    if(Object.hasOwnProperty.call(options, 'diameter') === false) {
      options.diameter = diameter;
    }

    // Check if options.thickness exists.
    if(Object.hasOwnProperty.call(options, 'thickness') === false) {
      options.thickness = thickness;
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

    // Check if options.thickness is a number.
    if(typeof options.thickness !== 'number') {
      options.thickness = thickness;
    }

    // Check if options.thickness is greater than 0.
    if(options.thickness <= 0) {
      options.thickness = thickness;
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

    // Set thickness.
    thickness = options.thickness;

    // Set tessellation.
    tessellation = options.tessellation;
    
    // Create a torus.
    mesh = CreateTorus(name, {diameter: diameter, thickness: thickness, tessellation: tessellation}, Director.scene);
    
    // Set the position of the torus.
    mesh.position = new Vector3(x, y, z);
  }

  // Return the Torus or null.
  return mesh;
}

export { create };
