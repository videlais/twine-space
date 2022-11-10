# Augmented Text (Barcode)

Hiro markers allow for creating projection-based projects by presenting the word "hiro" to AR.js for scanning and visual augmentation.

AR.js comes with an understanding of hiro markers as a present. When using the `(marker:)` macro in Twine Space, setting the present to `"hiro"` tells it to expect a hiro marker.

## Example

```twee
(marker: preset="hiro")[
    (text: color="yellow" position="0 0 0" value="Augmented text!")
]
```

In the above code, detection of a hiro marker will prompt AR.js to add text in the color `yellow` with the `value` of `"Augmented text!"`.

## Live Version

[Link to HTML](augmented-hiro.html)
