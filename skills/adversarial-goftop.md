---
title: adversarial-goftop
language: typescript
parameters:
  path: "string (required) -- path scope"
  depth: "enum: light, balanced, deep (default balanced) -- probe depth"
  lens: "enum: security, architecture, craftsmanship (default all) -- which lens"
---

# Adversarial GofT Reviewer

## Mission
From GoF, Fowler, and Uncle Bob perspectives, run adversarial probes:
- **What if** we attempt to break their design pattern rules?
- **What if** we test SOLID principle compliance?
- **What if** we look for Fowler code smells?
- **What if** we apply adversarial reasoning to find exploitable anti-patterns?

The skill returns deterministic findings structured as GofT violation catalog.

## GoF Pattern Violations (Adversarial Probes)

### Creational Patterns (What if we test violations?)
- **Abstract Factory Abuse** — What if we try to create family of product objects with incompatible interfaces?
- **Builder Complexity** — What if we attempt to construct objects that have too many optional parameters?
- **Factory Method Rigidity** — What if we try to force subclasses to expose internal details?
- **Prototype Cloning** — What if we expose mutable prototypes that cause side effects?

### Structural Patterns (What if we test coupling?)
- **Adapter Misuse** — What if we try to adapt something that's not truly adaptable?
- **Bridge Overdesign** — What if we try to extract both abstraction and implementation that aren't truly orthogonal?
- **Composite Abuse** — What if we try to treat leaf and composite nodes the same when they shouldn't be?
- **Decorator Side Effects** — What if we try to wrap a class that isn't designed for decoration?
- **Facade Flatness** — What if we try to mask a complex internal structure that still has hidden depth?
- **Flyweight Memory Explosion** — What if we try to share state where identity matters?
- **Proxy Remote Failure** — What if we try to proxy to a remote component that doesn't support our interface?

### Behavioral Patterns (What if we test interaction?)
- **Chain of Responsibility Blindness** — What if we try to add a handler where responsibility overlaps?
- **Command History State** — What if we try to log commands that mutate global state?
- **Iterator Exposure** — What if we try to expose internal iteration order that breaks encapsulation?
- **Mediator Tight Coupling** — What if we try to make a colleague mediator that should not coordinate?
- **Memento Snapshot** — What if we try to store state of objects that aren't deep-copyable?
- **Observer Race Condition** — What if we try to add listeners that trigger concurrent state mutations?
- **State Transition Hell** — What if we try to switch between states that have contradictory invariants?
- **Strategy Dead Switch** — What if we try to swap strategy implementations at runtime that aren't interchangeable?
- **Template Method Dependency** — What if we try to subclass a template method that depends on concrete steps?
- **Visitor Type Explosion** — What if we try to add new element types to a visitor that weren't anticipated?

## Fowler's Code Smell Probes (Adversarial Reasoning)

### Architecture Smells
- **Circular Dependencies** — What if we try to resolve a dependency cycle with wrapper components?
- **Global Data** — What if we try to modify global state from concurrent operations?
- **Interrupting Architecture** — What if we try to interrupt request processing mid-flow?
- **Pasture- to-Tower Conversion** — What if we try to redesign old cattle systems with new tower architecture?

### Code Smells
- **Big Balls of Mud** — What if we try to add structure to a monolithic blob?
- **Cargo Cult** — What if we try to implement patterns without understanding purpose?
- **Changes That Shook the World** — What if we try to make breaking changes without migration?
- **Code Duplication** — What if we try to refactor identical implementations into shared library?
- **God Class** — What if we try to extract methods and properties from an overdeveloped class?
- **Large Class** — What if we try to identify and split responsibilities across methods?
- **Layer Supertype** — What if we try to create an abstraction that breaks Law of Demeter?
- **Middle Man** — What if we try to eliminate a redundant abstraction layer?
- **Parallel Inheritance Hierarchies** — What if we try to merge parallel class hierarchies?
- **Smelly Step** — What if we try to identify low-value refactorings?

### Speculative Generality
- **Cookie Jar** — What if we try to store unrelated data in a single map?
- **Strange Loop** — What if we try to redesign a system that has recursive dependencies?
- **Tower of Babel** — What if we try to merge incompatible frameworks?

## Uncle Bob's Clean Code Probes (SOLID Violations)

### Single Responsibility Principle (SRP)
- **What if we try to find methods with multiple reasons to change?**
- **What if we test if a class has a single responsibility beyond its name?**

### Open/Closed Principle (OCP)
- **What if we try to extend a class that is not designed for extension?**
- **What if we check if our changes require modifying existing implementations?**

### Liskov Substitution Principle (LSP)
- **What if we try to use a subclass where a parent is expected and break invariants?**
- **What if we test if derived classes weaken contract?**

### Interface Segregation Principle (ISP)
- **What if we try to use interfaces that clients don't need?**
- **What if we test for Client-Specific interfaces?**

### Dependency Inversion Principle (DIP)
- **What if we try to depend on abstractions and find ourselves depending on details?**
- **What if we test if we can invert dependencies in a test?**

## Executable Findings (Sample Output)
```
GoFT Violations:
- Creational: Abstract Factory — Pattern <myapp.auth.AuthFactory> expected interfaces [TokenProvider, SessionStore] but receives incompatible implementation [RedisTokenProvider, MongoSessionStore] due to mismatched storage APIs.
  Location: src/auth/auth-factory.ts:14
  Risk: High — breaks abstraction boundary, introduces coupling.
  Recommendation: Create concrete factory <AuthFactory> that wraps implementations with uniform interface; apply Template Method if variations are sub-steps.

- Structural: Bridge Overdesign — Pattern <myapp.ui.ThemeEngine> extracts both Abstraction<Theme> and Implementation<DarkTheme> but abstraction exposes implementation details via getRawColor() method.
  Location: src/ui/theme-engine.ts:22
  Risk: Critical — violates Dependency Inversion.
  Recommendation: Move color calculation into Implementation; abstraction should expose only Theme interface.

- Behavioral: Observer Race Condition — Pattern <myapp.data.DataBus> adds multiple listeners that mutate shared MutableSharedState without synchronization.
  Location: src/data/data-bus.ts:48
  Risk: Medium — concurrent mutation can corrupt invariants.
  Recommendation: Extract immutable value objects; use Observer pattern with value snapshots.

- Fowler: Code Duplication — Code <src/api/handler.ts:103-115> and <src/api/middleware.ts:77-89> contain identical error serialization logic.
  Location: src/api/, two files
  Risk: Low — violates DRY, maintenance burden.
 Recommendation: Extract ErrorFormatter class; apply Template Method if serialization formats differ by endpoint.

- SOLID: SRP Violation — Class <src/queue.JobProcessor> has responsibilities: job execution, database persistence, monitoring, retry logic.
  Location: src/queue/job-processor.ts:1
 Risk: High — multiple reasons to change.
  Recommendation: Split into JobExecutor, JobPersistence, JobMonitor, JobRetryManager; use Facade pattern to present unified interface.
```

## Configuration
- `adversarial.goftop.enabled: true` (toggle)
- `adversarial.goftop.depth: light|balanced|deep` (scan depth)
- `adversarial.goftop.exclude-patterns: []` (ignore patterns)
- `adversarial.goftop.include-external: false` (test third-party packages)