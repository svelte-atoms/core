<script lang="ts">
	import { Card } from '$svelte-atoms/core/components/card';
	import { Badge } from '$svelte-atoms/core/components/badge';

	const keyboardExample = `${'<'}!-- Button component -->
${'<'}Button.Root>
  Click me
${'<'}/Button.Root>
${'<'}!-- Supports: Enter, Space -->

${'<'}!-- Menu component -->
${'<'}Menu.Root>
  ${'<'}Menu.Trigger base={Button}>Open Menu${'<'}/Menu.Trigger>
  ${'<'}Menu.List>
    ${'<'}Menu.Item>Option 1${'<'}/Menu.Item>
    ${'<'}Menu.Item>Option 2${'<'}/Menu.Item>
  ${'<'}/Menu.List>
${'<'}/Menu.Root>
${'<'}!-- Supports: Arrow keys, Enter, Escape -->

${'<'}!-- Tabs component -->
${'<'}Tabs.Root>
  ${'<'}Tabs.Header>
    ${'<'}Tabs.Tab value="1">Tab 1${'<'}/Tabs.Tab>
    ${'<'}Tabs.Tab value="2">Tab 2${'<'}/Tabs.Tab>
  ${'<'}/Tabs.Header>
${'<'}/Tabs.Root>
${'<'}!-- Supports: Arrow keys, Home, End -->`;

	const ariaExample = `${'<'}!-- Dialog with ARIA attributes -->
${'<'}Dialog.Root bind:open>
  ${'<'}Dialog.Content>
    ${'<'}Dialog.Header>
      ${'<'}Dialog.Title>
        ${'<'}!-- Automatically sets aria-labelledby -->
        Confirm Action
      ${'<'}/Dialog.Title>
      ${'<'}Dialog.Description>
        ${'<'}!-- Automatically sets aria-describedby -->
        Are you sure you want to continue?
      ${'<'}/Dialog.Description>
    ${'<'}/Dialog.Header>
  ${'<'}/Dialog.Content>
${'<'}/Dialog.Root>

${'<'}!-- Accordion with state attributes -->
${'<'}Accordion.Root>
  ${'<'}Accordion.Item>
    ${'<'}Accordion.Item.Header>
      ${'<'}!-- aria-expanded automatically managed -->
      Section Title
    ${'<'}/Accordion.Item.Header>
    ${'<'}Accordion.Item.Body>
      ${'<'}!-- aria-controls automatically set -->
      Content
    ${'<'}/Accordion.Item.Body>
  ${'<'}/Accordion.Item>
${'<'}/Accordion.Root>

${'<'}!-- Checkbox with mixed state -->
${'<'}Checkbox 
  bind:checked 
  bind:indeterminate
>
  ${'<'}!-- aria-checked="mixed" when indeterminate -->
  Accept terms
${'<'}/Checkbox>`;

	const focusTrapExample = `${'<'}script>
  let dialogOpen = $state(false);
${'<'}/script>

${'<'}Dialog.Root bind:open={dialogOpen}>
  ${'<'}Dialog.Content>
    ${'<'}!-- Focus automatically trapped within dialog -->
    ${'<'}!-- Tab cycles through focusable elements -->
    ${'<'}!-- Shift+Tab reverses direction -->
    
    ${'<'}Dialog.Header>
      ${'<'}Dialog.Title>Modal Dialog${'<'}/Dialog.Title>
    ${'<'}/Dialog.Header>
    
    ${'<'}Dialog.Body>
      ${'<'}input type="text" placeholder="First field" />
      ${'<'}input type="text" placeholder="Second field" />
    ${'<'}/Dialog.Body>
    
    ${'<'}Dialog.Footer>
      ${'<'}Button onclick={() => dialogOpen = false}>Cancel${'<'}/Button>
      ${'<'}Button>Confirm${'<'}/Button>
    ${'<'}/Dialog.Footer>
  ${'<'}/Dialog.Content>
${'<'}/Dialog.Root>`;

	const focusManagementExample = `${'<'}script>
  import { Popover } from '@svelte-atoms/core/components/popover';
  
  let open = $state(false);
${'<'}/script>

${'<'}Popover.Root bind:open>
  ${'<'}Popover.Trigger>
    ${'<'}!-- Focus returns here when popover closes -->
    Open Popover
  ${'<'}/Popover.Trigger>
  
  ${'<'}Popover.Content>
    ${'<'}!-- Focus moves to first focusable element when opened -->
    ${'<'}Button>Action 1${'<'}/Button>
    ${'<'}Button>Action 2${'<'}/Button>
  ${'<'}/Popover.Content>
${'<'}/Popover.Root>`;

	const semanticExample = `${'<'}!-- Card with proper semantic structure -->
${'<'}Card.Root>
  ${'<'}Card.Header>
    ${'<'}!-- Uses semantic header element -->
    ${'<'}Card.Title>Card Title${'<'}/Card.Title>
  ${'<'}/Card.Header>
  
  ${'<'}Card.Body>
    ${'<'}!-- Main content area -->
    Content goes here
  ${'<'}/Card.Body>
  
  ${'<'}Card.Footer>
    ${'<'}!-- Uses semantic footer element -->
    Footer content
  ${'<'}/Card.Footer>
${'<'}/Card.Root>

${'<'}!-- List with proper semantics -->
${'<'}List.Root as="ul">
  ${'<'}!-- Renders as <ul> element -->
  ${'<'}List.Item>Item 1${'<'}/List.Item>
  ${'<'}List.Item>Item 2${'<'}/List.Item>
${'<'}/List.Root>

${'<'}!-- Accordion with semantic structure -->
${'<'}Accordion.Root as="ul">
  ${'<'}!-- Can render as ul/ol for semantic lists -->
  ${'<'}Accordion.Item as="li">
    ${'<'}Accordion.Item.Header>Section${'<'}/Accordion.Item.Header>
    ${'<'}Accordion.Item.Body>Content${'<'}/Accordion.Item.Body>
  ${'<'}/Accordion.Item>
${'<'}/Accordion.Root>`;

	const screenReaderExample = `${'<'}!-- Alert with proper role -->
${'<'}Alert variant="destructive" role="alert">
  ${'<'}!-- Announced immediately by screen readers -->
  ${'<'}Alert.Title>Error${'<'}/Alert.Title>
  ${'<'}Alert.Description>
    Something went wrong
  ${'<'}/Alert.Description>
${'<'}/Alert>

${'<'}!-- Button with accessible label -->
${'<'}Button aria-label="Close dialog">
  ${'<'}!-- Icon only, needs aria-label -->
  ${'<'}XIcon />
${'<'}/Button>

${'<'}!-- Form field with proper association -->
${'<'}Form.Field>
  ${'<'}Label for="email">Email Address${'<'}/Label>
  ${'<'}Input id="email" type="email" />
  ${'<'}Form.Description>
    ${'<'}!-- Associated with input via aria-describedby -->
    We'll never share your email
  ${'<'}/Form.Description>
${'<'}/Form.Field>`;

	const customAttributesExample = `${'<'}script>
  import { defineVariants } from '@svelte-atoms/core/utils';
  
  const alertVariants = defineVariants({
    class: 'rounded-lg p-4 border',
    variants: {
      variant: {
        error: {
          class: 'bg-destructive/10 text-destructive',
          role: 'alert',
          'aria-live': 'assertive'
        },
        warning: {
          class: 'bg-yellow-50 text-yellow-900',
          role: 'status',
          'aria-live': 'polite'
        }
      }
    }
  });
${'<'}/script>

${'<'}!-- Variants automatically apply ARIA attributes -->
${'<'}HtmlAtom variants={alertVariants} variant="error">
  ${'<'}!-- role="alert" and aria-live="assertive" applied -->
  Critical error message
${'<'}/HtmlAtom>`;

	const disabledStateExample = `${'<'}!-- Button with disabled state -->
${'<'}Button disabled>
  ${'<'}!-- aria-disabled automatically set -->
  ${'<'}!-- Pointer events disabled -->
  ${'<'}!-- Visual opacity applied -->
  Disabled Button
${'<'}/Button>

${'<'}!-- Menu item with disabled state -->
${'<'}Menu.Root>
  ${'<'}Menu.Trigger base={Button}>Menu${'<'}/Menu.Trigger>
  ${'<'}Menu.List>
    ${'<'}Menu.Item disabled>
      ${'<'}!-- aria-disabled="true" -->
      ${'<'}!-- tabindex="-1" to skip in navigation -->
      Disabled Option
    ${'<'}/Menu.Item>
  ${'<'}/Menu.List>
${'<'}/Menu.Root>

${'<'}!-- Form input with disabled state -->
${'<'}Input disabled />
${'<'}!-- Native disabled attribute -->
${'<'}!-- Excluded from form submission -->`;

	const visualIndicatorsExample = `${'<'}!-- All interactive components have focus styles -->
${'<'}style>
  /* Applied automatically by components */
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
${'<'}/style>

${'<'}!-- Buttons -->
${'<'}Button>
  ${'<'}!-- Focus ring automatically applied -->
  Click me
${'<'}/Button>

${'<'}!-- Links -->
${'<'}Link href="/page">
  ${'<'}!-- Focus ring with offset -->
  Navigate
${'<'}/Link>

${'<'}!-- Custom focus styles -->
${'<'}Button class="focus:ring-4 focus:ring-primary">
  ${'<'}!-- Override with custom styles -->
  Custom Focus
${'<'}/Button>`;

	const reducedMotionExample = `${'<'}script>
  import { Accordion } from '@svelte-atoms/core/components/accordion';
  
  // Components respect prefers-reduced-motion
${'<'}/script>

${'<'}Accordion.Root>
  ${'<'}Accordion.Item>
    ${'<'}!-- Animation duration automatically reduced -->
    ${'<'}!-- when user prefers reduced motion -->
    ${'<'}Accordion.Item.Header>Section${'<'}/Accordion.Item.Header>
    ${'<'}Accordion.Item.Body>
      Content with reduced motion support
    ${'<'}/Accordion.Item.Body>
  ${'<'}/Accordion.Item>
${'<'}/Accordion.Root>

${'<'}!-- Custom animations should check preference -->
${'<'}script>
  import { animate } from 'motion';
  
  function handleEnter(element) {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    return animate(
      element,
      { opacity: [0, 1] },
      { duration: prefersReducedMotion ? 0 : 0.3 }
    );
  }
${'<'}/script>`;

	const colorContrastExample = `${'<'}!-- All theme colors meet WCAG AA standards -->

${'<'}!-- Primary actions (4.5:1 minimum) -->
${'<'}Button variant="primary">
  ${'<'}!-- bg-primary / text-primary-foreground -->
  Primary Action
${'<'}/Button>

${'<'}!-- Secondary actions -->
${'<'}Button variant="secondary">
  ${'<'}!-- bg-secondary / text-secondary-foreground -->
  Secondary Action
${'<'}/Button>

${'<'}!-- Destructive actions -->
${'<'}Button variant="destructive">
  ${'<'}!-- bg-destructive / text-destructive-foreground -->
  Delete
${'<'}/Button>

${'<'}!-- Muted text (minimum 4.5:1) -->
${'<'}p class="text-muted-foreground">
  Secondary information with proper contrast
${'<'}/p>`;

	const testingExample = `${'<'}!-- Add data-testid for testing -->
${'<'}Button data-testid="submit-button">
  Submit
${'<'}/Button>

${'<'}!-- Use presets to apply test IDs globally -->
${'<'}script>
  import { setPreset } from '@svelte-atoms/core/context';
  
  setPreset({
    button: () => ({
      'data-component': 'button',
      'data-testid': 'button-element'
    }),
    dialog: () => ({
      'data-component': 'dialog',
      'data-testid': 'dialog-element'
    })
  });
${'<'}/script>

${'<'}!-- Testing with Playwright -->
${'<'}script lang="ts">
  // In your test file
  import { test, expect } from '@playwright/test';
  
  test('button is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Tab to button
    await page.keyboard.press('Tab');
    
    // Verify focus
    await expect(page.getByTestId('submit-button')).toBeFocused();
    
    // Activate with Enter
    await page.keyboard.press('Enter');
  });
${'<'}/script>`;
</script>

