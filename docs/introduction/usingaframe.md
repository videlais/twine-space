# Using AFrame

TwineSpace draws heavily from the web framework AFrame for creating 3D, AR, and VR experiences.

## Macros and attributes

In AFrame, scenes are given structure through HTML elements and their attributes. This is changed slightly for TwineSpace. Borrowing from another Twine 2 story format, Harlowe, macros are used to create a single scene per passage.

Scenes are automatically created by any use of macros. The current scene, if it exists, is then removed when a reader navigates to the next passage, which may or may not itself have macros and create a new scene.

## AFrame Mapping

Macros are mapped one-to-one from AFrame elements to macro names.

In AFrame, the following would be valid:

```html
<a-scene>
    <a-box 
        position="-1 0.5 -3"
        rotation="0 45 0"
        color="#4CC3D9"
    />
</a-scene>
```

Translated into TwineSpace macros, the previous would be the following with three attributes:

```twee
(box: 
    position="-1 0.5 -3"
    rotation="0 45 0"
    color="#4CC3D9"
)
```

The creation of the `<a-scene>` element is never needed in TwineSpace, as any use of macros will automatically create the root element. If it already exists, the current one is assumed to be the root and a second is not created.

To use an AFrame element converted into TwineSpace macros, use the the same general attributes but within an opening and closing parentheses format.

## Parent and children

AFrame supports having a single shape serve as the parent of others. TwineSpace also supports this with using square brackets following the use of the macro.

For example, the following code would position a sphere at the parent box's position as a child of the shape:

```twee
(box: position="1 1 -5")[
  (sphere: color="green" radius="1")
]
```

## Using `(embed-scene: name)`

In the cases where an author may want to embed an existing AFrame scene using only their HTML elements, the macro `(embed-scene: name)` allows them to specify an existing passage by `name`.

When the passage is run, these elements will be appended to the current document.

```twee
:: Start
(embed-scene: "Another")

:: Another
<a-scene>
    <a-entity position="-6 -1 0">
        <a-box position="0 0.2 0" color="#4CC3D9"></a-box>
    </a-entity>
</a-scene>
```

When the above code is processed, TwineSpace will embed the AFrame scene directly and not create a new scene.

**Note:** The use of `(embed-scene: name)` should always be used before any other macros. These will then use the embedded `<a-scene>` rather than create a new one.
