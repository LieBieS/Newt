# Newt MCP Server

This directory contains an MCP (Model Context Protocol) server that exposes Newt as MCP resources and tools.

## What you get

- **Resources**
  - `config://default.yml`
  - `config://schema.json`
  - `logs://reviews/latest`
  - `logs://brainstorm/latest`
  - `agents://list`
  - `skills://list`

- **Tools** (runbook-style)
  - `newt_review`
  - `newt_pr_review`
  - `newt_brainstorm`
  - `newt_converge`
  - `newt_experiment_brief`
  - `newt_adr_draft`

> Note: Newt's core execution happens inside agentic IDEs (Claude Code/Windsurf/Cursor). MCP tools currently provide deterministic runbooks for invoking those commands and retrieving artifacts/logs via MCP resources.

## Run

```bash
node mcp/server.mjs
```

## Claude Desktop config example

```json
{
  "mcpServers": {
    "newt": {
      "command": "node",
      "args": ["mcp/server.mjs"],
      "cwd": "/absolute/path/to/newt"
    }
  }
}
```
