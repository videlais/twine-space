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

  static createScene () {
    // If there is not a scene, create one.
    // Otherwise, do nothing.
    if(BabylonProxy.scene == null) {
      
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
              makeAnnotation(pickInfo.pickedMesh.metadata.annotation);
            }
        }
      }

      function makeAnnotation(text) {
        let el = document.createElement('md-dialog');
        el.setAttribute('type', 'alert');
        el.innerHTML = `<div slot="headline">Annotation</div>
        <form slot="content" id="form-id" method="dialog">${text}</form>
        <div slot="actions"><md-text-button form="form-id">Close</md-text-button></div>`;
        
        // Add to DOM.
        document.body.appendChild(el);

        // Find dialog.
        $('md-text-button').on('click', () => {
          // Close dialog.
          el.close();
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
   * @param {object} position 
   * @param {string} text 
   */
  static addAnnotation(position, text) {
    if(BabylonProxy.scene != null) {
      var redMat_outer = new StandardMaterial("outer", BabylonProxy.scene);
      redMat_outer.diffuseColor = new Color3(0.4, 0.4, 0.4);
      redMat_outer.specularColor = new Color3(0.4, 0.4, 0.4);
      redMat_outer.emissiveColor = new Color3(0.92, 0.26, 0.211);
      // Create outer sphere.
      BabylonProxy.mesh = CreateSphere("annotation", {diameter:8});
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
      BabylonProxy.mesh.metadata = { annotation: text };
      BabylonProxy.mesh.material = redMat_outer;
    }
  }

  /**
   * Removes the current canvas element.
   * @function removeScene
   * @static
   */
  static removeScene () {
    $('canvas').remove();
    BabylonProxy.scene = null;
  }
}

module.exports = BabylonProxy;
