import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';
import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';
import { DeviceOrientationCamera } from '@babylonjs/core/Cameras/deviceOrientationCamera.js';
// Side-effects only imports.
import '@babylonjs/core/Culling/ray.js';
import '@babylonjs/core/Materials/material.js';
import '@babylonjs/core/Materials/standardMaterial.js';

// Import jQuery
import $ from 'jquery';

export default class Director {
  // Scene.
  static scene = null;

  // Engine.
  static engine = null;

  // Canvas.
  static canvas = null;

  // isPaused.
  static isPaused = false;

  /**
   * Creates a scene.
   *
   * This performs the following steps:
   * (1) Hides the tw-passage element.
   * (2) Creates a canvas element.
   * (3) Creates an engine.
   * (4) Creates a scene.
   * (5) Creates a camera.
   * (6) Attaches the camera to the canvas.
   * (7) Sets the camera target to the scene origin.
   * (8) Prepares the onPointerDown event.
   * (9) Renders the scene.
   * (10) Shows the canvas.
   */
  static createScene () {
    // Hide the Passage.
    $('tw-passage').hide();

    // If there is not a scene, create one.
    // Otherwise, do nothing.
    if (Director.scene === null) {
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
      Director.scene.onPointerDown = (event, pickInfo) => {
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

      // Handle window resize.
      window.addEventListener('resize', () => {
        Director.engine.resize();
      });
    }

    // Show the canvas.
    $('#renderCanvas').show();
  }

  /**
   * Renders the scene.
   *
   * This performs the following steps:
   * (1) Checks if the scene is ready.
   * (2) Runs the render loop.
   * (3) Checks if the scene is paused.
   * (4) Renders the scene.
   * @function render
   * @static
   * @returns {void}
   */
  static render () {
    // If the scene is not ready, do nothing.
    if (Director.isReady()) {
      // Run render loop.
      Director.engine.runRenderLoop(() => {
        // If the scene is not paused, render it.
        if (Director.isPaused === false) {
          // Render the scene.
          Director.scene.render();
        }
      });
    }
  }

  /**
   * Unpause the scene rendering.
   * @function run
   * @static
   * @returns {void}
   */
  static run () {
    // Set isPaused to false.
    Director.isPaused = false;
  }

  /**
   * Pauses the scene.
   * @function pause
   * @static
   * @returns {void}
   */
  static pause () {
    // Set isPaused to true.
    Director.isPaused = true;
  }

  /**
   * Clears all current meshes from the scene.
   * @function clearScene
   */
  static clearScene () {
    // Pause the scene.
    Director.pause();

    // If there is a scene, clear it.
    if (Director.scene !== null) {
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

    // Unpause the scene.
    Director.run();
  }

  /**
   * Check if the scene is ready.
   * @function isReady
   * @returns {boolean} - True if the scene is ready.
   */
  static isReady () {
    // Create default value.
    let ready = false;

    // Check if there is a scene.
    // If the scene is not null, check if it is ready.
    if (Director.scene !== null) {
      ready = Director.scene.isReady();
    }

    // Return the value.
    return ready;
  }
}
