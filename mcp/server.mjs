import fs from "node:fs";
import path from "node:path";
import process from "node:process";

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const PLUGIN_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");

function safeJoin(root, rel) {
  const resolved = path.resolve(root, rel);
  if (!resolved.startsWith(root)) {
    throw new Error("Path traversal blocked");
  }
  return resolved;
}

function readTextFile(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function listFilesRecursive(dirPath) {
  const out = [];
  if (!fs.existsSync(dirPath)) return out;
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const p = path.join(dirPath, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(p));
    else out.push(p);
  }
  return out;
}

function latestFileIn(dirPath, extensions = [".md", ".log", ".json", ".yml", ".yaml"]) {
  const files = listFilesRecursive(dirPath).filter((f) => extensions.includes(path.extname(f).toLowerCase()));
  if (files.length === 0) return null;
  files.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  return files[0];
}

function toFileResource(uri, filePath, mimeType = "text/plain") {
  return {
    uri,
    name: uri,
    mimeType,
    async read() {
      return {
        contents: [
          {
            uri,
            mimeType,
            text: readTextFile(filePath)
          }
        ]
      };
    }
  };
}

const server = new McpServer({
  name: "newt-mcp-server",
  version: "1.1.0",
  description: "Newt AI development assistant MCP server"
});

// --------------------
// Resources
// --------------------
server.resource(
  "config-default",
  "config://default.yml",
  async () => {
    const filePath = safeJoin(PLUGIN_ROOT, "config/default.yml");
    return {
      contents: [{ uri: "config://default.yml", mimeType: "text/yaml", text: readTextFile(filePath) }]
    };
  }
);

server.resource(
  "config-schema",
  "config://schema.json",
  async () => {
    const filePath = safeJoin(PLUGIN_ROOT, "config/schema.json");
    return {
      contents: [{ uri: "config://schema.json", mimeType: "application/json", text: readTextFile(filePath) }]
    };
  }
);

server.resource(
  "logs-reviews-latest",
  "logs://reviews/latest",
  async () => {
    const latest = latestFileIn(safeJoin(PLUGIN_ROOT, "logs/reviews"));
    if (!latest) {
      return { contents: [{ uri: "logs://reviews/latest", mimeType: "text/plain", text: "None" }] };
    }
    return {
      contents: [{ uri: "logs://reviews/latest", mimeType: "text/markdown", text: readTextFile(latest) }]
    };
  }
);

server.resource(
  "logs-brainstorm-latest",
  "logs://brainstorm/latest",
  async () => {
    const latest = latestFileIn(safeJoin(PLUGIN_ROOT, "logs/brainstorm"));
    if (!latest) {
      return { contents: [{ uri: "logs://brainstorm/latest", mimeType: "text/plain", text: "None" }] };
    }
    return {
      contents: [{ uri: "logs://brainstorm/latest", mimeType: "text/markdown", text: readTextFile(latest) }]
    };
  }
);

server.resource(
  "agents-list",
  "agents://list",
  async () => {
    const dir = safeJoin(PLUGIN_ROOT, "agents");
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
    const text = files.length ? files.map((f) => `- ${f.replace(/\.md$/i, "")}`).join("\n") : "None";
    return { contents: [{ uri: "agents://list", mimeType: "text/markdown", text }] };
  }
);

server.resource(
  "skills-list",
  "skills://list",
  async () => {
    const dir = safeJoin(PLUGIN_ROOT, "skills");
    const skills = fs.existsSync(dir)
      ? fs
          .readdirSync(dir, { withFileTypes: true })
          .filter((d) => d.isDirectory())
          .map((d) => d.name)
      : [];
    const text = skills.length ? skills.map((s) => `- ${s}`).join("\n") : "None";
    return { contents: [{ uri: "skills://list", mimeType: "text/markdown", text }] };
  }
);

// --------------------
// Tools
// --------------------
// NOTE: Newt is primarily a Claude Code-style plugin. MCP tools here return
// a deterministic "runbook" describing what command(s) to run in the IDE and
// how to interpret results.

function toolRunbook({ title, steps, outputs }) {
  return {
    content: [
      {
        type: "text",
        text: [
          `# ${title}`,
          "",
          "## Steps",
          ...steps.map((s) => `- ${s}`),
          "",
          "## Expected Output",
          ...outputs.map((o) => `- ${o}`)
        ].join("\n")
      }
    ]
  };
}

server.tool(
  "newt_review",
  {
    description: "Generate a runbook for running Newt /review in an agentic IDE.",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Optional path scope" },
        depth: { type: "string", enum: ["quick", "full"], default: "quick" },
        format: { type: "string", enum: ["markdown", "json", "summary"], default: "markdown" }
      }
    }
  },
  async (args) => {
    const scoped = args?.path ? ` --path ${args.path}` : "";
    const depth = args?.depth ? ` --depth ${args.depth}` : " --depth quick";
    const format = args?.format ? ` --format ${args.format}` : "";

    return toolRunbook({
      title: "Newt Code Review",
      steps: [
        "Open your agentic IDE (Claude Code, Windsurf, Cursor) in the target repo.",
        `Run: /review${scoped}${depth}${format}`,
        "Inspect output sections and address Critical/High issues.",
        "Optionally open logs://reviews/latest via MCP to retrieve the latest review log."
      ],
      outputs: [
        "Deterministic review sections (summary, issues, recommendations)",
        "A review log written under logs/reviews/"
      ]
    });
  }
);

