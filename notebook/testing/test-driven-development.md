---
id: test-driven-development
title: Test-Driven Development (TDD)
sidebar_label: TDD
sidebar_position: 3
description: The red-green-refactor loop that turns tests into a design tool — write a failing test first, make it pass with the minimum code, then improve — plus what separates a good test from a brittle one.
---

# Test-Driven Development (TDD)

TDD inverts the usual order: you write the test **before** the code. Each behavior grows through a
short loop that repeats.

## The red-green-refactor loop

1. **Red** — write a test for the behavior you want. It fails, because the code doesn't exist yet.
2. **Green** — write the *minimum* code to make that test pass. Nothing more.
3. **Refactor** — improve the code (and the test) while keeping it green.

Then repeat, one small behavior at a time. Because the test exists before the code, TDD doubles as
a **design tool**: it forces you to state *what* the code should do before deciding *how*. Focus
each test on what matters most — TDD isn't about covering every trivial line, it's about driving
the design of the behavior that carries real risk.

## What makes a good test

A useful mnemonic is **FIRST**:

- **Fast** — runs in milliseconds, so you run the suite constantly.
- **Isolated** — doesn't depend on other tests, shared state, or external services.
- **Repeatable** — same result every run, on any machine, in any order.
- **Self-validating** — asserts a clear pass/fail; no human reads output to judge it.
- **Timely** — written close to the code it covers (in TDD, just before).

Beyond FIRST, a good test:

- **tests behavior, not implementation** — it shouldn't break when you refactor internals that
  don't change the outcome;
- **fails for exactly one reason** — when it goes red, you know why without digging;
- **is readable** — it doubles as documentation of the intended behavior.

## The payoff

Done well, TDD produces a design shaped by how the code is actually used, and a suite of tests that
are fast, isolated, and honest about failure. The tests stop being a chore you add afterward and
become the thing that drives the code into shape.

---
*Studied from freeCodeCamp's [Software Testing with Playwright](https://www.freecodecamp.org/news/software-testing-with-playwright/)
course. The "what makes a good test" section (FIRST) is standard practice added for completeness.*
