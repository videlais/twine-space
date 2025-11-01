import { CreatePlane } from '@babylonjs/core/Meshes/Builders/planeBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a plane.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and options (width: 1, height: 1, sideOrientation: 0).
   * 
   * @function Plane
   * @param {string} name - The name of the plane. 
   * @param {object} options - {position: {x: number, y: number, z: number}, width: number, height: number, sideOrientation: number}
   * @param {object} options.position - {x: number, y: number, z: number}
   * @param {number} options.position.x - The x position of the plane.
   * @param {number} options.position.y - The y position of the plane.
   * @param {number} options.position.z - The z position of the plane.
   * @param {number} options.width - The width of the plane.
   * @param {number} options.height - The height of the plane.
   * @param {number} options.sideOrientation - The side orientation of the plane.
   * @returns {object} mesh - Plane or null.
   */
function create(name, options) {

  // Prepare default mesh.
  let mesh = null;

  // Get Director from window if available
  const Director = (typeof window !== 'undefined') ? window.Director : null;

  // Check if Director exists and has a scene.
  if(Director && Director.scene !== null) {
      // Check if name is a string.
      if(typeof name !== 'string') {
        name = '';
      }

      // Prepare default x, y, and z values.
      let x = 0;
      let y = 0;
      let z = 0;

      // Prepare default width, height, and sideOrientation values.
      let width = 1;
      let height = 1;
      let sideOrientation = 0;

      // Check if options is an object.
      if(typeof options !== 'object') {
        options = {};
      }

      // Check if options.position exists.
      if(!Object.prototype.hasOwnProperty.call(options, 'position')) {
        options.position = {x: 0, y: 0, z: 0};
      }

      // Check if options.position is an object.
      if(typeof options.position !== 'object') {
        options.position = {x: 0, y: 0, z: 0};
      }

      // Check if options.position.x exists.
      if(!Object.prototype.hasOwnProperty.call(options.position, 'x')) {
        options.position.x = 0;
      }

      // Check if options.position.y exists.
      if(!Object.prototype.hasOwnProperty.call(options.position, 'y')) {
        options.position.y = 0;
      }

      // Check if options.position.z exists.
      if(!Object.prototype.hasOwnProperty.call(options.position, 'z')) {
        options.position.z = 0;
      }

      // Check if position.x is a number.
      if(typeof options.position.x !== 'number') {
        options.position.x = 0;
      }

      // Check if position.y is a number.
      if(typeof options.position.y !== 'number') {
        options.position.y = 0;
      }

      // Check if position.z is a number.
      if(typeof options.position.z !== 'number') {
        options.position.z = 0;
      }

      // Set the position.x.
      x = options.position.x;

      // Set the position.y.
      y = options.position.y;

      // Set the position.z.
      z = options.position.z;

      // Check if options.width exists.
      if(!Object.prototype.hasOwnProperty.call(options, 'width')) {
        options.width = 1;
      }

      // Check if options.height exists.
      if(!Object.prototype.hasOwnProperty.call(options, 'height')) {
        options.height = 1;
      }

      // Check if options.sideOrientation exists.
      if(!Object.prototype.hasOwnProperty.call(options, 'sideOrientation')) {
        options.sideOrientation = 0;
      } 

      // Set the width.
      width = options.width;

      // Set the height.
      height = options.height;

      // Set the sideOrientation.
      sideOrientation = options.sideOrientation;
    
      // Create a plane.
      mesh = CreatePlane(name, {width, height, sideOrientation}, Director.scene);
      
      // Set the position of the plane.
      mesh.position = new Vector3(x, y, z);
  }

  // Return the Plane or null.
  return mesh;
}

export { create };