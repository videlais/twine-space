import { Scene } from '@babylonjs/core/scene.js';
import { PhotoDome } from '@babylonjs/core/Helpers/photoDome.js';
import { Mesh } from "@babylonjs/core/Meshes/mesh.js";

/**
  * Photosphere
  * @param {Scene} scene
  * @param {Mesh} mesh
  * @param {Object} shape
  */
export default function Photosphere(scene, mesh, shape) {

  // Add photosphere.
  const photosphere = {
    name: 'photosphere',
    url: ''
  };

  // Check for url.
  if(shape.photosphere.hasOwnProperty('url')) {
    photosphere.url = shape.photosphere.url;
  }

  // If there is not a scene, we do not create a Photosphere.
  if(scene !== null) {
    // Create photosphere. (Photodome.)
    mesh = new PhotoDome(photosphere.name, photosphere.url,
      {
        resolution: 32,
        size: 1000
      },
      scene
    );
  }
}
