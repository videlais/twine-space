# Working with text

Text content exists as both its own macro and as a possible attribute value for many shapes such as plane, box, and others.

## As Macro

The simplest version of the `(text:)` macro requires two attributes: `position` and `value`:

```twee
(text: position="0 1.6 -1" value="Hi!")
```

The `value` attribute contains the text content to show and `position` where to place the entity within the scene.

## As attribute

When used as an attribute, the internal components become properties and do not need quotation marks around them. In the following example, the plane would contain text of the color `red` and `value` of `"Hi!`".

Instead of spaces, there is a semicolon between property values. This is because the components are treated as JavaScript values instead of HTML attributes by AFrame.

```twee
(plane: position="0 1.6 -1" color="black" text="value: Hi!; color: red;")
```
