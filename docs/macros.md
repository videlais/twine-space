# Macros

**Twine Space** borrows from another Twine 2 story format, Harlowe. Macros uses parentheses around the name of the functionality. Theses are mapped one-to-one from AFrame elements to macro names.

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
