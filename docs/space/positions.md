# Position

Trying to position things in Twine Space (based on AFrame) can seem slightly confusing. This is because its positioning system places a camera at 0, 1.6, 0 in its world space by default:

* 0 for x-axis (left and right)
* 1.6 for y-axis (up and down)
* 0 for z-axis (in front of and behind camera)

AFrame used meters as its base measurement. Because AFrame is also used to create VR projects (which most people stand up to experience), the default height is 1.6 meters with the assumption a person would be standing on 0 on the y-axis.

In order to perceive some shape based on the default camera position in a scene, generally the Z position should be negative and the Y value at or slight more than 1.6.

## Setting position

In Twine Space, `position` is an attribute value of a macro.

Example:

```twee
(box: position="0 1.6 -2")
```

In the above example, the box would match the default y-axis position of 1.6 meters and in front of the camera at `-2` away from is starting point.
