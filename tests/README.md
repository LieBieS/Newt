# Newt Test Infrastructure

This directory hosts the multi-layer testing system described in the refinement plan. Each layer targets a specific quality dimension so we can validate agents, commands, and skills with precision before shipping.

## Directory Map
| Path | Purpose |
|------|---------|
| `unit/` | Fast agent/skill contract tests with mocked dependencies.
| `integration/` | Validates orchestrated flows (e.g., `/review`) against synthetic repos.
| `e2e/` | Full-stack simulations executed via Claude Code commands.
| `performance/` | Benchmarks for latency, memory, and throughput budgets.
| `fixtures/` | Reference repositories with known patterns, vulnerabilities, and performance hotspots.
| `data-generators/` | Scripts that synthesize new fixtures or datasets on demand.
| `mocks/` | Offline stand-ins for third-party services (CVE feeds, package registries, etc.).

## How to Run
1. Install dev dependencies: `npm install && pip install -r requirements.txt`.
2. Run fast unit tests: `npm run test:unit` (script TBD).
3. Execute integration suite: `npm run test:integration`.
4. Trigger e2e smoke: `npm run test:e2e -- --fixture clean-architecture`.
5. Launch performance benchmarks: `npm run test:perf`.

> Scripts referenced above will be added in Phase 2B. For now, the directory structure and test plans are authoritative.
