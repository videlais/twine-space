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
export default async function Photosphere(name, url, options) {

  // Prepare default mesh.
  let mesh = null;

  if(Director.isReady()) {
    // Check if name is a string.
    if(typeof name !== 'string') {
      name = '';
    }

    // Function to continue loading.
    // This function will be called after the image has loaded.
    const continueLoading = () => {
      // Prepare default resolution and size values.
      let resolution = 32;
      let size = 1000;

      // Check if options is an object.
      if(typeof options === 'object') {

        // Check if options.resolution property exists.
        if(Object.prototype.hasOwnProperty.call(options, 'resolution')) {
          // Check if options.resolution is a number.
          if(typeof options.resolution === 'number') {
            resolution = options.resolution;
          }
        }

        // Check if options.size property exists.
        if(Object.prototype.hasOwnProperty.call(options, 'size')) {
          // Check if options.size is a number.
          if(typeof options.size === 'number') {
            size = options.size;
          }
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

    // Promise-based image loader.
    const loadImage = path => {
      return new Promise((resolve) => {
        // Create a new image.
        const img = new Image();

        // Set the crossOrigin property to 'Anonymous'.
        img.crossOrigin = 'Anonymous';

        // Set the source of the image.
        img.src = path;

        // Set the onLoad.
        img.onload = () => {
          console.log('Image loaded:', img.src);
          resolve(true);
        };
        
        // Set the onError.
        img.onerror = e => {
          console.error('Image failed to load:', img.src);
          resolve(false);
        };
      })
    }

    // Check if the url is an image.
    const isImage = await loadImage(url);

    // Continue loading if the url is an image.
    if(isImage) {
      // Continue loading.
      continueLoading();
    }

  }

  // Return photosphere or null.
  return mesh;
}
