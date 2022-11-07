# Location-based

**Note:** In order to use AR attributes, the AR.js version of Twine Space must be loaded.

By default, Twine Space does not track GPS coordinates. To enable this, a camera macro must be added to the scene:

```twee
(camera: gps-camera rotation-reader)
```

## Setting GPS location per shape

The `gps-entity-place` attribute can be used to set the GPS coordinates of some macro in Twine Space. For example, to set a box at a specific point, it might be the following:

```twee
(box: color="red" scale="2 2 2" gps-entity-place="latitude: 41.72320; longitude: -73.93325")
```
