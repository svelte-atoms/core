# Scrollable Component

A customizable scrollable component that allows you to define custom scrollbars using HTML elements that you can style as you like.

## Features

- Custom scrollbar design using HTML elements
- Horizontal and vertical scrolling support
- **New: Unified Track/Thumb components with direction prop**
- Draggable scrollbar thumbs
- Click-to-scroll on tracks
- Automatic scrollbar visibility based on content overflow
- Keyboard accessibility
- TypeScript support
- Fully customizable styling
- Backward compatibility with legacy API

## Components

### Scrollable.Root

The main scrollable container component.

**Preset Key:** `scrollable`

**Props:**

{{scrollableRootProps}}

### Scrollable.Container

The scrollable container that wraps the content.

**Preset Key:** `scrollable.container`

**Props:**

{{scrollableContainerProps}}

### Scrollable.Content

The actual content that can be scrolled.

**Preset Key:** `scrollable.content`

**Props:**

{{scrollableContentProps}}

### Scrollable.Track

Unified scrollbar track with direction prop.

**Preset Key:** `scrollable.track`

**Props:**

{{scrollableTrackProps}}

### Scrollable.Thumb

Unified scrollbar thumb with direction prop.

**Preset Key:** `scrollable.thumb`

**Props:**

{{scrollableThumbProps}}

## New Unified API

- `Scrollable.Root` - The main container component
- `Scrollable.Container` - The scrollable container that wraps the content
- `Scrollable.Content` - The actual content that can be scrolled
- `Scrollable.Track` - **New:** Unified scrollbar track with direction prop
- `Scrollable.Thumb` - **New:** Unified scrollbar thumb with direction prop

### Legacy API (Still Supported)

- `Scrollable.TrackX` - Horizontal scrollbar track
- `Scrollable.TrackY` - Vertical scrollbar track
- `Scrollable.ThumbX` - Horizontal scrollbar thumb (draggable)
- `Scrollable.ThumbY` - Vertical scrollbar thumb (draggable)

## Basic Usage

### New Unified API (Recommended)

```svelte
<script>
	import { Scrollable } from '@svelte-atoms/core';

	let scrollX = $state(0);
	let scrollY = $state(0);
</script>

<Scrollable.Root bind:scrollX bind:scrollY class="h-64 w-64 border">
	{#snippet children({ scrollable })}
		<Scrollable.Container>
			<Scrollable.Content>
				<!-- Your scrollable content here -->
				<div class="h-96 w-96 bg-gradient-to-br from-blue-400 to-purple-600">
					Large content that requires scrolling
				</div>
			</Scrollable.Content>
		</Scrollable.Container>

		<!-- Unified scrollbars with direction prop -->
		<Scrollable.Track direction="vertical" class="rounded bg-gray-200">
			<Scrollable.Thumb direction="vertical" class="rounded bg-gray-500 hover:bg-gray-600" />
		</Scrollable.Track>

		<Scrollable.Track direction="horizontal" class="rounded bg-gray-200">
			<Scrollable.Thumb direction="horizontal" class="rounded bg-gray-500 hover:bg-gray-600" />
		</Scrollable.Track>
	{/snippet}
</Scrollable.Root>
```

### Legacy API (Still Supported)

```svelte
<Scrollable.Root bind:scrollX bind:scrollY class="h-64 w-64 border">
	{#snippet children({ scrollable })}
		<Scrollable.Container>
			<Scrollable.Content>
				<!-- Your scrollable content here -->
				<div class="h-96 w-96 bg-gradient-to-br from-blue-400 to-purple-600">
					Large content that requires scrolling
				</div>
			</Scrollable.Content>
		</Scrollable.Container>

		<!-- Legacy separate components -->
		<Scrollable.TrackY class="rounded bg-gray-200">
			<Scrollable.ThumbY class="rounded bg-gray-500 hover:bg-gray-600" />
		</Scrollable.TrackY>

		<Scrollable.TrackX class="rounded bg-gray-200">
			<Scrollable.ThumbX class="rounded bg-gray-500 hover:bg-gray-600" />
		</Scrollable.TrackX>
	{/snippet}
</Scrollable.Root>
```

## Direction-Specific Examples

### Horizontal Only Scrolling

```svelte
<Scrollable.Root class="h-32 w-80 border">
	{#snippet children({ scrollable })}
		<Scrollable.Container>
			<Scrollable.Content>
				<div class="flex h-20 w-[600px] items-center gap-4">
					<!-- Horizontal content -->
				</div>
			</Scrollable.Content>
		</Scrollable.Container>

		<!-- Only horizontal scrollbar -->
		<Scrollable.Track direction="horizontal" class="bg-blue-200">
			<Scrollable.Thumb direction="horizontal" class="bg-blue-600" />
		</Scrollable.Track>
	{/snippet}
</Scrollable.Root>
```

### Vertical Only Scrolling

```svelte
<Scrollable.Root class="h-48 w-64 border">
	{#snippet children({ scrollable })}
		<Scrollable.Container>
			<Scrollable.Content>
				<div class="h-[400px] w-56">
					<!-- Vertical content -->
				</div>
			</Scrollable.Content>
		</Scrollable.Container>

		<!-- Only vertical scrollbar -->
		<Scrollable.Track direction="vertical" class="bg-green-200">
			<Scrollable.Thumb direction="vertical" class="bg-green-600" />
		</Scrollable.Track>
	{/snippet}
</Scrollable.Root>
```

