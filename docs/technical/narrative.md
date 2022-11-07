# From Data to Narrative Experience

When the webpage is loaded by a browser, Twine Space creates an internal JavaScript object named **Story**.

This object looks for the `tw-passagedata` element and reads data from its attributes, recording this data internally as its own properties:

* *name*: `name`
* *startPassage*: `startnode` converted into a number
* *creator*: `creator`
* *creatorVersion*: `creator-version`
* *ifid*: `ifid`

(Story formats often ignore the `format` and `format-version` attributes, as this only has meaning within Twine itself.)

The created **Story** object then moves through any `tw-passagedata` elements it finds, creating a collection of **Passage** objects.

Each created passage object has the following properties:

* *id*: Value of `pid` converted into a number
* *name*: `name`
* *tags*: `tags`, converting the space-separated list into an array
* *source*: Content of the element

(Story formats ignore the `position` and `size` attributes, as this only has meaning within Twine itself.)

The **Story** object next creates an element to hold the story (`tw-story`) it is about to run and prepares an event listener for any `click` events happening within it in the future.

Finally, the **Story** object creates a new element (`tw-passage`) to hold each passage it will show to a reader.

It is ready to start.
