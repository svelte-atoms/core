<script lang="ts">
	let { data } = $props();
	const { metadata } = $derived(data);
</script>

---
id: variants
title: Variants System
category: styling
depth: intermediate
prerequisites:
  - styling
related:
  - preset
  - motion
---

# Variant System

## Overview

The variant system in @svelte-atoms/core provides a powerful way to define component styling variations. It's deeply integrated with the [preset system](./preset.md), allowing both global theming and local customization.

## Problem Statement

Currently, creating component variants (size, variant, appearance, etc.) requires:

\`\`\`svelte
<script>
	let { variant = 'primary', size = 'md' } = $props();

	const variantClasses = {
		primary: 'bg-blue-500 text-white hover:bg-blue-600',
		secondary: 'bg-gray-500 text-white hover:bg-gray-600',
		danger: 'bg-red-500 text-white hover:bg-red-600'
	};

	const sizeClasses = {
		sm: 'px-2 py-1 text-sm',
		md: 'px-4 py-2 text-base',
		lg: 'px-6 py-3 text-lg'
	};
</script>

<HtmlAtom class={\`\${variantClasses[variant]} \${sizeClasses[size]}\
