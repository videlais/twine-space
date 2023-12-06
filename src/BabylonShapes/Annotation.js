import { Color3 } from '@babylonjs/core/Maths/math.color.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { CreateSphere } from "@babylonjs/core/Meshes/Builders/sphereBuilder.js";
import "@babylonjs/core/Materials/material.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";

/**
   * Annotation
   * @param {Scene} scene
   * @param {Mesh} mesh 
   * @param {Object} shape
   */
export default function Annotation(scene, mesh, shape) {

  // Create default annotation.
  const annotation = {
    title: 'Annotation',
    position: { x: 0, y: 0, z: 0 },
    text: ''
  };

  // Does the object contain an annotation?

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
   
  
  // If there is not a scene, we do not create an annotation.
  if(scene !== null) {
    // Create outer sphere material.
    let redMat_outer = new StandardMaterial("outer", scene);
    redMat_outer.diffuseColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.specularColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.emissiveColor = new Color3(0.92, 0.26, 0.211);

    // Create outer sphere.
    mesh = CreateSphere("annotation", { diameter: 8 }, scene);
    mesh.position = new Vector3(annotation.position.x, annotation.position.y, annotation.position.z);
    mesh.metadata = { content: annotation.text, title: annotation.title };
    mesh.material = redMat_outer;
  }
}
