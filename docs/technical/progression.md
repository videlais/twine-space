# Story progression

During the initial loading of the `tw-passagedata` element, an event listener was bound to the `tw-story` element. When a reader clicks on a link to possibly progress the story, this event triggers an examination of the hyperlinks's `data-passage` attribute (as created during the loading of the first passage object).

If there is a passage in the internal collection of the **Story** object matching the name, its content processed in the following way:

1) Hyperlinks with `data-passage` created.
2) AFrame or AR elements and attributes processed.
3) Any Markdown content processed and converted.

The content of the `tw-passage` passage is then replaced with the next content. This progresses the story to the current passage.
