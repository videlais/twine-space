# Marker-based

AR.js supports three types of marker-based experiences:

* Hiro
* Barcode
* Pattern

Markers are added to a scene using a special macro, `(marker:)`.

As mapped from AR.js, markers support a range of attributes:

* **preset:** When using `hiro`.
* **type:** the type of marker used. Either `barcode`, or `pattern`.
* **size:** size of the marker in meters.
* **url:** URL of the pattern, if type is also `pattern`.
* **value:** value of the barcode, if type is also `barcode`.

The `(marker:)` macro defines a parent relationship to other macros to be displayed if the marker is found.

For example, to display a red box when a hiro marker is detected the following code could be used:

```twee
(marker: preset='hiro')[
    (box: position='0 0.5 0' color="red")
]
```
