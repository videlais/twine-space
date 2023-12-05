// eslint-disable-next-line
const { 
  Engine, 
  Scene, 
  DeviceOrientationCamera,
  PhotoDome, 
  Vector3
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
   * Removes the current canvas element.
   * @function removeScene
   * @static
   */
  static removeScene () {
    $('canvas').remove();
    BabylonProxy.scene = null;
  }

  /**
   * generateSceneFromObject
   * @param {object} jsObject
   */
  static generateSceneFromObject (jsObject) {

    // Look for each type of object in the collection.
    for(const shape of jsObject) {

      console.log('Inside generateSceneFromObject', shape);
    }

   
  }
}

module.exports = BabylonProxy;
