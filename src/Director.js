import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { DeviceOrientationCamera } from '@babylonjs/core/Cameras/deviceOrientationCamera.js';
// Side-effects only imports.
import '@babylonjs/core/Culling/ray.js';
import "@babylonjs/core/Materials/material.js";
import "@babylonjs/core/Materials/standardMaterial.js";

// Import jQuery
import $ from "jquery";

export default class Director {
  // Scene.
  static scene = null;

  // Engine.
  static engine = null;

  // Canvas.
  static canvas = null;

  // Mesh.
  static mesh = null;

  /**
   * Creates a scene.
   */
  static createScene () {
    // Hide the Passage.
    $('tw-passage').hide();

    // If there is not a scene, create one.
    // Otherwise, do nothing.
    if (Director.scene instanceof Scene === false) {

      // Append a Canvas element.
      $(document.body).append($('<canvas id="renderCanvas" touch-action="none" />'));

      // Find canvas.
      Director.canvas = document.getElementById('renderCanvas');

      // Create engine.
      Director.engine = new Engine(Director.canvas);

      // Create Scene.
      Director.scene = new Scene(Director.engine);

      // Use device orientation (if available) and default back to mouse on desktop.
      const camera = new DeviceOrientationCamera('DevOr_camera', new Vector3(0, 0, 0), Director.scene);

      // Director targets the camera to scene origin.
      camera.setTarget(new Vector3(0, 0, 10));

      // Director attaches the camera to the canvas.
      camera.attachControl(Director.canvas, true);

      // Setup pointer down (click) events.
      Director.scene.onPointerDown = (event, pickInfo ) => {
        // Did we hit something with the ray cast?
        if (pickInfo.hit) {
          if (pickInfo.pickedMesh.name === 'annotation') {
            camera.detachControl(Director.canvas);
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
          camera.attachControl(Director.canvas, true);
        });

        // Listen for accidental close.
        el.addEventListener('close', () => {
          // Reattach camera.
          camera.attachControl(Director.canvas, true);
        });

        // Show dialog.
        el.show();
      }

      // Render based on loop.
      Director.engine.runRenderLoop(() => {
        Director.scene.render();
      });
    }

    // Show the canvas.
    $('#renderCanvas').show();
  }

  /**
   * Clears all current meshes from the scene.
   * @function clearScene
   */
  static clearScene () {
    // If there is a scene, clear it.
    if (Director.scene instanceof Scene === false) {
      // Remove all meshes.
      // Meshes can be live when iterating over the collection.
      // Director freezes the collection and allows us to remove each mesh.
      while (Director.scene.meshes.length) {
        const mesh = Director.scene.meshes[0];
        mesh.dispose();
      }
    }

    // Hide the canvas.
    $('#renderCanvas').hide();

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
        Annotation(Director.scene, Director.mesh, shape);
      }
      
      if(shape.hasOwnProperty('photosphere') ) {
        Photosphere(Director.scene, Director.mesh, shape);
      }
    }
  }
}
