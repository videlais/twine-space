# Position

Trying to position things in Twine Space (based on AFrame) can seem slightly confusing. This is because its positioning system places a camera by default at 0, 0, 0 in its world space.

Positioning:

* -X is to the left-hand side of the screen and +X is to the right-hand side.
* -Y is toward the bottom of the screen and +Y is toward the top.
* -Z is in front of the camera and +Z is "behind" the default camera position.

In order to perceive some shape based on the default camera position in a scene, generally the Z position should be negative and the Y value positive.

## Setting position

In Twine Space, `position` is an attribute value of a macro.

Example:

```twee
(box: position="0 2 -5")
```

In the above example, the box would be positioned close to or at the middle of the display space using the negative Z value to place it "in front of" the camera viewing the scene.
