import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { DeviceOrientationCamera } from '@babylonjs/core/Cameras/deviceOrientationCamera.js';
import '@babylonjs/core/Culling/ray.js';
// Side-effects only imports allowing the standard material to be used as default.
import "@babylonjs/core/Materials/material.js";
import "@babylonjs/core/Materials/standardMaterial.js";
// Import jQuery
import $ from "jquery";

// Import Annotation
import Annotation from './BabylonShapes/Annotation.js';

// Import Photosphere
import Photosphere from './BabylonShapes/Photosphere.js';

export default class BabylonProxy {
  // BabylonJS Scene.
  static scene = null;

  // BabylonJS Engine.
  static engine = null;

  // BabylonJS Canvas.
  static canvas = null;

  // BabylonJS Mesh.
  static mesh = null;

  /**
   * Creates a BabylonJS scene.
   */
  static createScene () {
    // Hide the Passage.
    $('tw-passage').hide();

    // If there is not a scene, create one.
    // Otherwise, do nothing.
    if (BabylonProxy.scene === null) {

      // Append a Canvas element.
      $(document.body).append($('<canvas id="renderCanvas" touch-action="none" />'));

      // Find canvas.
      BabylonProxy.canvas = document.getElementById('renderCanvas');

      // Create engine.
      BabylonProxy.engine = new Engine(BabylonProxy.canvas);

      // Create Scene.
      BabylonProxy.scene = new Scene(BabylonProxy.engine);

      // Use device orientation (if available) and default back to mouse on desktop.
      const camera = new DeviceOrientationCamera('DevOr_camera', new Vector3(0, 0, 0), BabylonProxy.scene);

      // BabylonProxy targets the camera to scene origin.
      camera.setTarget(new Vector3(0, 0, 10));

      // BabylonProxy attaches the camera to the canvas.
      camera.attachControl(BabylonProxy.canvas, true);

      // Setup pointer down (click) events.
      BabylonProxy.scene.onPointerDown = (event, pickInfo ) => {
        // Did we hit something with the ray cast?
        if (pickInfo.hit) {
          if (pickInfo.pickedMesh.name === 'annotation') {
            camera.detachControl(BabylonProxy.canvas);
            makeAnnotation(pickInfo.pickedMesh.metadata);
          }
        }
      };

      /**
       * makeAnnotation
       * @param {object} metadata - Mesh metadata.
       * @param {string} metadata.title - Title of annotation.
       * @param {string} metadata.content - Content of annotation.
       */
      function makeAnnotation ({ title, content }) {
        const el = document.createElement('md-dialog');
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

    // Show the canvas.
    $('renderCanvas').show();
  }

  /**
   * Clears all current meshes from the scene.
   * @function clearScene
   */
  static clearScene () {
    // If there is a scene, clear it.
    if (BabylonProxy.scene !== null) {
      // Remove all meshes.
      // Meshes can be live when iterating over the collection.
      // BabylonProxy freezes the collection and allows us to remove each mesh.
      while (BabylonProxy.scene.meshes.length) {
        const mesh = BabylonProxy.scene.meshes[0];
        mesh.dispose();
      }
    }

    // Hide the canvas.
    $('renderCanvas').hide();

    // Show passage (again).
    $('tw-passage').show();
  }

  /**
   * generateScene
   * @param {object} jsObject - Object containing scene data.
   */
  static generateScene (jsObject) {
    // Look for each type of object in the collection.
    for (const shape of jsObject) {

      if(shape.hasOwnProperty('annotation') ) {
        Annotation(BabylonProxy.scene, BabylonProxy.mesh, shape);
      }
      
      if(shape.hasOwnProperty('photosphere') ) {
        Photosphere(BabylonProxy.scene, BabylonProxy.mesh, shape);
      }
    }
  }
}