## Advanced Usage

### Hide Native Scrollbars

```svelte
<Scrollable.Root hideScrollbar={true}>
	<!-- Component content -->
</Scrollable.Root>
```

### Disabled State

```svelte
<Scrollable.Root disabled={true}>
	<!-- Component content -->
</Scrollable.Root>
```

### Custom Styling

You can completely customize the appearance of the scrollbars:

```svelte
<Scrollable.TrackY class="w-4 border-2 border-blue-200 bg-transparent">
	<Scrollable.ThumbY class="rounded-full border border-blue-600 bg-blue-500 shadow-lg" />
</Scrollable.TrackY>
```

## API Reference

### Scrollable.Root

| Prop            | Type                                        | Default | Description                                   |
| --------------- | ------------------------------------------- | ------- | --------------------------------------------- |
| `scrollX`       | `number`                                    | `0`     | Current horizontal scroll position (bindable) |
| `scrollY`       | `number`                                    | `0`     | Current vertical scroll position (bindable)   |
| `disabled`      | `boolean`                                   | `false` | Whether scrolling is disabled                 |
| `hideScrollbar` | `boolean`                                   | `false` | Whether to hide native scrollbars             |
| `as`            | `keyof HTMLElementTagNameMap`               | `'div'` | The HTML element to render                    |
| `children`      | `Snippet<[{ scrollable: ScrollableBond }]>` | -       | Child components with scrollable context      |

### Scrollable.Container

The scrollable container that manages the actual scrolling behavior.

| Prop       | Type                          | Default | Description                |
| ---------- | ----------------------------- | ------- | -------------------------- |
| `as`       | `keyof HTMLElementTagNameMap` | `'div'` | The HTML element to render |
| `children` | `Snippet`                     | -       | Child components           |

### Scrollable.Content

The content wrapper that defines the scrollable area.

| Prop       | Type                          | Default | Description                |
| ---------- | ----------------------------- | ------- | -------------------------- |
| `as`       | `keyof HTMLElementTagNameMap` | `'div'` | The HTML element to render |
| `children` | `Snippet`                     | -       | The scrollable content     |

### Scrollable.Track (New Unified API)

The unified scrollbar track component with direction support.

| Prop        | Type                          | Default | Description                           |
| ----------- | ----------------------------- | ------- | ------------------------------------- |
| `direction` | `'horizontal' \| 'vertical'`  | -       | **Required.** The scrollbar direction |
| `as`        | `keyof HTMLElementTagNameMap` | `'div'` | The HTML element to render            |
| `children`  | `Snippet`                     | -       | Usually contains the thumb component  |

### Scrollable.Thumb (New Unified API)

The unified draggable scrollbar thumb component with direction support.

| Prop        | Type                          | Default | Description                           |
| ----------- | ----------------------------- | ------- | ------------------------------------- |
| `direction` | `'horizontal' \| 'vertical'`  | -       | **Required.** The scrollbar direction |
| `as`        | `keyof HTMLElementTagNameMap` | `'div'` | The HTML element to render            |
| `children`  | `Snippet`                     | -       | Optional thumb content                |

### Scrollable.TrackX / Scrollable.TrackY (Legacy API)

The scrollbar track components (horizontal/vertical).

| Prop       | Type                          | Default | Description                          |
| ---------- | ----------------------------- | ------- | ------------------------------------ |
| `as`       | `keyof HTMLElementTagNameMap` | `'div'` | The HTML element to render           |
| `children` | `Snippet`                     | -       | Usually contains the thumb component |

### Scrollable.ThumbX / Scrollable.ThumbY (Legacy API)

The draggable scrollbar thumb components (horizontal/vertical).

| Prop       | Type                          | Default | Description                |
| ---------- | ----------------------------- | ------- | -------------------------- |
| `as`       | `keyof HTMLElementTagNameMap` | `'div'` | The HTML element to render |
| `children` | `Snippet`                     | -       | Optional thumb content     |

## Methods

The scrollable context provides methods for programmatic scrolling:

```svelte
<Scrollable.Root>
	{#snippet children({ scrollable })}
		<button onclick={() => scrollable.scrollTo(0, 0)}> Scroll to top </button>

		<button onclick={() => scrollable.scrollBy(0, 100)}> Scroll down 100px </button>

		<!-- Rest of the component -->
	{/snippet}
</Scrollable.Root>
```

Available methods:

- `scrollTo(x: number, y: number)` - Scroll to specific position
- `scrollBy(x: number, y: number)` - Scroll by relative amount
- `scrollIntoView(element: Element, options?: ScrollIntoViewOptions)` - Scroll element into view

## Styling

The component provides CSS custom properties for easy theming:

```css
.scrollable-root {
	--scrollbar-width: 16px; /* Width of the scrollbar area */
}
```

Default styles can be overridden by targeting the component classes:

- `.scrollable-root` - Root container
- `.scrollable-container` - Scrollable container
- `.scrollable-content` - Content wrapper
- `.scrollable-track` - Track elements
- `.scrollable-track-x` - Horizontal track
- `.scrollable-track-y` - Vertical track
- `.scrollable-thumb` - Thumb elements
- `.scrollable-thumb-x` - Horizontal thumb
- `.scrollable-thumb-y` - Vertical thumb

## Accessibility

The component includes appropriate ARIA attributes and keyboard support:

- Scrollbars are keyboard accessible
- Screen readers can identify scrollable regions
- Focus management follows accessibility best practices
