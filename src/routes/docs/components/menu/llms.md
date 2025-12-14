# Menu Module

The `Menu` module provides a set of components and utilities to create and manage menus in your application. It is part of the `svelte-atoms` library.

## Features

- **Modular Design**: Easily integrate menu components into your application.
- **Customizable**: Supports various styles and configurations.
- **Accessible**: Built with accessibility in mind.

## Installation

To use the `Menu` module, ensure you have the `@svelte-atoms/core` library installed in your project:

```bash
npm install @svelte-atoms/core
```

## Usage

Import the `Menu` components into your project:

```typescript
import * as Menu from '@svelte-atoms/core';
```

### Example

Here is a basic example of how to use the `Menu` module:

```typescript
import { Menu } from '@svelte-atoms/core';

// Example usage
<Menu.ComponentName />
```

## Components

### Menu.Root

Root container for the menu system.

**Preset Key:** `menu`

**Props:**

{{menuRootProps}}

### Menu.Trigger

Element that triggers the menu.

**Preset Key:** `menu.trigger`

**Props:**

{{menuTriggerProps}}

### Menu.Content

The menu content container.

**Preset Key:** `menu.content`

**Props:**

{{menuContentProps}}

### Menu.Item

Individual menu item component.

**Preset Key:** `menu.item`

**Props:**

{{menuItemProps}}

## Installation

Contributions are welcome! Please follow the [contribution guidelines](../../CONTRIBUTING.md) to submit issues or pull requests.

## License

This module is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
