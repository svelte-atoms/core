<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Bonds</h1>
		<p class="text-muted-foreground text-lg">
			A powerful state management pattern for building self-contained, composable components.
		</p>
	</div>

	<!-- What Are Bonds -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">What Are Bonds?</h2>
			<p class="text-muted-foreground">
				Bonds are class-based state containers that manage component behavior, element references,
				and expose a clean API.
			</p>
		</div>

		<Card.Root class="border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground mb-4 leading-relaxed">
					A Bond is a two-part architecture: the <strong>BondState</strong> manages reactive props
					and methods, while the <strong>Bond</strong> manages element references, generates element
					props, and handles context sharing. This separation keeps concerns clear and code organized.
				</p>
				<p class="text-muted-foreground mb-4 leading-relaxed">
					Bonds leverage Svelte 5's Runes API (<code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">{`$state`}</code
					>,
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">{`$derived`}</code>,
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">{`$effect`}</code>)
					and Svelte's context API for reactive state management and component communication.
				</p>
				<p class="text-muted-foreground leading-relaxed">
					The Bond pattern uses <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
						>createAttachmentKey()</code
					> to automatically capture element references, making it easy to manage DOM elements and implement
					advanced features like focus management, positioning, and animations.
				</p>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Creating a Bond -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Creating a Bond</h2>
			<p class="text-muted-foreground">
				Bonds are created using class-based architecture with separate Bond and BondState classes.
			</p>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Bond State Class</span>
					<Badge variant="secondary" class="text-xs">TypeScript</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="text-sm leading-relaxed"><code class="text-foreground"
							>{`import { Bond, BondState, type BondStateProps } from '@svelte-atoms/core';

// Define props type
export type CounterBondProps = BondStateProps & {
  value: number;
  disabled: boolean;
};

// Create BondState class
export class CounterBondState extends BondState<CounterBondProps> {
  constructor(props: () => CounterBondProps) {
    super(props);
  }
  
  // Derived values
  get isEven() {
    return this.props.value % 2 === 0;
  }
  
  get isPositive() {
    return this.props.value > 0;
  }
  
  // Methods to modify state
  increment() {
    this.props.value++;
  }
  
  decrement() {
    this.props.value--;
  }
  
  reset() {
    this.props.value = 0;
  }
}`}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Bond Class</span>
					<Badge variant="secondary" class="text-xs">TypeScript</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="text-sm leading-relaxed"><code class="text-foreground"
							>{`import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';

export type CounterBondElements = {
  root: HTMLElement;
  display: HTMLElement;
};

export class CounterBond extends Bond<
  CounterBondProps,
  CounterBondState,
  CounterBondElements
> {
  static CONTEXT_KEY = '@atoms/context/counter';
  
  constructor(state: CounterBondState) {
    super(state);
  }
  
  // Share bond via context
  share(): this {
    return CounterBond.set(this) as this;
  }
  
  // Generate props for elements
  root(props: Record<string, unknown> = {}) {
    return {
      id: \`counter-\${this.id}\`,
      'aria-disabled': this.state.props.disabled,
      'data-kind': 'counter',
      ...props,
      [createAttachmentKey()]: (node: HTMLElement) => {
        this.elements.root = node;
      }
    };
  }
  
  display(props: Record<string, unknown> = {}) {
    return {
      id: \`counter-display-\${this.id}\`,
      'data-kind': 'counter-display',
      ...props,
      [createAttachmentKey()]: (node: HTMLElement) => {
        this.elements.display = node;
      }
    };
  }
  
  // Context helpers
  static get(): CounterBond | undefined {
    return getContext(CounterBond.CONTEXT_KEY);
  }
  
  static set(bond: CounterBond): CounterBond {
    return setContext(CounterBond.CONTEXT_KEY, bond);
  }
}`}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Using the Bond</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="text-sm leading-relaxed"><code class="text-foreground"
							>{`<script lang="ts">
  import { CounterBond, CounterBondState } from './bond.svelte';
  
  let value = $state(0);
  
  // Create bond state
  const bondState = new CounterBondState(() => ({
    value,
    disabled: false
  }));
  
  // Create and share bond
  const bond = new CounterBond(bondState).share();
</script>

<div {...bond.root()}>
  <p {...bond.display()}>
    Count: {bond.state.props.value}
    {bond.state.isEven ? '(even)' : '(odd)'}
  </p>
  
  <button onclick={() => bond.state.increment()}>+</button>
  <button onclick={() => bond.state.decrement()}>-</button>
  <button onclick={() => bond.state.reset()}>Reset</button>
</div>`}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Key Features -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Key Features</h2>
			<p class="text-muted-foreground">
				Bonds provide several advantages over traditional state management approaches.
			</p>
		</div>

		<div class="space-y-6">
			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-start gap-4">
						<div class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<rect width="18" height="18" x="3" y="3" rx="2" />
								<path d="M7 3v18M17 3v18M3 7h18M3 17h18" />
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-lg font-semibold">Separation of Concerns</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">
								BondState manages reactive props and methods, while Bond handles element references,
								prop generation, and context sharing. Clean architecture by design.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-start gap-4">
						<div class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<circle cx="12" cy="12" r="10" />
								<circle cx="12" cy="12" r="4" />
								<line x1="21.17" x2="12" y1="8" y2="8" />
								<line x1="3.95" x2="8.54" y1="6.06" y2="14" />
								<line x1="10.88" x2="15.46" y1="21.94" y2="14" />
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-lg font-semibold">Element Management</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">
								Automatic element reference capture via <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
									>createAttachmentKey()</code
								>. Access any DOM element through
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
									>bond.elements</code
								> for focus, positioning, and more.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-start gap-4">
						<div class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<polyline points="16 18 22 12 16 6" />
								<polyline points="8 6 2 12 8 18" />
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-lg font-semibold">Type Safety</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">
								Full TypeScript support with generic typing. Define your props, state, and elements
								once, get complete type inference everywhere.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-start gap-4">
						<div class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-lg font-semibold">Context Integration</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">
								Built-in context support with <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">.share()</code
								>, <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">.get()</code>,
								and
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">.set()</code>.
								Share state across component trees without prop drilling.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-6">
					<div class="mb-3 flex items-start gap-4">
						<div class="text-primary mt-1 flex-shrink-0">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
								<path d="M21 3v5h-5" />
							</svg>
						</div>
						<div>
							<h3 class="mb-2 text-lg font-semibold">Fine-Grained Reactivity</h3>
							<p class="text-muted-foreground text-sm leading-relaxed">
								Built on Svelte 5's Runes API. Reactive props passed as functions keep updates
								efficient. Only what changed re-renders.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Bond Architecture -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Bond Architecture</h2>
			<p class="text-muted-foreground">
				Understanding the two-part Bond architecture and how the pieces work together.
			</p>
		</div>

		<div class="space-y-6">
			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">BondState: Props and Logic</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							BondState manages reactive props via a function that returns the props object. This
							ensures fine-grained reactivity - only tracking what's accessed.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`export class TabsBondState extends BondState<TabsBondProps> {
  #items = new SvelteMap<string, TabBond>();
  
  // Derived computed property
  #selectedItem = $derived(
    this.props?.value 
      ? this.#items.get(this.props.value) 
      : undefined
  );
  
  constructor(props: () => TabsBondProps) {
    super(props);  // Pass props function to base
  }
  
  get selectedItem() {
    return this.#selectedItem;
  }
  
  select(id: string) {
    this.props.value = id;  // Direct mutation
  }
}`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Bond: Elements and Props</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Bond manages element references and generates element props with proper ARIA
							attributes, IDs, and attachment keys for automatic element capture.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`export class DialogBond extends Bond<
  DialogBondProps, 
  DialogBondState, 
  DialogBondElements
