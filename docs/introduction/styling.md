# Styling

TwineSpace supports a wide range of Markdown using markdown-it internally.

## Headings

```markdown
# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading
```

## Emphasis

```markdown
**This is strong emphasis.**

__This is strong emphasis.__

*This is emphasis.*

_This is emphasis_
```

## Lists

### Unordered

```markdown
+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!
```

### Ordered

```markdown
1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
```

```markdown
1. You can use sequential numbers...
1. ...or keep all the numbers as `1.`
```

Start numbering with offset:

```markdown
57. foo
1. bar
```

The [markdown-it demo page](https://markdown-it.github.io/) has the full set of supported symbols and outcome.
