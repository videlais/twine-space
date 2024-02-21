import { Color3 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder.js";
import "@babylonjs/core/Materials/material.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";

/**
   * Create an annotation.
   * 
   * An annotation is a 3D object that can be placed in a scene to provide information about a specific location.
   * The sphere is placed at a specific position in the scene.
   * 
   * When a user clicks on the sphere, a modal popup will appear with the annotation's title and text.
   * 
   * @param {Object} options - The options of the annotation.
   * @param {string} options.title - The title of the annotation.
   * @param {Object} options.position - The position of the annotation.
   * @param {number} options.position.x - The x position of the annotation.
   * @param {number} options.position.y - The y position of the annotation.
   * @param {number} options.position.z - The z position of the annotation.
   * @param {string} options.text - The text of the annotation.
   * @returns {Object} Annotation or null.
   */
function create(options) {

  // Create default mesh.
  let mesh = null;

  // Is Director ready?
  if(Director.isReady()) {
    // Create default annotation.
    const annotation = {
      title: 'Annotation',
      position: { x: 0, y: 0, z: 0 },
      text: ''
    };

    // Is options an object?
    if(typeof options !== 'object') {
      // If not, we do not create an annotation.
      options = {};
    }

    // Check for title.
    if( Object.prototype.hasOwnProperty.call(options, 'title') ) {
      annotation.title = options.title;
    }

    // Check for position.
    if(Object.prototype.hasOwnProperty.call(options, 'position') ) {
      // Check for x.
      if(Object.prototype.hasOwnProperty.call(options.position, 'x') ) {
        annotation.position.x = options.position.x;
      }

      // Check for y.
      if(Object.prototype.hasOwnProperty.call(options.position, 'y') ) {
        annotation.position.y = options.position.y;
      }

      // Check for z.
      if(Object.prototype.hasOwnProperty.call(options.position, 'z') ) {
        annotation.position.z = options.position.z;
      }
    }

    // Check for text.
    if(Object.prototype.hasOwnProperty.call(options, 'text') ) {
      annotation.text = options.text;
    }
   
    // Create outer sphere material.
    let redMat_outer = new StandardMaterial("outer", Director.scene);
    redMat_outer.diffuseColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.specularColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.emissiveColor = new Color3(0.92, 0.26, 0.211);

    // Create outer sphere.
    mesh = CreateSphere("annotation", { diameter: 8 }, Director.scene);
    mesh.position = new Vector3(annotation.position.x, annotation.position.y, annotation.position.z);
    mesh.metadata = { content: annotation.text, title: annotation.title };
    mesh.material = redMat_outer;
  }

  // Return the mesh.
  return mesh;
}

export { create };