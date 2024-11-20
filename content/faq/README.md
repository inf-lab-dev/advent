# FAQ Entries

This document outlines the structure of the `faq` system. This is used to define faq entries for the system.

## FAQ Category Format

Every FAQ Category has its _own directory_ relative to this documentation. The _name_ of this directory is not used anywhere and thus can be used to specify a sort-order.
Inside this directory a single `_index.md` file is required. The questions are represented by any other markdown file than `_index.md`.

### `_index.md`

To configure the category this file should be used.

It must consist of a **first-level heading** as the first content in this file. This will be the name of the category.
Afterwards various content may follow, however this content will not be translated from markdown.

#### Example

```markdown
# Category Name

Description of the Category
```

### `*.md`

To configure any question this file should be used.

It must consist of a **first-level heading** as the first content in this file. This will be the name of the question.
Afterwards various content may follow, this time it will be translated to markdown.

#### Example

```markdown
# Question?

A _well_ **formatted** `Answer`!
```
