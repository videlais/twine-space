import { PhotoDome } from '@babylonjs/core/Helpers/photoDome.js';

/**
  * Creates a photosphere.
  * 
  * A photosphere is a 360-degree image that can be used to create a virtual environment.
  * It requires a name and a url to the image.
  * 
  * @param {string} name - The name of the photosphere.
  * @param {object} options - {resolution: number, size: number, url: string}
  * @param {number} options.resolution - The resolution of the photosphere.
  * @param {number} options.size - The size of the photosphere.
  * @param {string} options.url - The url to the image.
  */
async function create(name, options) {

  // Prepare default mesh.
  let mesh = null;

  // Get Director from window if available
  const Director = (typeof window !== 'undefined') ? window.Director : null;

  if(Director && Director.scene !== null) {
    // Check if name is a string.
    if(typeof name !== 'string') {
      name = '';
    }

    // Prepare default resolution, size, and url values.
    let resolution = 32;
    let size = 1000;
    let url = '';

    // Function to continue loading.
    // This function will be called after the image has loaded.
    const continueLoading = () => {
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

    // Check if options.url property exists.
    if(Object.prototype.hasOwnProperty.call(options, 'url')) {
      // Check if options.url is a number.
      if(typeof options.url === 'string') {
        url = options.url;
      }
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

export { create };