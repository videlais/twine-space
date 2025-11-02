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

/**
 * @class Director
 * @classdesc Director is a static class that manages the scene and engine.
 * It is responsible for creating the scene, pausing the scene, and stopping the scene.
 * It also provides a method to clear the scene of all meshes.
 * @static
 * @property {Scene} scene - The scene.
 * @property {Engine} engine - The engine.
 * @property {HTMLElement} canvas - The canvas.
 * @property {boolean} isPaused - Is the scene paused?
 */
export default class Director {
  // Scene.
  static scene = null;

  // Engine.
  static engine = null;

  // Canvas.
  static canvas = null;

  // isPaused.
  static isPaused = true;

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
   * @function createScene
   * @static
   * @returns {void}
   */
  static createScene () {
    // If there is not a scene, create one.
    // Otherwise, do nothing.
    if (Director.scene === null) {
      // Find canvas.
      Director.canvas = $('#renderCanvas')[0];

      // Does the canvas exist?
      if (Director.canvas.length === 0) {
        // Create canvas.
        Director.canvas = $('<canvas id="renderCanvas" touch-action="none" display="none"></canvas>')[0];
        // Add to body.
        $('body').append(Director.canvas);
      }

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
       * @function makeAnnotation
       * @param {object} metadata - Mesh metadata.
       * @param {string} metadata.title - Title of annotation.
       * @param {string} metadata.content - Content of annotation.
       * @description Creates an annotation dialog with sanitized content.
       * Note: title and content are sanitized to prevent XSS attacks.
       */
      function makeAnnotation ({ title, content }) {
        const el = document.createElement('md-dialog');
        el.setAttribute('type', 'alert');
        
        // Create and sanitize headline
        const headline = document.createElement('div');
        headline.setAttribute('slot', 'headline');
        headline.textContent = title; // textContent automatically escapes HTML
        
        // Create and sanitize content
        const form = document.createElement('form');
        form.setAttribute('slot', 'content');
        form.setAttribute('id', 'form-id');
        form.setAttribute('method', 'dialog');
        form.textContent = content; // textContent automatically escapes HTML
        
        // Create actions
        const actions = document.createElement('div');
        actions.setAttribute('slot', 'actions');
        const button = document.createElement('md-text-button');
        button.setAttribute('form', 'form-id');
        button.textContent = 'Close';
        actions.appendChild(button);
        
        // Assemble dialog
        el.appendChild(headline);
        el.appendChild(form);
        el.appendChild(actions);

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
        // If the scene is ready, resize the engine.
        if (Director.isReady()) {
          // Resize the engine.
          Director.engine.resize();
        }
      });

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
  }

  /**
   * Unpause the scene rendering.
   * @function run
   * @static
   * @returns {void}
   */
  static run () {
    // Hide the Passage.
    $('tw-passage').css('display', 'none');

    // Show the canvas.
    $('#renderCanvas').css('display', 'inline');

    // Set isPaused to false.
    Director.isPaused = false;
  }

  /**
   * Stop rendering the scene.
   * @function stop
   * @static
   * @returns {void}
   */
  static stop () {
    // Hide the canvas.
    $('#renderCanvas').css('display', 'none');

    // Show the passage.
    $('tw-passage').css('display', 'inline');

    // Set isPaused to true.
    Director.isPaused = true;
  }

  /**
   * Clears all current meshes from the scene.
   * @function clearScene
   * @static
   * @returns {void}
   */
  static clearScene () {
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
