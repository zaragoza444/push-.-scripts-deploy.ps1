---
name: agent-customization
user-invocable: true
description: "Create, update, validate, and review VS Code agent customization files for this repository. Use when you need to author or fix `*.instructions.md`, `*.prompt.md`, `*.agent.md`, `SKILL.md`, `copilot-instructions.md`, or `AGENTS.md` files."
---

# Agent Customization Workflow

This skill captures the workflow for building and maintaining VS Code agent customization artifacts in this workspace.

## When to use

- You need a workspace-scoped customization for this repository.
- You want to author or update a skill, prompt, agent, or instruction file.
- You need to validate frontmatter and placement for VS Code customization files.

## Step-by-step process

1. Determine scope
   - Workspace-specific customizations belong under `.github/`.
   - User-level customizations belong under your VS Code prompts folder.

2. Choose the right primitive
   - `*.instructions.md` for file-specific guidance and coding conventions.
   - `*.prompt.md` for a parameterized task or single-command workflow.
   - `*.agent.md` for multi-stage workflows with tool restrictions or context isolation.
   - `SKILL.md` for reusable, on-demand workflow assets and decision logic.
   - `copilot-instructions.md` or `AGENTS.md` for global agent behavior and project-wide guidance.

3. Create the file
   - Use YAML frontmatter with `name`, `description`, and any applicable metadata.
   - Keep `description` explicit and keyword-rich so the agent can discover the skill.
   - Include clear sections for intent, steps, decision points, and completion criteria.

4. Validate the result
   - Confirm the file path is correct for the chosen customization type.
   - Ensure YAML uses spaces only, has matching `---` markers, and quotes descriptions containing colons.
   - Verify the `description` matches the expected trigger phrases for the workflow.

5. Review and test
   - Use the skill to generate or refine a customization file.
   - Check that the agent loads the skill when asked to create or fix customization files.

## Decision points

- If the workflow is broad and applies across many repo files, prefer `copilot-instructions.md` or `AGENTS.md`.
- If the workflow is a one-off or single-step task, use `*.prompt.md` instead of a full skill.
- If you need strict enforcement or lifecycle hooks, consider `*.agent.md` with hook definitions.

## Quality criteria

- The skill is workspace-scoped and stored under `.github/skills/agent-customization/`.
- The `description` clearly states when to use the skill and what file types it covers.
- The instructions are actionable and include a validation checklist.
- The workflow is easy to follow for anyone editing or creating customization assets.

## Example prompts

- "Create a new workspace skill for agent customization files."
- "Help me author a `.prompt.md` for a repository-specific workflow."
- "Validate the YAML frontmatter for a custom VS Code prompt file."