server.tool(
  "newt_pr_review",
  {
    description: "Generate a runbook for Newt /pr-review (staged/branch/massive/hotfix/refactor).",
    inputSchema: {
      type: "object",
      properties: {
        mode: {
          type: "string",
          enum: ["live", "staged", "branch", "massive", "hotfix", "refactor"],
          default: "staged"
        },
        branch: { type: "string", description: "Branch name when mode=branch" },
        path: { type: "string", description: "Optional path scope" },
        format: { type: "string", enum: ["markdown", "json", "summary"], default: "markdown" }
      }
    }
  },
  async (args) => {
    const mode = args?.mode ?? "staged";
    const scoped = args?.path ? ` --path ${args.path}` : "";
    const format = args?.format ? ` --format ${args.format}` : "";

    const modeArg =
      mode === "branch"
        ? ` --branch ${args?.branch ?? "<branch>"}`
        : ` --${mode}`;

    return toolRunbook({
      title: "Newt PR Review",
      steps: [
        "Open your repo in an agentic IDE.",
        `Run: /pr-review${modeArg}${scoped}${format}`,
        "Apply commit boundary / PR split recommendations for large change sets.",
        "Optionally use templates/pr-description.md to structure PR text."
      ],
      outputs: ["Commit recommendations", "PR split plan", "Risk assessment"]
    });
  }
);

server.tool(
  "newt_brainstorm",
  {
    description: "Generate a runbook for Newt /brainstorm to produce ideas + ADR + experiment brief.",
    inputSchema: {
      type: "object",
      properties: {
        mode: { type: "string", enum: ["technical", "product", "process", "incident"], default: "technical" },
        topic: { type: "string" },
        path: { type: "string" },
        constraints: { type: "string" }
      },
      required: ["topic"]
    }
  },
  async (args) => {
    const mode = args?.mode ?? "technical";
    const pathArg = args?.path ? ` --path ${args.path}` : "";
    const constraintsArg = args?.constraints ? ` --constraints "${args.constraints.replace(/"/g, "\\\"")}"` : "";

    return toolRunbook({
      title: "Newt Brainstorming",
      steps: [
        "Open the repo in an agentic IDE.",
        `Run: /brainstorm --mode ${mode} --topic "${String(args.topic).replace(/"/g, "\\\"")}"${pathArg}${constraintsArg}`,
        "Review the Top Candidates and Decision Artifacts sections.",
        "If needed, refine by running /converge or /experiment-brief."
      ],
      outputs: ["Idea landscape", "Top 3 candidates", "ADR draft", "Experiment brief", "Brainstorm log"]
    });
  }
);

server.tool(
  "newt_converge",
  {
    description: "Generate a runbook for /converge to score and select top ideas.",
    inputSchema: {
      type: "object",
      properties: {
        ideas: { type: "string", description: "Paste list of ideas" },
        top: { type: "integer", default: 3 }
      },
      required: ["ideas"]
    }
  },
  async (args) => {
    return toolRunbook({
      title: "Newt Converge",
      steps: [
        "Open the repo in an agentic IDE.",
        `Run: /converge --ideas <paste ideas> --top ${args?.top ?? 3}`
      ],
      outputs: ["Scoring table", "Top candidates with trade-offs"]
    });
  }
);

server.tool(
  "newt_experiment_brief",
  {
    description: "Generate a runbook for /experiment-brief.",
    inputSchema: {
      type: "object",
      properties: {
        idea: { type: "string" },
        metrics: { type: "string" },
        constraints: { type: "string" }
      },
      required: ["idea"]
    }
  },
  async (args) => {
    const metricsArg = args?.metrics ? ` --metrics "${args.metrics.replace(/"/g, "\\\"")}"` : "";
    const constraintsArg = args?.constraints ? ` --constraints "${args.constraints.replace(/"/g, "\\\"")}"` : "";

    return toolRunbook({
      title: "Newt Experiment Brief",
      steps: [
        "Open the repo in an agentic IDE.",
        `Run: /experiment-brief --idea "${String(args.idea).replace(/"/g, "\\\"")}"${metricsArg}${constraintsArg}`
      ],
      outputs: ["Hypothesis", "Experiment design", "Instrumentation", "Rollout", "Kill criteria"]
    });
  }
);

server.tool(
  "newt_adr_draft",
  {
    description: "Generate a runbook for /adr-draft.",
    inputSchema: {
      type: "object",
      properties: {
        decision: { type: "string" },
        options: { type: "string" },
        constraints: { type: "string" }
      },
      required: ["decision", "options"]
    }
  },
  async (args) => {
    const constraintsArg = args?.constraints ? ` --constraints "${args.constraints.replace(/"/g, "\\\"")}"` : "";

    return toolRunbook({
      title: "Newt ADR Draft",
      steps: [
        "Open the repo in an agentic IDE.",
        `Run: /adr-draft --decision "${String(args.decision).replace(/"/g, "\\\"")}" --options "${String(args.options).replace(/"/g, "\\\"")}"${constraintsArg}`,
        "Optionally paste into templates/adr-template.md."
      ],
      outputs: ["ADR sections: context, decision, options, consequences, rollout"]
    });
  }
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);

process.on("SIGINT", () => process.exit(0));
