import { CreateBox } from '@babylonjs/core/Meshes/Builders/boxBuilder.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

/**
   * Creates a box.
   * 
   * If only name is provided, we use default positions (0, 0, 0) and sizes (width: 1, height: 1, depth: 1).
   * 
   * @param {string} name - The name of the box.
   * @param {number} options.position.x - The x position of the box.
   * @param {number} options.position.y - The y position of the box.
   * @param {number} options.position.z - The z position of the box.
   * @param {number} options.width - The width of the box.
   * @param {number} options.height - The height of the box.
   * @param {number} options.depth - The depth of the box.
   * @returns {object} mesh - Box or null.
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

      // Prepare default width, height, and depth values.
      let width = 1;
      let height = 1;
      let depth = 1;

      // Check if options is an object.
      if(typeof options !== 'object') {
        options = {};
      }

      // Check if options.position exists.
      if(Object.hasOwnProperty.call(options, 'position') === false){
        options.position = {};
      }

      // Check if options.position is an object.
      if(typeof options.position !== 'object') {
        options.position = {};
      }

      // Check if options.position.x exists.
      if(Object.hasOwnProperty.call(options.position, 'x') === false) {
        options.position.x = 0;
      }

      // Check if options.position.y exists.
      if(Object.hasOwnProperty.call(options.position, 'y') === false) {
        options.position.y = 0;
      }

      // Check if options.position.z exists.
      if(Object.hasOwnProperty.call(options.position, 'z') === false) {
        options.position.z = 0;
      }

      // Check if position.x is a number.
      if(typeof options.position.x !== 'number') {
        options.position.x = 1;
      }

      // Assign position.x to x.
      x = options.position.x;

      // Check if position.y is a number.
      if(typeof options.position.y !== 'number') {
        options.position.y = 1;
      }

      // Assign position.y to y.
      y = options.position.y;

      // Check if position.z is a number.
      if(typeof options.position.z !== 'number') {
        options.position.z = 1;
      }

      // Assign position.z to z.
      z = options.position.z;

      // Check if options.width exists.
      if(Object.hasOwnProperty.call(options, 'width') === false) {
        options.width = 1;
      }

      // Check if options.height exists.
      if(Object.hasOwnProperty.call(options, 'height') === false) {
        options.height = 1;
      }

      // Check if options.depth exists.
      if(Object.hasOwnProperty.call(options, 'depth') === false) {
        options.depth = 1;
      }

      // Check if options.width is a number.
      if(typeof options.width !== 'number') {
      // Set default width to 1.
        options.width = 1;
      }

      // Check if options.height is a number.
      if(typeof options.height !== 'number') {
        options.height = 1;
      }

      // Check if options.depth is a number.
      if(typeof options.depth !== 'number') {
        options.depth = 1;
      }

      // Check is width is less than 0.
      if(options.width < 0) {
        options.width = 1;
      }

      // Check is height is less than 0.
      if(options.height < 0) {
        options.height = 1;
      }

      // Check is depth is less than 0.
      if(options.depth < 0) {
        options.depth = 1;
      }

      // Assign options.width to width.
      width = options.width;

      // Assign options.height to height.
      height = options.height;

      // Assign options.depth to depth.
      depth = options.depth;

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

export { create };