import { Engine } from '@babylonjs/core/Engines/engine.js';
import { RawTexture } from '@babylonjs/core/Materials/Textures/rawTexture.js';
import { Scene } from '@babylonjs/core/scene.js';
import { DeviceOrientationCamera } from '@babylonjs/core/Cameras/deviceOrientationCamera.js';
import { PhotoDome } from '@babylonjs/core/Helpers/photoDome.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

export default class BabylonProxy {
  static scene;
  static engine;
  static canvas;
  static mesh;

  static createScene () {
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

  static addToScene () {
    BabylonProxy.mesh = new PhotoDome(
      'testdome',
      'hotel.jpg',
      {
        resolution: 32,
        size: 1000
      },
      BabylonProxy.scene
    );
  }
}
