# Understanding Story Formats

In Twine, a *story format* controls the presentation (what CSS is used and where) and the interpretation (Markdown, links, and other code) data in Twine.

When a story is published using the Twine, it combines the story format with the content from the editor. How this combination works is defined as part of the [Twine Specifications: HTML Output](https://github.com/iftechfoundation/twine-specs/blob/master/twine-2-htmloutput-spec.md).

The following is a summary of the specification explaining two core Twine HTML elements: `<tw-storydata>` and `<tw-passagedata>`.

## Story as Data

A published story contains HTML based on the content input from an author in Twine. This HTML starts with an element named `tw-storydata`. This holds the *story data* and is part of a set of elements beginning with `tw` for "Twine".

The `tw-storydata` element contains multiple attributes with data based on the story itself. These include the following:

* `name`: Name of story
* `startnode`: The `pid` of the passage for the start of the story
* `creator`: What program created the data
* `creator-version`: What version of the creator software)
* `ifid`: Unique identification of the interactive fiction work
* `zoom`: Zoom level from Twine
* `format`: Story format used
* `format-version`: Version of the story format

**Example:**

```html
<tw-storydata 
    name="Test"
    startnode="1"
    creator="Twine"
    creator-version="2.3.16"
    ifid="D2E68815-A8DE-4DF2-A052-912C40BD6140"
    zoom="1"
    format="Twine Space"
    format-version="1.0.0">
</tw-storydata>
```

Each passage is a child element of the parent `tw-storydata`.

## Passage as Data

Each passage is encoded using an element named `tw-pasagedata`. This holds the *passage data* and is part of the set of elements beginning with `tw` for "Twine".

The `tw-passagedata` element uses multiple attributes:

* `pid`: The id of the passage
* `name`: Name of the passage
* `tags`: Any tags separated by spaces
* `position`: The position of the passage in the passage view from Twine
* `size`: The size of the passage in the passage view from Twine

The content of the element is *escaped*, a process through which special symbols are converted into their [HTML escaped form](https://en.wikipedia.org/wiki/Character_encodings_in_HTML#HTML_character_references). This prevents the web browser from accidentally attempting to run or otherwise parse the data before the passage is shown to the reader.

**Example:**

```html
<tw-passagedata 
    pid="1"
    name="Untitled Passage"
    tags=""
    position="412,186"
    size="100,100">[[Hyperlink]]</tw-passagedata>
```
