# Test Fixtures

This directory contains test fixtures for validating Newt's agents and skills.

## Purpose

Test fixtures are intentionally flawed code samples that demonstrate anti-patterns, vulnerabilities, and quality issues that Newt should detect.

## Fixtures

### sample-god-class.ts
**Purpose**: Test `detect-god-class` skill
**Issues**: 
- 500+ lines of code
- 30+ public methods
- Multiple responsibilities (user management, auth, email, logging)
- Violates single responsibility principle

**Expected Detection**:
- Lines of code exceeds threshold (400)
- Public methods exceed threshold (20)
- Multiple domain responsibilities detected

### sample-circular-deps/ (TODO)
**Purpose**: Test `detect-circular-deps` skill
**Issues**: Circular module dependencies

### sample-sql-injection/ (TODO)
**Purpose**: Test `detect-sql-injection` skill
**Issues**: Unsafe SQL string concatenation

### sample-vulnerable-deps/ (TODO)
**Purpose**: Test `dependency-audit` skill
**Issues**: Outdated packages with known CVEs

### sample-component.tsx
**Purpose**: Test UI/UX skills (`detect-accessibility-issues`, `component-consistency-checker`)
**Issues**:
- Missing accessible name on icon-only button
- Small touch target
- Form field missing an associated label

### sample-form.html
**Purpose**: Test `detect-accessibility-issues`
**Issues**:
- Inputs rely on placeholders instead of labels

### sample-layout.css
**Purpose**: Test `responsive-breakpoint-analyzer`
**Issues**:
- Layout shift risk (images without reserved dimensions)

## Usage

Test fixtures should NOT be imported or used in production code. They exist solely for validation and testing purposes.

## Adding New Fixtures

1. Create fixture file demonstrating specific anti-pattern
2. Document expected issues in this README
3. Add corresponding test in `tests/unit/` or `tests/integration/`
4. Ensure fixture triggers appropriate skills/agents
