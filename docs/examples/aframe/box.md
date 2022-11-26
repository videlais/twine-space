# Example: Creating a Box

One of the easiest shapes to create is a box. This is a shape built into AFrame and mapped to TwineSpace using the same name.

Like all shapes, AFrame needs to know where to place the shape in the scene, a `position` attribute.

By default, the starting camera position is also 0, 1.6, 0 for the x-, y-, and z-axis points.

```twee
(box: position="0 1.6 -1")
```

When creating a shape, AFrame assigns a default color of `white`. On a white background, the box would be invisible.

In order to see the box, it needs a color such as `red`:

```twee
(box: position="0 1.6 -1" color="red")
```

In the updated example, the box would be positioned slightly in front of the default camera position (`-1` on the z-axis). It would also be the color `red`.
