# Story as object

## Load story

When the webpage is loaded by a browser, Twine Space creates an internal JavaScript object named **Story**.

This object looks for the `tw-passagedata` element in the HTML document and reads data from its attributes, recording this data internally as its own properties:

* *name*: `name`
* *startPassage*: `startnode` converted into a number
* *creator*: `creator`
* *creatorVersion*: `creator-version`
* *ifid*: `ifid`

(Story formats often ignore the `format` and `format-version` attributes, as this only has meaning within the Twine editor itself.)

## Load passages

The created **Story** object then moves through any `tw-passagedata` elements it finds, creating a collection of **Passage** objects internally.

Each created passage object has the following properties:

* *id*: Value of `pid` converted into a number
* *name*: `name`
* *tags*: `tags`, converting the space-separated list into an array
* *source*: Content of the element

(Story formats ignore the `position` and `size` attributes, as this only has meaning within Twine editor itself.)

During the parsing of any `tw-passagedata` elements, the content of the element is also unescaped into code Twine Space understands.

The **Story** object next finds the element to hold the story (`tw-story`) it is about to run and prepares an event listener for any `click` events happening within it in the future.

Finally, the **Story** object creates a new element (`tw-passage`) to hold any passages it will show to a reader.

## Story start

The story begins by loading the passage content whose *pid* matches the *startPassage* value from the `tw-passagedata` element.

First, any links contained with in the text are converted from the double square-brackets form into hyperlinks with the destination passage set as the `data-passage` attribute. This is mapped in the following way:

```twee
[[Destination]]
```

```html
<tw-link role="link" data-passage="Destination">Destination</tw-link>
```

Second, the resulting text is then parsed for any creation of AFrame scenes or associated elements.

Third, once AFrame or AR.js elements have been loaded, any remaining text content is converted from Markdown into HTML elements.

The current content of `tw-passage` is then replaced with the output from the parsing process.
