# Story progression

The story starts when following things happen in sequence:

1. The **Story** object uses the value of *startPassage* to look for a **Passage** object in its collection with a matching *id*.
2. The *source* property of the matching **Passage** is unescaped (converted back into HTML).
3. The converted content is then *rendered*, a process by which any Markdown is converted into HTML and any hyperlinks are created. Inside each hyperlink is the attribute `data-passage` containing the destination passage of the hyperlink.
4. Any existing content inside the `tw-passage` element is replaced by the converted and rendered passage *source*.

## Clicking links

When a reader clicks on a link, the event listener inside **Story**:

1. Looks for the destination passage from the `data-passage` value of the hyperlink.
2. Finds the passage (if it exists) inside its collection based on its *name*.
3. Un-escapes the *source* of the passage.
4. Renders the *source* of the passage.
5. Replaces the current content of the `tw-passage` element with the unescaped and rendered *source* of the passage.
