---
date: 2025-03-08
title: "Zustand"
categories: ["react"]
---

## Contents

Via ChatGPT

## 🔍 The Core Architecture of Zustand
At its core, Zustand is a tiny state management library that maintains a global state store and allows components to subscribe to state changes with optimized reactivity.

## 1️⃣ Zustand’s Fundamental Building Blocks
Zustand operates on three primary mechanisms:

A. Store Creation (create())
Zustand’s create() function returns a store function that holds state and actions.
The store is just a function that provides access to its internal state.

B. State Management (set() and get())
set() updates the internal state and triggers reactivity.
get() retrieves the current state without triggering reactivity.

C. Subscription System
Components subscribe to state slices.
Zustand uses an optimized event-driven approach to ensure only components that use a specific part of the state re-render.

## 2️⃣ How Zustand Internally Manages State

🔹 Zustand’s Internal Store Structure
Zustand maintains a single store object with:

The Current State → A plain JavaScript object.
Setters and Getters → Functions to update and retrieve the state.

Subscriptions → A list of subscribers that are notified when the state changes.

Internally, the store looks something like this (simplified):

 ```ts
const store = {
    state: { count: 0 },
    listeners: new Set(),
    set: (fn) => { state = fn(state); store.notify(); },
    get: () => state,
    notify: () => store.listeners.forEach(listener => listener(state)),
};
```
Whenever set() is called, it:

Updates the state.

Triggers notify(), informing only relevant subscribers.

## 3️⃣ Reactivity: How Zustand Minimizes Re-Renders
Unlike React Context, which forces all consumers to re-render when state updates, Zustand only re-renders components that use the updated state.

🔹 How Zustand Achieves This

Each component subscribes to a specific slice of state.
Zustand uses shallow comparison to detect whether the slice actually changed.

If the slice hasn’t changed, the component does not re-render.

🔍 Example Internal Subscription Flow:

A component subscribes to state.count.

set() updates state.count = 1.

Zustand compares the previous and new value of count.

Only components using count re-render, while others remain unaffected.

This is far more efficient than React Context, where all consumers must re-render, even if they don’t use the changed state.

## 4️⃣ How Middleware and Persistence Work

Zustand wraps the store with middleware to add extra functionality like:

Persistence (localStorage, sessionStorage)

Logging (for debugging)

Redux DevTools Integration

🔹 How Middleware Works Internally

Middleware wraps set() to intercept state updates before they reach the store. For example, a persistence middleware might:

Intercept set().

Save the new state to localStorage.

Let the update proceed normally.

This is similar to Redux middleware, but without the boilerplate.

## 5️⃣ Zustand’s Internal API Overview

🔹 create()

Initializes the store.
Returns a hook (useStore) that allows components to subscribe.
🔹 set()
Updates the store state.
Notifies subscribers only if relevant data changed.
🔹 get()
Retrieves the state without triggering reactivity.
🔹 subscribe()
Allows non-React components (e.g., event listeners, WebSockets) to listen for changes.

🚀 TL;DR: How Zustand Works Under the Hood
Zustand creates a global store (plain object).
Components subscribe to slices of state rather than the entire store.
Zustand tracks dependencies efficiently to avoid unnecessary re-renders.

Middleware can enhance the store (e.g., persistence, logging).
Reactivity is optimized → Only components using updated state values re-render.
Would you like a deep dive into how Zustand’s subscription system compares to React Context’s? 🚀

## 🔍 How Zustand Works with Web Workers

Zustand can be used with Web Workers, but the mechanism is different from normal state updates because Workers run in a separate thread and don’t share memory with the main thread.

Since Web Workers communicate via message passing (postMessage() and onmessage), Zustand needs to act as a message broker between the React app and the Worker.

## 1️⃣ Core Challenge: Separate Memory Spaces

Unlike normal Zustand stores that share memory between components, a Web Worker:

Has its own isolated memory → It can’t directly modify Zustand state.

Communicates via messages → The main thread must send/receive updates explicitly.

Can’t access React’s DOM → Zustand needs to listen for Worker messages and update state accordingly.

So instead of calling set() directly inside Zustand, we listen for messages from the Worker and update Zustand accordingly.

## 2️⃣ Internal Mechanism: How Zustand Bridges React and a Worker

🔹 How It Works Under the Hood

Zustand initializes state and spawns the Web Worker.
Worker does background processing (e.g., timing logic, audio synthesis).

Worker sends messages to Zustand, and Zustand updates state.
Zustand state updates trigger React reactivity, and components update accordingly.

Actions from React send messages to the Worker (e.g., start/stop timers).

## 3️⃣ Zustand as a Worker Message Broker

Since the Worker can’t directly modify Zustand state, the main thread acts as a mediator:

The Worker processes logic (e.g., timing for a metronome).

It sends results back to Zustand via onmessage.

Zustand updates state so React components can reactively update.

When React triggers an action, Zustand sends a message to the Worker.

###🔹 Internal Flow Overview

✅ Main Thread (Zustand)
Creates the Web Worker.
Listens for messages (onmessage).
Calls set() to update Zustand state.
Sends commands to the Worker (postMessage).

✅ Worker Thread
Runs heavy computations (e.g., scheduling a metronome tick).
Posts messages to the main thread.
Listens for commands from Zustand.

## 4️⃣ How Zustand Handles Messages Efficiently

Since Zustand minimizes re-renders, it only updates when necessary, even when handling Worker messages.

🔹 How Zustand Optimizes Worker Integration

Debouncing: If the Worker sends frequent updates (e.g., every millisecond), Zustand can batch updates to prevent React from re-rendering too often.

Selective Updates: Zustand allows subscribing to specific state slices, so only components using that slice will update.
Async Handling: Since messages from Workers are asynchronous, Zustand can handle them in a non-blocking way.

🚀 TL;DR: Zustand + Web Workers

Zustand acts as a bridge between React and the Worker.
Worker handles heavy computations (e.g., metronome timing, audio scheduling).
Zustand listens for messages and updates state only when necessary.
React components stay reactive without unnecessary re-renders.
