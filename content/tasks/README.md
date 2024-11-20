# Advent Tasks

This document outlines the structure and purpose of the Advent Task JSON file format. This format is used to define tasks for the system.

## Task Format

Every task has its _own directory_ relative to this documentation. The _name_ of this directory specifies the _slug_ that will be used inside urls.
Inside this directory a single `manifest.json` file is required.

### `manifest.json`

To configure the entire task, the manifest file should be used. It's structured in JSON format with the following properties:

| Property             | Type                            | Description                                                                                                                                                                        |
| -------------------- | ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`              | string                          | The title of the task.                                                                                                                                                             |
| `candles`            | `0` \| `1` \| `2` \| `3` \| `4` | The amount of burning candles on the advent wreath.                                                                                                                                |
| `is_solution_public` | boolean                         | Determines whether the solution to the task is publicly visible (`true`) or still encrypted (`false`).                                                                             |
| `is_draft`           | boolean                         | Determines whether the task is is rendered (`true`) or hidden from the ui(`false`). This does not offer any sort of protection as the task is still visible inside the repository. |
| `navigation`         | object                          | Specifies settings for the automatic navigation-bar generation.                                                                                                                    |
| `navigation.weight`  | number                          | The sort-order of this task inside the main navigation, higher values get rendered first.                                                                                          |
| `navigation.title`   | string                          | The title of this item inside the navigation-bar.                                                                                                                                  |
| `files`              | object                          | Specifies the file paths for the task content and solution. See the compound properties for details.                                                                               |
| `files.content`      | string                          | The relative path to the task content file which will be rendered from markdown.                                                                                                   |
| `files.solution`     | string                          | undefined                                                                                                                                                                          | The relative path to the solution file which will be rendered from markdown. If `is_solution_public` is `false`, then a decryption-key will be used prior to rendering this file. This may be omitted if a task has no solution. |

#### Example

```json
{
    "advent": 1,
    "title": "Aufgabentitel",
    "is_solution_public": true,
    "files": {
        "content": "./index.md",
        "solution": "./solution.md"
    }
}
```
