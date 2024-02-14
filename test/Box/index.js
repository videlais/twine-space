import Director from "../../src/Director.js";
import $ from "jquery";
import Box from "../../src/Actors/Box.js";

// Setup jQuery.
window.$ = $;

// Setup Director.
window.Director = Director;

// Add Box to Director.Shapes.
window.Director.Shapes = {
    Box: Box
};
