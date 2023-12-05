import { PhotoDome } from '@babylonjs/core/Meshes/Builders/PhotoDome';

/**
   * Photosphere
   * @param {Scene} scene
   * @param {string} name
   * @param {string} url
   */
function Photosphere(scene, mesh, name = '', url) {

    if(scene != null) {
      // Create photosphere. (Photodome.)
      mesh = new PhotoDome(name, url,
        {
          resolution: 32,
          size: 1000
        }
      );
    }
}

if(shape.hasOwnProperty('photosphere') ) {
  // Add photosphere.
  const photosphere = {
    name: 'photosphere',
    url: ''
  };

  console.log('From inside shape', shape.photosphere);

  // Check for name.
  if(shape.photosphere.hasOwnProperty('name')) {
    photosphere.name = shape.photosphere.name;
  }

  // Check for url.
  if(shape.photosphere.hasOwnProperty('url')) {
    photosphere.url = shape.photosphere.url;
  }

  console.log('From inside shape', shape.photosphere);

  // Create photosphere. (Photodome.)
  // We either use the default values or the overridden ones.
  BabylonProxy.addPhotoDome(photosphere.name, photosphere.url);
}
