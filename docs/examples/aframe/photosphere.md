# Example: Creating a photosphere

A photosphere (sometimes called a "panoramic photograph" or "VR photo") is a special image created by combining multiple sources together to create a 360&deg; representation of some space.

In AFrame, a photosphere can be used as the "skybox" of some scene. This will place the image as the outer material of the scene, placing all other objects "inside" the perceived image of the outer "sky".

**Note:** Images work best in HTML (and Twine) as hosted in a public place such as GitHub Pages or via web hosting.

```twee
(sky: src="https://videlais.github.io/twine-space/examples/aframe/Office.PHOTOSPHERE.jpg")
```

In the above example, the photosphere created of an academic office will appear with the reader "inside" the outer skybox of the image once loaded.