<div class="mx-auto max-w-4xl px-4 py-12">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Accessibility</h1>
		<p class="text-muted-foreground text-lg">
			Built-in accessibility features following WAI-ARIA standards with keyboard navigation, focus
			management, and screen reader support.
		</p>
	</div>

	<!-- Overview -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Overview</h2>
			<p class="text-muted-foreground">
				All components are designed with accessibility as a first-class concern, not an
				afterthought.
			</p>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground leading-relaxed">
					@svelte-atoms/core follows the <strong>WAI-ARIA Authoring Practices Guide (APG)</strong>
					to ensure components are accessible to users of assistive technologies. Every component includes
					proper ARIA attributes, keyboard navigation, focus management, and semantic HTML structure
					by default. You don't need to add these features manually—they're built in.
				</p>
			</Card.Body>
		</Card.Root>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Core Accessibility Features</h3>
			<div class="grid gap-4 sm:grid-cols-2">
				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Keyboard Navigation</h4>
						<p class="text-muted-foreground text-sm">
							Full keyboard support with Tab, Arrow keys, Enter, Space, Escape, Home, and End
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">ARIA Attributes</h4>
						<p class="text-muted-foreground text-sm">
							Automatic role, state, and property attributes following ARIA specifications
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Focus Management</h4>
						<p class="text-muted-foreground text-sm">
							Focus trapping for modals, focus restoration on close, and visible focus indicators
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Screen Readers</h4>
						<p class="text-muted-foreground text-sm">
							Proper announcements, semantic structure, and live region support
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Semantic HTML</h4>
						<p class="text-muted-foreground text-sm">
							Native elements and proper element types for better accessibility
						</p>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<h4 class="mb-2 font-semibold">Color Contrast</h4>
						<p class="text-muted-foreground text-sm">
							WCAG AA compliant color contrast ratios for all theme colors
						</p>
					</Card.Body>
				</Card.Root>
			</div>
		</div>
	</section>

	<!-- Keyboard Navigation -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Keyboard Navigation</h2>
			<p class="text-muted-foreground">
				All interactive components support standard keyboard interactions out of the box.
			</p>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-6">
				<div class="space-y-4">
					<div>
						<h4 class="mb-2 text-sm font-semibold">Universal Keys</h4>
						<div class="space-y-2">
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Tab</Badge>
								<span class="text-muted-foreground text-sm"
									>Navigate between focusable elements</span
								>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Shift+Tab</Badge>
								<span class="text-muted-foreground text-sm">Navigate backwards</span>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Enter</Badge>
								<span class="text-muted-foreground text-sm">Activate buttons and links</span>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Space</Badge>
								<span class="text-muted-foreground text-sm"
									>Activate buttons and toggle checkboxes</span
								>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Escape</Badge>
								<span class="text-muted-foreground text-sm"
									>Close dialogs, drawers, and popovers</span
								>
							</div>
						</div>
					</div>

					<div>
						<h4 class="mb-2 text-sm font-semibold">List & Menu Navigation</h4>
						<div class="space-y-2">
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">↑ ↓</Badge>
								<span class="text-muted-foreground text-sm">Navigate menu items and list items</span
								>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Home</Badge>
								<span class="text-muted-foreground text-sm">Jump to first item</span>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">End</Badge>
								<span class="text-muted-foreground text-sm">Jump to last item</span>
							</div>
						</div>
					</div>

					<div>
						<h4 class="mb-2 text-sm font-semibold">Tabs Navigation</h4>
						<div class="space-y-2">
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">← →</Badge>
								<span class="text-muted-foreground text-sm">Navigate between tabs</span>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">Home</Badge>
								<span class="text-muted-foreground text-sm">Jump to first tab</span>
							</div>
							<div class="flex gap-3">
								<Badge variant="secondary" class="font-mono text-xs">End</Badge>
								<span class="text-muted-foreground text-sm">Jump to last tab</span>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Component Examples</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{keyboardExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- ARIA Attributes -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">ARIA Attributes</h2>
			<p class="text-muted-foreground">
				Components automatically manage ARIA attributes for roles, states, and relationships.
			</p>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
					ARIA (Accessible Rich Internet Applications) attributes provide semantic information to
					assistive technologies. All components in @svelte-atoms/core automatically apply and
					manage the appropriate ARIA attributes based on component state. You don't need to
					manually add these—the Bond system handles them reactively.
				</p>
				<div>
					<h4 class="mb-3 text-sm font-semibold">Automatically Managed Attributes:</h4>
					<div class="grid gap-2 sm:grid-cols-2">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">role</code>
								<span class="text-muted-foreground text-sm"> - Semantic element role</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-expanded</code
								>
								<span class="text-muted-foreground text-sm"> - Collapsed/expanded state</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-selected</code
								>
								<span class="text-muted-foreground text-sm"> - Selection state</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-disabled</code
								>
								<span class="text-muted-foreground text-sm"> - Disabled state</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-checked</code
								>
								<span class="text-muted-foreground text-sm"> - Checkbox state</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-hidden</code
								>
								<span class="text-muted-foreground text-sm"> - Visibility state</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-labelledby</code
								>
								<span class="text-muted-foreground text-sm"> - Label association</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-describedby</code
								>
								<span class="text-muted-foreground text-sm"> - Description association</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
									>aria-controls</code
								>
								<span class="text-muted-foreground text-sm"> - Element relationships</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">•</div>
							<div>
								<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">aria-live</code
								>
								<span class="text-muted-foreground text-sm"> - Live region updates</span>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Automatic ARIA Management</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{ariaExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Focus Management -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Focus Management</h2>
			<p class="text-muted-foreground">
				Automatic focus trapping, restoration, and visible focus indicators for better keyboard
				navigation.
			</p>
		</div>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Focus Features</h3>
			<div class="space-y-3">
				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">1.</div>
							<div>
								<h4 class="mb-1 font-semibold">Focus Trap</h4>
								<p class="text-muted-foreground text-sm">
									Modal components (Dialog, Drawer) trap focus within their boundaries. Tab and
									Shift+Tab cycle through focusable elements without leaving the modal.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">2.</div>
							<div>
								<h4 class="mb-1 font-semibold">Focus Restoration</h4>
								<p class="text-muted-foreground text-sm">
									When a modal closes, focus automatically returns to the element that triggered it.
									This prevents users from losing their place in the document.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">3.</div>
							<div>
								<h4 class="mb-1 font-semibold">Initial Focus</h4>
								<p class="text-muted-foreground text-sm">
									Overlays automatically focus the first focusable element when opened, or the
									overlay itself if no focusable children exist.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">4.</div>
							<div>
								<h4 class="mb-1 font-semibold">Visible Focus Indicators</h4>
								<p class="text-muted-foreground text-sm">
									All interactive elements have clear focus indicators using the <code
										class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>:focus-visible</code
									> pseudo-class.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>
			</div>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Focus Trap Example</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{focusTrapExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Focus Restoration Example</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{focusManagementExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Semantic HTML -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Semantic HTML</h2>
			<p class="text-muted-foreground">
				Components use proper semantic HTML elements and can be customized with the `as` prop.
			</p>
		</div>

		<Card.Root class="mb-4 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground text-sm leading-relaxed">
					Semantic HTML uses elements that convey meaning about the content they contain. This helps
					screen readers, search engines, and other tools understand the structure and purpose of
					your content. All components default to semantic elements, and you can override them using
					the <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">as</code> prop when
					needed.
				</p>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Semantic Structure</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{semanticExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Screen Reader Support -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Screen Reader Support</h2>
			<p class="text-muted-foreground">
				Proper labeling, announcements, and semantic structure for assistive technologies.
			</p>
		</div>

		<Card.Root class="mb-6 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground mb-4 text-sm leading-relaxed">
					Screen readers rely on proper semantic structure, ARIA attributes, and accessible labels
					to convey information to users. Components ensure that all interactive elements have
					accessible names, state changes are announced, and relationships between elements are
					clear.
				</p>
				<div>
					<h4 class="mb-3 text-sm font-semibold">Screen Reader Best Practices:</h4>
					<div class="space-y-2">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">✓</div>
							<div>
								<span class="text-sm font-semibold">Accessible Names:</span>
								<span class="text-muted-foreground text-sm">
									Use <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>aria-label</code
									>
									or
									<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>aria-labelledby</code
									> for icon-only buttons
								</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">✓</div>
							<div>
								<span class="text-sm font-semibold">Live Regions:</span>
								<span class="text-muted-foreground text-sm">
									Use <code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>role="alert"</code
									>
									or
									<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">aria-live</code
									> for dynamic content
								</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">✓</div>
							<div>
								<span class="text-sm font-semibold">Descriptions:</span>
								<span class="text-muted-foreground text-sm">
									Associate help text with inputs using <code
										class="bg-muted text-foreground rounded px-1 py-0.5 text-xs"
										>aria-describedby</code
									>
								</span>
							</div>
						</div>
						<div class="flex gap-2">
							<div class="text-primary mt-0.5">✓</div>
							<div>
								<span class="text-sm font-semibold">State Changes:</span>
								<span class="text-muted-foreground text-sm">
									State attributes like <code
										class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">aria-expanded</code
									> announce automatically
								</span>
							</div>
						</div>
					</div>
				</div>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Screen Reader Patterns</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{screenReaderExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Custom Attributes -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Custom ARIA Attributes</h2>
			<p class="text-muted-foreground">
				Extend components with custom ARIA attributes using variants or props.
			</p>
		</div>

		<Card.Root class="mb-4 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground text-sm leading-relaxed">
					While components provide sensible ARIA defaults, you can add or override attributes using
					either the variant system (for global configuration) or by passing them directly as props.
					The variant system is particularly powerful for applying ARIA attributes based on
					component state.
				</p>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Variants with ARIA</span>
					<Badge variant="secondary" class="text-xs">TypeScript</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{customAttributesExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Disabled States -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Disabled States</h2>
			<p class="text-muted-foreground">
				Proper handling of disabled states with visual cues and ARIA attributes.
			</p>
		</div>

		<Card.Root class="mb-4 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground text-sm leading-relaxed">
					Disabled elements are excluded from keyboard navigation and properly announced to screen
					readers. Components use <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">aria-disabled</code
					>
					(for custom elements) or the native
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">disabled</code>
					attribute (for form inputs) along with visual styling to indicate their state.
				</p>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Disabled State Handling</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{disabledStateExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Visual Indicators -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Focus Indicators</h2>
			<p class="text-muted-foreground">
				Clear visual focus indicators for keyboard navigation users.
			</p>
		</div>

		<Card.Root class="mb-4 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground text-sm leading-relaxed">
					All interactive components include visible focus indicators using the <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">:focus-visible</code
					>
					pseudo-class. This ensures keyboard users can see which element has focus, while avoiding focus
					rings on mouse clicks. You can customize focus styles using the
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">--ring</code> CSS custom
					property.
				</p>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Focus Styles</span>
					<Badge variant="secondary" class="text-xs">CSS</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{visualIndicatorsExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Reduced Motion -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Reduced Motion Support</h2>
			<p class="text-muted-foreground">Respect user preferences for reduced motion animations.</p>
		</div>

		<Card.Root class="mb-4 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground text-sm leading-relaxed">
					Components that include animations automatically respect the <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
						>prefers-reduced-motion</code
					>
					media query. When users enable reduced motion in their system settings, animations are either
					disabled or significantly reduced. You should follow this pattern in your custom animations
					as well.
				</p>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Reduced Motion Pattern</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{reducedMotionExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Color Contrast -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Color Contrast</h2>
			<p class="text-muted-foreground">
				All theme colors meet WCAG AA standards for color contrast ratios.
			</p>
		</div>

		<Card.Root class="mb-4 border-2">
			<Card.Body class="p-6">
				<p class="text-muted-foreground text-sm leading-relaxed">
					The default theme is designed to meet <strong>WCAG AA</strong> standards with a minimum contrast
					ratio of 4.5:1 for normal text and 3:1 for large text. All foreground/background color combinations
					have been tested for sufficient contrast. When creating custom themes, ensure your color pairs
					maintain these ratios.
				</p>
			</Card.Body>
		</Card.Root>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Accessible Color Pairs</span>
					<Badge variant="secondary" class="text-xs">Svelte</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{colorContrastExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Testing -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Accessibility Testing</h2>
			<p class="text-muted-foreground">
				Test accessibility with automated tools and manual keyboard/screen reader testing.
			</p>
		</div>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Testing Checklist</h3>
			<div class="space-y-3">
				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">1.</div>
							<div>
								<h4 class="mb-1 font-semibold">Keyboard Navigation</h4>
								<p class="text-muted-foreground text-sm">
									Test that all interactive elements can be reached and activated using only the
									keyboard (Tab, Enter, Space, Arrow keys).
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">2.</div>
							<div>
								<h4 class="mb-1 font-semibold">Screen Reader Testing</h4>
								<p class="text-muted-foreground text-sm">
									Test with NVDA (Windows), JAWS (Windows), or VoiceOver (macOS/iOS) to ensure
									content is properly announced and navigable.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">3.</div>
							<div>
								<h4 class="mb-1 font-semibold">Automated Testing</h4>
								<p class="text-muted-foreground text-sm">
									Use tools like axe DevTools, Lighthouse, or WAVE to catch common accessibility
									issues automatically.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">4.</div>
							<div>
								<h4 class="mb-1 font-semibold">Color Contrast</h4>
								<p class="text-muted-foreground text-sm">
									Verify all text meets WCAG contrast requirements using contrast checker tools or
									browser extensions.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>

				<Card.Root class="border-2">
					<Card.Body class="p-4">
						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">5.</div>
							<div>
								<h4 class="mb-1 font-semibold">Focus Indicators</h4>
								<p class="text-muted-foreground text-sm">
									Ensure focus indicators are clearly visible when navigating with keyboard.
								</p>
							</div>
						</div>
					</Card.Body>
				</Card.Root>
			</div>
		</div>

		<Card.Root class="border-2">
			<Card.Body class="p-0">
				<div
					class="border-border bg-muted/50 flex items-center justify-between border-b px-4 py-2.5"
				>
					<span class="text-muted-foreground text-sm font-medium">Testing Example</span>
					<Badge variant="secondary" class="text-xs">TypeScript</Badge>
				</div>
				<div class="bg-muted p-5">
					<pre class="overflow-x-auto text-sm leading-relaxed"><code class="text-foreground"
							>{testingExample}</code
						></pre>
				</div>
			</Card.Body>
		</Card.Root>
	</section>

	<!-- Best Practices -->
	<section class="mb-16">
		<div class="mb-8">
			<h2 class="mb-2 text-3xl font-bold">Best Practices</h2>
			<p class="text-muted-foreground">
				Guidelines for building accessible applications with @svelte-atoms/core.
			</p>
		</div>

		<div class="space-y-3">
			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">1.</div>
						<div>
							<h4 class="mb-1 font-semibold">Use Semantic HTML</h4>
							<p class="text-muted-foreground text-sm">
								Prefer semantic elements (<code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">{'<'}button></code
								>,
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">{'<'}nav></code>,
								<code class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">{'<'}main></code
								>) over generic divs with ARIA roles.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">2.</div>
						<div>
							<h4 class="mb-1 font-semibold">Provide Accessible Labels</h4>
							<p class="text-muted-foreground text-sm">
								All interactive elements need accessible names. Use visible labels or <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">aria-label</code
								> for icon-only buttons.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">3.</div>
						<div>
							<h4 class="mb-1 font-semibold">Don't Override ARIA</h4>
							<p class="text-muted-foreground text-sm">
								Components manage ARIA attributes automatically. Only override them if you have a
								specific need and understand the implications.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">4.</div>
						<div>
							<h4 class="mb-1 font-semibold">Test with Real Users</h4>
							<p class="text-muted-foreground text-sm">
								Automated tools catch common issues, but testing with real assistive technology
								users is invaluable for finding usability problems.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">5.</div>
						<div>
							<h4 class="mb-1 font-semibold">Maintain Focus Order</h4>
							<p class="text-muted-foreground text-sm">
								Ensure tab order follows visual flow. Avoid using positive <code
									class="bg-muted text-foreground rounded px-1 py-0.5 text-xs">tabindex</code
								> values as they disrupt natural order.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">6.</div>
						<div>
							<h4 class="mb-1 font-semibold">Ensure Sufficient Contrast</h4>
							<p class="text-muted-foreground text-sm">
								Always verify color contrast meets WCAG AA standards (4.5:1 for normal text, 3:1 for
								large text).
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">7.</div>
						<div>
							<h4 class="mb-1 font-semibold">Support Keyboard Navigation</h4>
							<p class="text-muted-foreground text-sm">
								Every interactive element reachable by mouse must also be reachable and operable by
								keyboard alone.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>

			<Card.Root class="border-2">
				<Card.Body class="p-4">
					<div class="flex gap-2">
						<div class="text-primary mt-0.5 flex-shrink-0 font-bold">8.</div>
						<div>
							<h4 class="mb-1 font-semibold">Respect User Preferences</h4>
							<p class="text-muted-foreground text-sm">
								Honor system settings like reduced motion, high contrast mode, and dark mode
								preferences.
							</p>
						</div>
					</div>
				</Card.Body>
			</Card.Root>
		</div>
	</section>
</div>
