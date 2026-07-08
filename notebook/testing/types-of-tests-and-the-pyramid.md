---
id: types-of-tests-and-the-pyramid
title: Types of Tests and the Testing Pyramid
sidebar_label: Types & the Pyramid
description: The three test scopes — unit, integration, and end-to-end — how the testing pyramid balances them, and the specialized test types (smoke, regression, performance, security, accessibility) that sit alongside.
---

# Types of Tests and the Testing Pyramid

Tests differ mainly by **scope** — how much of the system a single test exercises. Three scopes
cover most of what you'll write, and a simple model, the testing pyramid, tells you how to balance
them.

## Tests by scope

- **Unit test** — the most granular. Exercises a single unit of code (a function, a class) in
  isolation. Fast to run and fast to pin down what broke.
- **Integration test** — checks how different parts of the code interact: a service and its
  database, two modules across a boundary. It catches the bugs that live *between* units, which
  unit tests can't see.
- **End-to-end (E2E) test** — drives the whole application the way a real user would, usually
  through a real or mocked browser or device. Highest fidelity, and the slowest and most brittle.

## The testing pyramid

The pyramid encodes a trade-off. As you move up, tests get **slower, more expensive, and more
fragile** — so you write fewer of them.

```
          ┌───────┐          ▲
          │  E2E  │          │  slower
       ┌──┴───────┴──┐       │  costlier
       │ Integration │       │  more fragile
    ┌──┴─────────────┴──┐    │
    │       Unit        │    │  (fewer at the top,
    └───────────────────┘    │   more at the bottom)
```

The rule of thumb: **many unit tests, some integration tests, few E2E tests.** That shape keeps the
suite fast and cheap to run on every change, while still covering the real user flows where a break
would hurt most.

## Specialized test types

Scope isn't the only axis. Tests are also named by *what* they check:

- **Smoke tests** — quick checks that basic functionality works at all, before spending time on the
  rest.
- **Regression tests** — ensure previously working features haven't broken after a change.
- **Performance tests** — measure how fast the application responds under load.
- **Security tests** — check for vulnerabilities such as SQL injection or XSS.
- **Accessibility tests** — verify the application works for users with disabilities.

## The payoff

Naming the scope of a test tells you what it's good for and what it costs. The pyramid turns that
into a budget: lean on cheap, fast unit tests for coverage, reach for integration and E2E only
where they earn their cost, and add specialized types as the risk demands.

---
*Studied from freeCodeCamp's [Software Testing with Playwright](https://www.freecodecamp.org/news/software-testing-with-playwright/)
course ([video](https://www.youtube.com/watch?v=u6QfIXgjwGQ)).*
