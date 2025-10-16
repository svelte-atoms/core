# Virtual Component

> **Source**: [`src/lib/components/virtual`](../../src/lib/components/virtual)

The `Virtual` component provides efficient rendering of large lists using virtualization techniques (windowing).

## Features

- Efficient rendering of large datasets
- Scroll-based windowing
- Dynamic item heights support
- Smooth scrolling
- Memory efficient
- Performance optimized

## Props

**Props:** See [`VirtualProps`](../../src/lib/components/virtual/virtual.svelte)

Key props:

- `items: T[]` - Array of items to render
- `itemHeight?: number | ((item: T, index: number) => number)` - Item height (px)
- `overscan?: number` - Number of items to render outside viewport
- `estimatedItemHeight?: number` - Estimated height for dynamic items
- `children?: Snippet<[{ item: T, index: number }]>` - Item renderer

## Usage

```svelte
<script>
	import { Virtual } from '@svelte-atoms/core';

	const items = Array.from({ length: 10000 }, (_, i) => ({
		id: i,
		text: `Item ${i}`
	}));
</script>

<!-- Basic virtual list -->
<Virtual {items} itemHeight={50}>
	{#snippet children({ item, index })}
		<div class="item">
			{item.text}
		</div>
	{/snippet}
</Virtual>

<!-- With overscan -->
<Virtual {items} itemHeight={60} overscan={5}>
	{#snippet children({ item })}
		<div class="item">{item.text}</div>
	{/snippet}
</Virtual>

<!-- Dynamic heights -->
<Virtual {items} itemHeight={(item) => (item.expanded ? 200 : 50)} estimatedItemHeight={50}>
	{#snippet children({ item })}
		<div class="item">
			{item.content}
		</div>
	{/snippet}
</Virtual>
```

## Fixed Height Items

For consistent item heights:

```svelte
<Virtual items={data} itemHeight={80} class="h-[600px] overflow-auto">
	{#snippet children({ item, index })}
		<div class="h-20 border-b">
			<h3>{item.title}</h3>
			<p>{item.description}</p>
		</div>
	{/snippet}
</Virtual>
```

## Dynamic Height Items

For variable item heights:

```svelte
<Virtual
	items={messages}
	itemHeight={(msg) => {
		// Calculate height based on content
		return msg.text.length > 100 ? 120 : 60;
	}}
	estimatedItemHeight={70}
>
	{#snippet children({ item })}
		<div class="message">
			<p>{item.text}</p>
			<span>{item.timestamp}</span>
		</div>
	{/snippet}
</Virtual>
```

## Overscan

Render additional items outside viewport for smoother scrolling:

```svelte
<!-- Small overscan (default: 3) -->
<Virtual {items} itemHeight={50} overscan={3}>
	{#snippet children({ item })}
		<div>{item.text}</div>
	{/snippet}
</Virtual>

<!-- Large overscan for smoother scrolling -->
<Virtual {items} itemHeight={50} overscan={10}>
	{#snippet children({ item })}
		<div>{item.text}</div>
	{/snippet}
</Virtual>
```

## Custom Scroll Container

```svelte
<script>
	let scrollContainer: HTMLElement;
</script>

<div bind:this={scrollContainer} class="h-96 overflow-auto">
	<Virtual {items} itemHeight={50} scrollElement={scrollContainer}>
		{#snippet children({ item })}
			<div>{item.text}</div>
		{/snippet}
	</Virtual>
</div>
```

## Complex Items

```svelte
<Virtual items={products} itemHeight={120}>
	{#snippet children({ item, index })}
		<div class="product-card">
			<img src={item.image} alt={item.name} />
			<Stack spacing={2}>
				<h3>{item.name}</h3>
				<p class="text-sm">{item.description}</p>
				<div class="flex justify-between">
					<span>${item.price}</span>
					<Button>Add to Cart</Button>
				</div>
			</Stack>
		</div>
	{/snippet}
</Virtual>
```

## Performance Optimization

```svelte
<script>
	// Memoize expensive calculations
	const itemHeight = (item: Item) => {
		// Cache calculated heights
		return heightCache.get(item.id) ?? calculateHeight(item);
	};
</script>

<Virtual items={largeDataset} {itemHeight} overscan={5}>
	{#snippet children({ item })}
		<OptimizedItem {item} />
	{/snippet}
</Virtual>
```

## Best Practices

1. **Use for large lists** (>100 items)
2. **Fixed heights** when possible for best performance
3. **Reasonable overscan** (3-10 items)
4. **Estimated height** for dynamic items
5. **Memoization** for expensive calculations
6. **Container height** must be defined
7. **Key items** properly for React-like behavior

## Use Cases

### Long Data Tables

```svelte
<Virtual items={tableData} itemHeight={48}>
	{#snippet children({ item })}
		<tr>
			<td>{item.col1}</td>
			<td>{item.col2}</td>
			<td>{item.col3}</td>
		</tr>
	{/snippet}
</Virtual>
```

### Chat Messages

```svelte
<Virtual items={messages} itemHeight={(msg) => (msg.images ? 200 : 60)} estimatedItemHeight={70}>
	{#snippet children({ item })}
		<MessageBubble message={item} />
	{/snippet}
</Virtual>
```

### Infinite Scroll

```svelte
<script>
	let items = $state([...initialItems]);

	function loadMore() {
		items = [...items, ...fetchMoreItems()];
	}
</script>

<Virtual {items} itemHeight={100} onscrollend={loadMore}>
	{#snippet children({ item })}
		<div>{item.content}</div>
	{/snippet}
</Virtual>
```

## Accessibility

- Maintain keyboard navigation
- Use proper ARIA roles
- Announce item count to screen readers
- Ensure focus management
- Support page up/down keys

## Performance Considerations

- **Item height**: Fixed > Dynamic
- **Overscan**: Balance smoothness vs memory
- **Item complexity**: Keep render simple
- **Memoization**: Cache expensive operations
- **Scroll throttling**: Built-in optimization

## Limitations

1. Fixed container height required
2. Horizontal scrolling more complex
3. Dynamic heights need estimation
4. Grid layouts require additional logic
5. Sticky elements need special handling

## Related

- Scrollable Component
- List Component
- Datagrid Component
- Infinite scroll patterns
