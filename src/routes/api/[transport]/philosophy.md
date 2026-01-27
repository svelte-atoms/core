---
id: philosophy
title: Library Philosophy
category: concepts
depth: foundational
prerequisites: []
related:
  - overview
  - crafting
---

# Atoms Philosophy

## Core Concepts

The `atoms` UI library is inspired by chemistry concepts, providing two fundamental building blocks:

### Atom

- **Definition**: A simple, reusable UI component with a single responsibility
- **Purpose**: Represents the smallest unit of UI functionality
- **Examples**: Button, Input, Badge, Avatar
- **Principle**: Each atom focuses on doing one thing well

### Bond

- **Definition**: A communication mechanism that connects multiple atoms together
- **Purpose**: Manages shared state and enables communication between connected atoms
- **State Management**: The bond maintains internal state accessible to all bonded atoms
- **Scope**: Bond state is accessible to bonded atoms and their descendant components
- **Implementation Pattern**: Bonds are typically created and shared in `*-root.svelte` components

## Rendering System

All atoms are rendered internally using the base `atom.svelte` component, which provides three variants: `Html`, `Svg`, and `Mathml`.

### Core Features

#### 1. Styling & Customization

- **TailwindCSS Support**: Full integration with TailwindCSS for styling customization
- **Dynamic Element Control**: Use the `as` prop to change the underlying HTML element (e.g., render as `button`, `div`, or `span`)

#### 2. Lifecycle Hooks

All lifecycle hooks expose the host element in their props for easy integration:

- **`onmount`**: Triggered when component is mounted to the DOM
- **`ondestroy`**: Triggered when component is removed from the DOM

#### 3. Animation & Transition Hooks

Designed for seamless integration with third-party animation libraries (`gsap`, `motion`, `anime.js`):

- **`initial`**: Set the initial style state before the component enters
- **`enter`**: Define the enter transition when component appears
- **`exit`**: Define the exit transition when component disappears
- **`animate`**: Animate style changes in response to data updates

#### 4. Extensibility

- **Base Component Override**: Provide a custom base component to extend functionality
- **Snippet Support**: Use snippets to inject additional features into atoms
- **Purpose**: Allows flexible extension without modifying core atom implementation

## Composition Pattern

### Design Principle

All atoms inherit from the base `atom.svelte` component, making them **composable by default**.

### Practical Examples

Components can be composed together to create complex interactions:

- **Dropdown Trigger**: Can be a `Button`, `Avatar`, `Badge`, or `Input`
- **Modal Trigger**: Can be any clickable atom like `Button` or `Link`
- **Form Field**: Can combine `Input`, `Label`, and `ErrorMessage` atoms

### Benefits

- **Flexibility**: Mix and match atoms to create custom component combinations
- **Reusability**: Use the same atoms in different contexts and compositions
- **Consistency**: Shared base ensures uniform behavior across all composed components
