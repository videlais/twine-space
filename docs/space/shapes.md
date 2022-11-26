# Shapes

AFrame supports many basic 3D shapes:

* Box
* Circle
* Cone
* Cylinder
* Plane
* Sphere
* Triangle

Mapped to TwineSpace macros, each shape can be used with opening and closing parentheses format. For example, to create a box, the code would be `(box:)`.

Every shape supports the same starting set of attributes:

* **position**: three values defining the X, Y, and Z position separated by spaces.
* **scale**: the scaling of some shape defined across X-, Y-, and Z-axis separated by spaces.
* **color**: the color of the shape defined using CSS color terms such as named colors (e.g. "red") or hexadecimal values (e.g. "#ff5733").
* **rotation**: rotation in degrees per axis separated by spaces.

For some shapes, additional attributes can be used:

* Boxes and planes support `width` and `height`.
* Spheres support `radius`.
* Cones support `radius-bottom` and `radius-top`.
* Triangle support `vertex-c`.
* Cylinder supports `height` and `radius`.
