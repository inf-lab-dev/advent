# Advent Tasks

This document outlines the structure and purpose of the Advent Task JSON file format. This format is used to define tasks for the system.

## Task Format

Every task has its own directory relative to this documentation. Inside this directory a single `manifest.json` file is required.

### `manifest.json`

To configure the entire task, the manifest file should be used. It's structured in JSON format with the following properties:

| Property             | Type                     | Description                                                                                                                                                                       |
| -------------------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `advent`             | `1` \| `2` \| `3` \| `4` | The number representing the Advent sunday for this task.                                                                                                                          |
| `title`              | string                   | The title of the task.                                                                                                                                                            |
| `is_solution_public` | boolean                  | Determines whether the solution to the task is publicly visible (`true`) or still encrypted (`false`).                                                                            |
| `files`              | object                   | Specifies the file paths for the task content and solution. See the compound properties for details.                                                                              |
| `files.content`      | string                   | The relative path to the task content file which will be rendered from markdown.                                                                                                  |
| `files.solution`     | string                   | The relative path to the solution file which will be rendered from markdown. If `is_solution_public` is `false`, then a decryption-key will be used prior to rendering this file. |

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