> {
  static CONTEXT_KEY = '@atoms/context/dialog';
  
  constructor(state: DialogBondState) {
    super(state);
  }
  
  // Generate props for root element
  root() {
    const isOpen = this.state.props.open ?? false;
    
    return {
      id: \`dialog-\${this.id}\`,
      'aria-modal': true,
      'aria-labelledby': \`dialog-title-\${this.id}\`,
      open: isOpen,
      [createAttachmentKey()]: (node: HTMLDialogElement) => {
        this.elements.root = node;  // Auto-capture
      }
    };
  }
}`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Context Sharing</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Bonds provide static methods for context management, making it easy to share state
							across component trees without prop drilling.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`// In Bond class
static get(): TreeBond | undefined {
  return getContext(TreeBond.CONTEXT_KEY);
}

static set(bond: TreeBond): TreeBond {
  return setContext(TreeBond.CONTEXT_KEY, bond);
}

share(): this {
  return TreeBond.set(this) as this;
}

// In component
const bond = new TreeBond(state).share();

// In child component
const parentBond = TreeBond.get();`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Reactive Props Pattern</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Props are passed as a function to BondState, enabling fine-grained reactivity. Use
							<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">defineState</code>
							helper for bindable props.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`import { defineProperty, defineState } from '@svelte-atoms/core';

let open = $bindable(false);

// Create reactive props with bindables
const bondProps = defineState<DialogBondProps>([
  defineProperty(
    'open',
    () => open,           // Getter
    (v) => { open = v; }  // Setter
  )
], () => ({ 
  disabled: false  // Static props
}));

// Pass as function
const state = new DialogBondState(() => bondProps);`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Using Bonds in Components -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Using Bonds in Components</h2>
			<p class="text-muted-foreground">
				Bonds are typically created in root components and shared via context to child components.
			</p>
		</div>

		<div class="space-y-6">
			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Root Component Pattern</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Root components create the bond, share it via context, and spread bond-generated props
							onto elements.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`<script lang="ts">
  import { TreeBond, TreeBondState } from './bond.svelte';
  
  let { open = $bindable(false), disabled = false } = $props();
  
  // Create reactive props
  const bondProps = defineState<TreeBondProps>([
    defineProperty('open', () => open, (v) => { open = v; })
  ], () => ({ disabled }));
  
  // Create bond
  const bondState = new TreeBondState(() => bondProps);
  const bond = new TreeBond(bondState).share();
</script>

<!-- Spread bond props onto elements -->
<div {...bond.root()}>
  <button {...bond.header()}>Toggle</button>
  <div {...bond.body()}>Content</div>
</div>`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Child Component Access</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Child components retrieve the bond from context and can access state, methods, and
							elements.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`<script lang="ts">
  import { TreeBond } from './bond.svelte';
  
  // Get bond from context
  const bond = TreeBond.get();
  
  function handleClick() {
    // Access methods
    bond?.state.toggle();
    
    // Access elements
    bond?.elements.root?.focus();
  }
</script>

<button onclick={handleClick}>
  {bond?.state.props.open ? 'Close' : 'Open'}
</button>`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Factory Pattern</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Components accept a <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
								>factory</code
							> prop for custom bond creation, enabling extension and testing.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`let {
  factory = _factory,
  open = $bindable(false)
} = $props();

const bondProps = defineState(...);

// Use factory (allows customization)
const bond = factory(bondProps).share();

function _factory(props) {
  const state = new TreeBondState(() => props);
  return new TreeBond(state);
}`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-0">
					<div class="border-border bg-muted/50 border-b px-4 py-2.5">
						<h3 class="font-semibold">Accessing from Parent</h3>
					</div>
					<div class="p-6">
						<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
							Parent components can access child bonds via exported <code
								class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">getBond()</code
							> methods.
						</p>
						<div class="bg-muted rounded-lg p-4">
							<pre class="text-xs leading-relaxed"><code class="text-foreground"
									>{`<script lang="ts">
  import TreeRoot from './tree-root.svelte';
  
  let treeRef: TreeRoot;
  
  function handleClick() {
    const bond = treeRef.getBond();
    bond.state.toggle();
  }
</script>

<TreeRoot bind:this={treeRef} />
<button onclick={handleClick}>Toggle Tree</button>`}</code
								></pre>
						</div>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- When to Use Bonds -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">When to Use Bonds</h2>
			<p class="text-muted-foreground">
				Bonds are powerful but not always necessary. Here's when to use them.
			</p>
		</div>

		<div class="space-y-4">
			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Complex Component State</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						When your component has multiple related pieces of state and behavior that need to stay
						in sync.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Shared State</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						When multiple components need to access and modify the same state in a coordinated way.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Reusable Logic</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						When you want to extract and reuse component logic across different parts of your app.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<div class="mb-2 flex items-center gap-2">
						<div class="text-primary">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
								<polyline points="22 4 12 14.01 9 11.01"></polyline>
							</svg>
						</div>
						<h3 class="font-semibold">Testing</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						Bonds are easy to test in isolation since they're just JavaScript objects with methods.
					</p>
				</Card.Body>
			</Card.Root>
		</div>

		<Card.Root class="mt-6 border-2 border-amber-500/30 bg-amber-500/5">
			<Card.Body class="p-5">
				<div class="flex gap-3">
					<div class="mt-0.5 flex-shrink-0 text-amber-600 dark:text-amber-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
							></path>
							<path d="M12 9v4"></path>
							<path d="M12 17h.01"></path>
						</svg>
					</div>
					<div class="text-sm">
						<p class="font-semibold">When Not to Use Bonds</p>
						<p class="text-muted-foreground mt-1.5">
							For simple components with a single piece of state, a plain <code
								class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">{`$state`}</code
							> variable is often clearer. Don't over-engineer.
						</p>
					</div>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Best Practices -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Best Practices</h2>
			<p class="text-muted-foreground">Guidelines for working effectively with Bonds.</p>
		</div>

		<div class="space-y-4">
			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Use Props as Functions</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Always pass props to BondState as a function (<code
							class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">() =&gt; props</code
						>) for fine-grained reactivity. This ensures only accessed properties trigger updates.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Type Your Elements</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Define a type for your bond elements to get autocomplete and type safety when accessing
						<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
							>bond.elements.root</code
						>, etc.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Use Attachment Keys</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Always use <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
							>createAttachmentKey()</code
						> in your element prop methods to automatically capture element references. No manual ref
						management needed.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Keep Context Keys Unique</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Use descriptive, prefixed context keys like <code
							class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
							>'@atoms/context/component-name'</code
						> to avoid collisions with other context values.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Spread Bond Props</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Always spread bond-generated props onto elements: <code
							class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
							>{`{...bond.root()}`}</code
						>. This ensures IDs, ARIA attributes, and attachments work correctly.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Export getBond()</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Export a <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
							>getBond()</code
						> method from root components to allow parent components to access the bond imperatively
						when needed.
					</p>
				</Card.Body>
			</Card.Root>
		</div>
	</section>

	<!-- Learn More -->
	<section>
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Learn More</h2>
			<p class="text-muted-foreground">
				Ready to dive deeper into Bonds and the architecture behind them?
			</p>
		</div>

		<div class="grid gap-5 sm:grid-cols-2">
			<Card.Root
				class="group border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
			>
				<Card.Body class="p-6">
					<div class="text-primary mb-4 transition-transform group-hover:scale-110">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
							<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Philosophy</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						Understand the design principles and architecture behind Bonds.
					</p>
					<a
						href="/docs/philosophy"
						class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
					>
						Read philosophy
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>

			<Card.Root
				class="group border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
			>
				<Card.Body class="p-6">
					<div class="text-primary mb-4 transition-transform group-hover:scale-110">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect width="7" height="7" x="3" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="3" rx="1" />
							<rect width="7" height="7" x="14" y="14" rx="1" />
							<rect width="7" height="7" x="3" y="14" rx="1" />
						</svg>
					</div>
					<h3 class="mb-2 text-lg font-semibold">Browse Components</h3>
					<p class="text-muted-foreground mb-4 text-sm">
						See Bonds in action with real component examples.
					</p>
					<a
						href="/docs"
						class="text-primary inline-flex items-center gap-1 text-sm font-semibold transition-all hover:gap-2"
					>
						View components
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<path d="M5 12h14M12 5l7 7-7 7" />
						</svg>
					</a>
				</Card.Body>
			</Card.Root>
		</div>
	</section>
</div>
