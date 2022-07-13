# Using AFrame

**Twine Space** draws heavily from the web framework AFrame for creating 3D, AR, and VR experiences.

## Macros, Not Elements

In AFrame, scenes are given structure through HTML elements and their attributes. This is changed slightly for **Twine Space**. Borrowing from another Twine 2 story format, **Harlowe**, macros are used to create a single scene per passage.

Scenes are automatically created by any use of macros. it is then removed when a reader navigates to the next passage, which may or may not itself have macros and create a new scene.
