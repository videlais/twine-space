// eslint-disable-next-line
const { 
  Engine, 
  Scene, 
  DeviceOrientationCamera,
  UniversalCamera,
  RawTexture, 
  PhotoDome, 
  Vector3, 
  CreateBox, 
  CreatePlane, 
  CreateLines, 
  CreatePolygon,
  CreateSphere,
  StandardMaterial,
  Color3
} = require('babylonjs');
const $ = require('jquery');

class BabylonProxy {
  static scene = null;
  static engine;
  static canvas;
  static mesh;
  static explanation = null;

  static createScene () {
    // Hide the tw-passage
    $('tw-passage').hide();

    // If there is not a scene, create one.
    // Otherwise, do nothing.
    if(BabylonProxy.scene === null) {
      
      // Append <canvas>
      $(document.body).append($('<canvas id="renderCanvas" touch-action="none" />'));
      
      // Find canvas.
      BabylonProxy.canvas = document.getElementById('renderCanvas');

      // Create engine.
      BabylonProxy.engine = new Engine(BabylonProxy.canvas);

      // Create Scene.
      BabylonProxy.scene = new Scene(BabylonProxy.engine);

      // Use device orientation (if available) and default back to mouse on desktop.
      const camera = new DeviceOrientationCamera('DevOr_camera', new Vector3(0, 0, 0), BabylonProxy.scene);

      // This targets the camera to scene origin.
      camera.setTarget(new Vector3(0, 0, 10));

      // This attaches the camera to the canvas.
      camera.attachControl(BabylonProxy.canvas, true);

      BabylonProxy.scene.onPointerDown = (event, pickInfo) => {
        // Did we hit something with the ray cast?
        if(pickInfo.hit) {
            if(pickInfo.pickedMesh.name === "annotation") {
              camera.detachControl(BabylonProxy.canvas);
              makeAnnotation(pickInfo.pickedMesh.metadata);
            }
        }
      }

      function makeAnnotation({title, content}) {
        let el = document.createElement('md-dialog');
        el.setAttribute('type', 'alert');
        el.innerHTML = `<div slot="headline">${title}</div>
        <form slot="content" id="form-id" method="dialog">${content}</form>
        <div slot="actions"><md-text-button form="form-id">Close</md-text-button></div>`;
        
        // Add to DOM.
        document.body.appendChild(el);

        // Find dialog.
        $('md-text-button').on('click', () => {
          // Close dialog.
          el.close();
          // Remove element.
          el.parentElement.removeChild(el);
          // Reattach camera.
          camera.attachControl(BabylonProxy.canvas, true);
        });

        // Listen for accidental close.
        el.addEventListener('close', () => {
          // Reattach camera.
          camera.attachControl(BabylonProxy.canvas, true);
        });

        // Show dialog.
        el.show();
      }

      // Render based on loop.
      BabylonProxy.engine.runRenderLoop(() => {
        BabylonProxy.scene.render();
      });
    }

  }

  /**
   * addPhotoDome
   * @param {string} name
   * @param {string} url
   */
  static addPhotoDome(name = '', url) {

    if(BabylonProxy.scene != null) {

      console.log(`name: ${name}, url: ${url}`);
    
      // Create photosphere. (Photodome.)
      BabylonProxy.mesh = new PhotoDome(name, url,
        {
          resolution: 32,
          size: 1000
        }
      );
    }
  }

  /**
   * addCube
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
  static addCube(name = '', position, options) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = CreateBox(name, options);
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
    }
  }

  /**
   * addLine
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
  static addLine(name = '', position, options) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = CreateLines(name, options);
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
    }
  }

  /**
   * addPlane
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
  static addPlane(name = '', position, options) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = CreatePlane(name, options);
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
    }
  }

  /**
   * addPolygon
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
  static addPolygon(name = '', position, options) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = CreatePolygon(name, options);
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
    }
  }

  /**
   * addSphere
   * @param {string} name 
   * @param {object} position 
   * @param {object} options 
   */
  static addSphere(name = '', position, options) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = CreateSphere(name, options);
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
    }
  }

  /**
   * addAnnotation
   * @param {string} title
   * @param {object} position 
   * @param {string} text
   */
  static addAnnotation(title, position, text) {
    // Create outer sphere material.
    let redMat_outer = new StandardMaterial("outer", BabylonProxy.scene);
    redMat_outer.diffuseColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.specularColor = new Color3(0.4, 0.4, 0.4);
    redMat_outer.emissiveColor = new Color3(0.92, 0.26, 0.211);
    
    // Create outer sphere.
    BabylonProxy.mesh = CreateSphere("annotation", {diameter:8});
    BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
    BabylonProxy.mesh.metadata = { content: text, title: title };
    BabylonProxy.mesh.material = redMat_outer;
  }

  /**
   * Removes the current canvas element.
   * @function removeScene
   * @static
   */
  static removeScene () {
    // Remove the canvas.
    $('canvas').remove();
    
    // Clear the scene.
    BabylonProxy.scene = null;

    // Show the tw-passage (again).
    $('tw-passage').show();
  }

  /**
   * generateSceneFromObject
   * @param {object} jsObject
   */
  static generateSceneFromObject (jsObject) {

    // Look for each type of object in the collection.
    for(const shape of jsObject) {

      // Does the object contain an annotation?
      if(shape.hasOwnProperty('annotation') ) {

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

      if(shape.hasOwnProperty('photosphere') ) {
        // Add photosphere.
        const photosphere = {
          name: 'photosphere',
          url: ''
        };

        // Check for name.
        if(shape.photosphere.hasOwnProperty('name')) {
          photosphere.name = shape.photosphere.name;
        }

        // Check for url.
        if(shape.photosphere.hasOwnProperty('url')) {
          photosphere.url = shape.photosphere.url;
        }

        // Create photosphere. (Photodome.)
        // We either use the default values or the overridden ones.
        BabylonProxy.addPhotoDome(photosphere.name, photosphere.url);
      }
    }

   
  }
}

module.exports = BabylonProxy;
