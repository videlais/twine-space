// eslint-disable-next-line
const { Engine, Scene, DeviceOrientationCamera, RawTexture, PhotoDome, Vector3, CreateBox } = require('babylonjs');
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

      // Render based on loop.
      BabylonProxy.engine.runRenderLoop(() => {
        BabylonProxy.scene.render();
      });
    }

  }

  static addPhotoDome(name = '', url) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = new PhotoDome(
        name,
        url,
        {
          resolution: 32,
          size: 1000
        },
        BabylonProxy.scene
      );
    }
  }

  static addCube(name = '', position, options) {
    if(BabylonProxy.scene != null) {
      BabylonProxy.mesh = CreateBox(name, {height: 1, width: 1, depth: 1});
      BabylonProxy.mesh.position = new Vector3(position.x, position.y, position.z);
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
