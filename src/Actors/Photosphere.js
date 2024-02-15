import { PhotoDome } from '@babylonjs/core/Helpers/photoDome.js';

/**
  * Creates a photosphere.
  * 
  * A photosphere is a 360-degree image that can be used to create a virtual environment.
  * It requires a name and a url to the image.
  * 
  * @param {string} name - The name of the photosphere.
  * @param {string} url - The url of the photosphere.
  * @param {object} options - {resolution: number, size: number}
  * @param {number} options.resolution - The resolution of the photosphere.
  * @param {number} options.size - The size of the photosphere.
  */
export default function Photosphere(name, url, options) {

  // Prepare default mesh.
  let mesh = null;

  if(Director.isReady()) {
    // Check if name is a string.
    if(typeof name !== 'string') {
      name = '';
    }

    // Check if url is a string.
    if(typeof url !== 'string') {
      url = '';
    }

    // Prepare default resolution and size values.
    let resolution = 32;
    let size = 1000;

    // Check if options is an object.
    if(typeof options === 'object') {
      // Check if options.resolution is a number.
      if(typeof options.resolution === 'number') {
        resolution = options.resolution;
      }

      // Check if options.size is a number.
      if(typeof options.size === 'number') {
        size = options.size;
      }
    }

    // Create photosphere. (Photodome.)
    mesh = new PhotoDome(name, url,
      {
        resolution: resolution,
        size: size
      },
    );
  }

  // Return photosphere or null.
  return mesh;
}
