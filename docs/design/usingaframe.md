# Using AFrame

**Twine Space** draws heavily from the web framework AFrame for creating 3D, AR, and VR experiences.

## Macros, Not Elements

In AFrame, scenes are given structure through HTML elements and their attributes. This is changed slightly for **Twine Space**. Borrowing from another Twine 2 story format, **Harlowe**, macros are used to create a single scene per passage.

Scenes are automatically created by any use of macros. it is then removed when a reader navigates to the next passage, which may or may not itself have macros and create a new scene.

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

Translated into **Twine Space** macros, the previous would be the following:

```twee
(box: 
    position="-1 0.5 -3"
    rotation="0 45 0"
    color="#4CC3D9"
)
```

The creation of the `<a-scene>` element is never needed in **Twine Space**, as any use of macros will automatically create the root element. If it already exists, the current one is assumed to be the root and a second is not created.

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

When the above code is processed, **Twine Space** will embed the AFrame scene directly and not create a new scene.

**Note:** The use of `(embed-scene: name)` should always be used before any other macros. These will then use the embedded `<a-scene>` rather than create a new one.

