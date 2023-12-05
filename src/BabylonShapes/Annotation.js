import { Color3 } from '@babylonjs/core/Maths/math/color';
import { Vector3 } from '@babylonjs/core/Maths/math/vector3';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/CreateSphere';

/**
   * Annotation
   * @param {string} title
   * @param {object} position 
   * @param {string} text
   */
function Annotation(scene, mesh, title, position, text) {
    
    // Create outer sphere material.
    let redMat_outer = new StandardMaterial("outer", scene);
    redMat_outer.diffuseColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.specularColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.emissiveColor = new Color3(0.92, 0.26, 0.211);
    
    // Create outer sphere.
    mesh = CreateSphere("annotation", {diameter:8});
    mesh.position = new Vector3(position.x, position.y, position.z);
    mesh.metadata = { content: text, title: title };
    mesh.material = redMat_outer;
}


// Does the object contain an annotation?
if(shape.hasOwnProperty('annotation') ) {

    console.log('Annotation', shape.annotation);

    // Create default annotation.
    const annotation = {
      title: 'Annotation',
      position: { x: 0, y: 0, z: 0 },
      text: ''
    };

    // Check for title.
    if(shape.annotation.hasOwnProperty('title')) {
      annotation.title = shape.annotation.title;
    }

    // Check for position.
    if(shape.annotation.hasOwnProperty('position')) {
      // Check for x.
      if(shape.annotation.position.hasOwnProperty('x')) {
        annotation.position.x = shape.annotation.position.x;
      }

      // Check for y.
      if(shape.annotation.position.hasOwnProperty('y')) {
        annotation.position.y = shape.annotation.position.y;
      }

      // Check for z.
      if(shape.annotation.position.hasOwnProperty('z')) {
        annotation.position.z = shape.annotation.position.z;
      }
    }

    // Check for text.
    if(shape.annotation.hasOwnProperty('text')) {
      annotation.text = shape.annotation.text;
    }

    // Add annotation.
    BabylonProxy.addAnnotation(annotation.title, annotation.position, annotation.text);
  }
