---
name: agent-customization
user-invocable: true
description: "Create or update a VS Code agent customization file in this repository. Use this prompt for authoring `*.instructions.md`, `*.prompt.md`, `*.agent.md`, `SKILL.md`, `copilot-instructions.md`, or `AGENTS.md`."
---

Use this prompt to generate a complete workspace customization file for VS Code agent workflows.

Include:
- the kind of file to create or update (`instructions`, `prompt`, `agent`, `skill`, `copilot-instructions`, or `AGENTS`)
- the intended scope and target files or folders
- any repository-specific behavior, conventions, or tool restrictions
- a validation checklist for YAML frontmatter and file placement

Example:
"Create a workspace `*.instructions.md` file for repository-specific linting and code style rules in `shiva-blockchain/src/**`."
