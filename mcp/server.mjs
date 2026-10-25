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

server.resource(
  "metrics-latest",
  "metrics://latest",
  async () => {
    const { metricsRegistry } = require('../lsp/metrics/observability');
    const data = metricsRegistry.toPrometheus();
    return { contents: [{ uri: "metrics://latest", mimeType: "text/plain", text: data }] };
  }
);

server.resource(
  "health-latest",
  "health://latest",
  async () => {
    const { observability } = require('../lsp/metrics/observability');
    const data = JSON.stringify(observability.getHealth(), null, 2);
    return { contents: [{ uri: "health://latest", mimeType: "application/json", text: data }] };
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
  async (_args) => {
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
  async (_args) => {
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
  async (_args) => {
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
  async (_args) => {
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
  async (_args) => {
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
  async (_args) => {
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


// Brand marketing MCP tools
server.tool(
  "newt_brand_strategy",
  {
    description: "Generate a runbook for /brand-marketing (brand strategy generation).",
    inputSchema: {
      type: "object",
      properties: {
        path: { type: "string", description: "Target repo path" },
        audience: { type: "string", description: "Target audience" },
        focus: { type: "string", description: "Focus area" }
      }
    }
  },
  async (_args) => {
    return {
      content: [{
        type: "text",
        text: [
          "# Newt Brand Strategy",
          "",
          "## Steps",
          "- Open your repo in Claude Code, Pi, or Codex.",
          "- Run `/brand-marketing` (or `/brand` for the new simplified command).",
          "- Answer the questionnaire to generate strategy.",
          "- Review outputs in `logs/brand/YYYY-MM-DD/`.",
          "",
          "## Expected Output",
          "- Brand Strategy Report (YAML/JSON)",
          "- Video Storyboard (Markdown)",
          "- Presentation Outline (Markdown)",
          "- PDF Brief (Markdown)"
        ].join("\n")
      }]
    };
  }
);

server.tool(
  "newt_video_storyboard",
  {
    description: "Generate a runbook for video storyboard from brand strategy.",
    inputSchema: {
      type: "object",
      properties: {
        duration: { type: "string", enum: ["30s", "60s", "90s", "120s"], default: "60s" }
      }
    }
  },
  async (_args) => {
    const duration = args?.duration ?? "60s";
    return {
      content: [{
        type: "text",
        text: `# Newt Video Storyboard\n\nSteps: Run /brand-marketing --video --duration ${duration}.\nExpected output: Storyboard with hook, problem, solution, proof, CTA scenes.`
      }]
    };
  }
);

server.tool(
  "newt_pdf_brief",
  {
    description: "Generate a runbook for PDF brief generation.",
    inputSchema: {
      type: "object",
      properties: {
        brand_strategy_path: { type: "string" }
      }
    }
  },
  async (_args) => {
    return {
      content: [{
        type: "text",
        text: `# Newt PDF Brief\n\nSteps: /brand-marketing --pdf\nExpected output: Executive brief with strategy, recommendations, action items.`
      }]
    };
  }
);

server.tool(
  "newt_metrics",
  {
    description: "Generate a runbook for retrieving Newt metrics (Prometheus format).",
    inputSchema: {
      type: "object",
      properties: {
        format: { type: "string", enum: ["prometheus", "json", "summary"], default: "prometheus" }
      }
    }
  },
  async (_args) => {
    const format = args?.format ?? "prometheus";
    return {
      content: [{
        type: "text",
        text: format === "prometheus"
          ? `# Newt Metrics (Prometheus)\n\nSteps: Run /metrics --format prometheus\nExpected output: Prometheus-format metrics including skill invocations, MCP calls, adversarial reviews, AI adoption events, command executions.`
          : format === "json"
            ? `# Newt Metrics (JSON)\n\nSteps: Run /metrics --format json\nExpected output: JSON metrics object with counters, gauges, histograms.`
            : `# Newt Metrics (Summary)\n\nSteps: Run /metrics --format summary\nExpected output: Human-readable summary of key metrics.`
      }]
    };
  }
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);

process.on("SIGINT", () => process.exit(0));
