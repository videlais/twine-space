import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a sphere.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (diameter: 1, segments: 16).
   * 
   * @function sphere
   * @param {string} name - The name of the sphere.
   * @param {object} options - {diameter: number, segments: number, position: {x: number, y: number, z: number}}
   * @param {number} options.position.x - The x position of the sphere.
   * @param {number} options.position.y - The y position of the sphere.
   * @param {number} options.position.z - The z position of the sphere.
   * @param {number} options.diameter - The diameter of the sphere.
   * @param {number} options.segments - The segments of the sphere.
   * @returns {object} mesh - Sphere or null.
   */
function create(name, options) {

  // Prepare default mesh.
  let mesh = null;

  if(Director.isReady()) {
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
    
    // Prepare default diameter and segments values.
    let diameter = 1;
    let segments = 16;

    // Check if options.diameter exists.
    if(Object.hasOwnProperty.call(options, 'diameter') === false) {
      options.diameter = diameter;
    }

    // Check if options.segments exists.
    if(Object.hasOwnProperty.call(options, 'segments') === false) {
      options.segments = segments;
    }

    // Check if options.diameter is a number.
    if(typeof options.diameter !== 'number') {
      options.diameter = diameter;
    }

    // Check if options.diameter is greater than 0.
    if(options.diameter <= 0) {
      options.diameter = diameter;
    }

    // Check if options.segments is a number.
    if(typeof options.segments !== 'number') {
      options.segments = segments;
    }

    // Check if options.segments is divisible by 2.
    // If not, set segments to default value.
    // This is because the sphereBuilder requires segments to be divisible by 2.
    // (Sphere segments cannot be less than 2.)
    if(options.segments % 2 !== 0) {
      options.segments = segments;
    }

    // Set diameter.
    diameter = options.diameter;

    // Set segments.
    segments = options.segments;
    
    // Create a sphere.
    mesh = CreateSphere(name, {diameter: diameter, segments: segments}, Director.scene);
    
    // Set the position of the sphere.
    mesh.position = new Vector3(x, y, z);
  }

  // Return the Sphere or null.
  return mesh;
}

export { create };