<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Alert } from '$svelte-atoms/core/components/alert';
	import LinkCard from '$docs/components/link-card.svelte';
</script>

{#snippet SectionCard(title: string, code: string, description?: string, badge?: string)}
	<div class="flex flex-col">
		<div class="border-border py-2.5">
			<h3 class="font-semibold">{title}</h3>
		</div>
		{#if description}
			<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
				{@html description}
			</p>
		{/if}
		<div class="bg-muted rounded-lg p-4">
			<pre class="text-xs leading-relaxed"><code class="text-foreground">{code}</code></pre>
		</div>
	</div>
{/snippet}

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Bonds</h1>
		<p class="text-muted-foreground text-lg">
			A powerful pattern for building compound components with shareable state.
		</p>
	</div>

	<!-- What Are Bonds -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">What Are Bonds?</h2>
			<p class="text-muted-foreground">
				Bonds are class-based state containers designed for building compound components that need
				to share state across multiple parts.
			</p>
		</div>

		<div class="space-y-4">
			<p class="text-muted-foreground leading-relaxed">
				A Bond is a two-part architecture: the <strong>BondState</strong> manages reactive props and
				methods, while the <strong>Bond</strong> manages element references, generates element props,
				and handles context sharing. This separation keeps concerns clear and code organized.
			</p>
			<p class="text-muted-foreground leading-relaxed">
				Bonds leverage Svelte 5's Runes API (<code
					class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">{`$state`}</code
				>,
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">{`$derived`}</code>,
				<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">{`$effect`}</code>) and
				Svelte's context API for reactive state management and component communication.
			</p>
			<p class="text-muted-foreground leading-relaxed">
				The Bond pattern uses <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
					>createAttachmentKey()</code
				> to automatically capture element references, making it easy to manage DOM elements and implement
				advanced features like focus management, positioning, and animations.
			</p>
		</div>
	</section>

	<!-- Creating a Bond -->
	<section class="mb-16 gap-4 flex flex-col">
		<div class="mb-4">
			<h2 class="mb-2 text-3xl font-bold">Creating a Bond</h2>
			<p class="text-muted-foreground">
				Creating a bond requires four key pieces: a Bond class, a BondState class, bond state props
				definition, and bond HTML element types.
			</p>
		</div>

		{@render SectionCard(
			'1. Define Bond State Props',
			`import { type BondStateProps } from '@svelte-atoms/core';

// Define the props type for your bond state
export type MyComponentStateProps = BondStateProps & {
  open: boolean;
  disabled: boolean;
  // Add your component-specific props
};`
		)}

		{@render SectionCard(
			'2. Define Bond HTML Elements',
			`// Define the HTML elements your bond will manage
export type MyComponentDomElements = {
  root: HTMLElement;
  trigger: HTMLElement;
  content: HTMLElement;
  // Add your component-specific elements
};`
		)}

		{@render SectionCard(
			'3. Create BondState Class',
			`import { BondState } from '@svelte-atoms/core';

// Create the BondState class to manage reactive state
export class MyComponentState<
  Props extends MyComponentStateProps = MyComponentStateProps
> extends BondState<Props> {
  constructor(props: () => Props) {
    super(props);
  }
  
  // Derived state using $derived rune
  get isOpen() {
    return this.props.open ?? false;
  }
  
  // Methods to modify state
  open() {
    this.props.open = true;
  }
  
  close() {
    this.props.open = false;
  }
  
  toggle() {
    this.props.open = !this.props.open;
  }
}`
		)}

		{@render SectionCard(
			'4. Create Bond Class',
			`import { Bond } from '@svelte-atoms/core';
import { createAttachmentKey } from 'svelte/attachments';
import { getContext, setContext } from 'svelte';

// Create the Bond class to manage elements and props
export class MyComponentBond<
  Props extends MyComponentStateProps = MyComponentStateProps,
  State extends MyComponentState<Props> = MyComponentState<Props>,
  Elements extends MyComponentDomElements = MyComponentDomElements
> extends Bond<Props, State, Elements> {
  static CONTEXT_KEY = '@your-app/bonds/my-component';
  
  constructor(state: State) {
    super(state);
  }
  
  // Generate props for root element
  root() {
    return {
      id: \`component-\${this.id}\`,
      'data-kind': 'component-root',
      [createAttachmentKey()]: (node: HTMLElement) => {
        this.elements.root = node;
      }
    };
  }
  
  // Generate props for trigger element
  trigger() {
    const isOpen = this.state?.props?.open ?? false;
    const isDisabled = this.state?.props?.disabled ?? false;
    
    return {
      id: \`component-trigger-\${this.id}\`,
      role: 'button',
      'aria-expanded': isOpen,
      'aria-disabled': isDisabled,
      onclick: () => this.state.toggle(),
      [createAttachmentKey()]: (node: HTMLElement) => {
        this.elements.trigger = node;
      }
    };
  }
  
  // Generate props for content element
  content() {
    const isOpen = this.state?.props?.open ?? false;
    
    return {
      id: \`component-content-\${this.id}\`,
      'aria-hidden': !isOpen,
      [createAttachmentKey()]: (node: HTMLElement) => {
        this.elements.content = node;
      }
    };
  }
  
  // Share bond via context for compound components
  share(): this {
    return MyComponentBond.set(this) as this;
  }
  
  // Context helpers
  static override get(): MyComponentBond {
    return getContext(MyComponentBond.CONTEXT_KEY);
  }
  
  static override set(bond: MyComponentBond) {
    return setContext(MyComponentBond.CONTEXT_KEY, bond);
  }
}`
		)}

		{@render SectionCard(
			'5. Using the Bond in Components',
			`<script lang="ts">
  import { MyComponentBond, MyComponentState } from './bond.svelte';
  
  let { open = $bindable(false), disabled = false } = $props();
  
  // Create bond state with reactive props
  const bondState = new MyComponentState(() => ({
    open,
    disabled
  }));
  
  // Create and share bond for compound components
  const bond = new MyComponentBond(bondState).share();
</script>

<!-- Root component spreads bond props -->
<div {...bond.root()}>
  <button {...bond.trigger()}>
    {bond.state.isOpen ? 'Close' : 'Open'}
  </button>
  
  <div {...bond.content()}>
    <p>Content goes here</p>
    <button onclick={() => bond.state.close()}>Close</button>
  </div>
</div>`
		)}
	</section>

	<!-- Key Features -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Key Features</h2>
			<p class="text-muted-foreground">
				Bonds provide several advantages over traditional state management approaches.
			</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root class="">
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

			<Card.Root class="">
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

			<Card.Root class="">
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

			<Card.Root class="">
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

			<Card.Root class="">
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
			{@render SectionCard(
				'BondState: Props and Logic',
				`export class TabsBondState extends BondState<TabsBondProps> {
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
}`,
				"BondState manages reactive props via a function that returns the props object. This ensures fine-grained reactivity - only tracking what's accessed."
			)}

			{@render SectionCard(
				'Bond: Elements and Props',
				`export class DialogBond extends Bond<
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
}`,
				'Bond manages element references and generates element props with proper ARIA attributes, IDs, and attachment keys for automatic element capture.'
			)}

			{@render SectionCard(
				'Context Sharing',
				`// In Bond class
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
const parentBond = TreeBond.get();`,
				'Bonds provide static methods for context management, making it easy to share state across component trees without prop drilling.'
			)}

			{@render SectionCard(
				'Reactive Props Pattern',
				`import { defineProperty, defineState } from '@svelte-atoms/core';

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
const state = new DialogBondState(() => bondProps);`,
				'Props are passed as a function to BondState, enabling fine-grained reactivity. Use <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">defineState</code> helper for bindable props.'
			)}
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
			{@render SectionCard(
				'Root Component Pattern',
				`<script lang="ts">
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
</div>`,
				'Root components create the bond, share it via context, and spread bond-generated props onto elements.'
			)}

			{@render SectionCard(
				'Child Component Access',
				`<script lang="ts">
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
</button>`,
				'Child components retrieve the bond from context and can access state, methods, and elements.'
			)}

			{@render SectionCard(
				'Factory Pattern',
				`let {
  factory = _factory,
  open = $bindable(false)
} = $props();

const bondProps = defineState(...);

// Use factory (allows customization)
const bond = factory(bondProps).share();

function _factory(props) {
  const state = new TreeBondState(() => props);
  return new TreeBond(state);
}`,
				'Components accept a <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">factory</code> prop for custom bond creation, enabling extension and testing.'
			)}

			{@render SectionCard(
				'Accessing from Parent',
				`<script lang="ts">
  import TreeRoot from './tree-root.svelte';
  
  let treeRef: TreeRoot;
  
  function handleClick() {
    const bond = treeRef.getBond();
    bond.state.toggle();
  }
</script>

<TreeRoot bind:this={treeRef} />
<button onclick={handleClick}>Toggle Tree</button>`,
				'Parent components can access child bonds via exported <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">getBond()</code> methods.'
			)}
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

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root class="">
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
						<h3 class="font-semibold">Building Compound Components</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						When creating components with multiple parts that need to share state across separate
						child components. This is the primary use case for bonds.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
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
						<h3 class="font-semibold">Shareable State Across Components</h3>
					</div>
					<p class="text-muted-foreground text-sm">
						When multiple child components need to access and modify the same state in a coordinated
						way without prop drilling.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
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

			<Card.Root class="">
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

		<Alert.Root variant="warning" class="mt-6">
			<Alert.Title>
				<Alert.Icon>
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
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
				</Alert.Icon>
				<span>When Not to Use Bonds</span>
			</Alert.Title>
			<Alert.Content>
				For simple components with a single piece of state, a plain <code
					class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">{`$state`}</code
				> variable is often clearer. Don't over-engineer.
			</Alert.Content>
		</Alert.Root>
	</section>

	<!-- Best Practices -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Best Practices</h2>
			<p class="text-muted-foreground">Guidelines for working effectively with Bonds.</p>
		</div>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root class="">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Use Props as Functions</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Always pass props to BondState as a function (<code
							class="bg-muted text-foreground rounded px-1 py-0.5 text-xs whitespace-nowrap"
							>() =&gt; props</code
						>) for fine-grained reactivity. This ensures only accessed properties trigger updates.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
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

			<Card.Root class="">
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

			<Card.Root class="">
				<Card.Body class="p-5">
					<h3 class="mb-2 font-semibold">Keep Context Keys Unique</h3>
					<p class="text-muted-foreground text-sm leading-relaxed">
						Use descriptive, prefixed context keys like <code
							class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
							>'@atoms/context/component-name'</code
						> to avoid collisions with other context values. When extending from other existing bonds,
						it's recommended to keep using the same context key to maintain compatibility.
					</p>
				</Card.Body>
			</Card.Root>

			<Card.Root class="">
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

			<Card.Root class="">
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
			<LinkCard
				title="Philosophy"
				description="Understand the design principles and architecture behind Bonds."
				href="/docs/philosophy"
				linkText="Read philosophy"
			>
				{#snippet icon()}
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
				{/snippet}
			</LinkCard>

			<LinkCard
				title="Browse Components"
				description="See Bonds in action with real component examples."
				href="/docs"
				linkText="View components"
			>
				{#snippet icon()}
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
				{/snippet}
			</LinkCard>
		</div>
	</section>
</div>
