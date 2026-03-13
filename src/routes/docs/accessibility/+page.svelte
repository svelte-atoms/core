<script lang="ts">
	import { Badge } from '$svelte-atoms/core/components/badge';
	import { Section, CodeBlock } from '$docs/components';
	import { metadata } from './shared';

	const {
		keyboard: keyboardExample,
		aria: ariaExample,
		focusTrap: focusTrapExample,
		focusManagement: focusManagementExample,
		semantic: semanticExample,
		screenReader: screenReaderExample,
		customAttributes: customAttributesExample,
		disabledState: disabledStateExample,
		visualIndicators: visualIndicatorsExample,
		reducedMotion: reducedMotionExample,
		colorContrast: colorContrastExample,
		testing: testingExample
	} = metadata.examples;
</script>

<div class="py-8">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Accessibility</h1>
		<p class="text-muted-foreground text-lg">
			Built-in accessibility features following WAI-ARIA standards with keyboard navigation, focus
			management, and screen reader support.
		</p>
	</div>

	<!-- Overview -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="overview">Overview</Section.Title>
			<Section.Subtitle>
				All components are designed with accessibility as a first-class concern, not an
				afterthought.
			</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground leading-relaxed">
					@svelte-atoms/core follows the <strong>WAI-ARIA Authoring Practices Guide (APG)</strong>
					to ensure components are accessible to users of assistive technologies. Every component includes
					proper ARIA attributes, keyboard navigation, focus management, and semantic HTML structure
					by default. You don't need to add these features manually—they're built in.
				</p>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Core Accessibility Features</h3>
			<div class="grid gap-4 sm:grid-cols-2">
						<h4 class="mb-2 font-semibold">Keyboard Navigation</h4>
						<p class="text-muted-foreground text-sm">
							Full keyboard support with Tab, Arrow keys, Enter, Space, Escape, Home, and End
						</p>

						<h4 class="mb-2 font-semibold">ARIA Attributes</h4>
						<p class="text-muted-foreground text-sm">
							Automatic role, state, and property attributes following ARIA specifications
						</p>

						<h4 class="mb-2 font-semibold">Focus Management</h4>
						<p class="text-muted-foreground text-sm">
							Focus trapping for modals, focus restoration on close, and visible focus indicators
						</p>

						<h4 class="mb-2 font-semibold">Screen Readers</h4>
						<p class="text-muted-foreground text-sm">
							Proper announcements, semantic structure, and live region support
						</p>

						<h4 class="mb-2 font-semibold">Semantic HTML</h4>
						<p class="text-muted-foreground text-sm">
							Native elements and proper element types for better accessibility
						</p>

						<h4 class="mb-2 font-semibold">Color Contrast</h4>
						<p class="text-muted-foreground text-sm">
							WCAG AA compliant color contrast ratios for all theme colors
						</p>
			</div>
		</div>
	</Section.Root>

	<!-- Keyboard Navigation -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="keyboard-navigation">Keyboard Navigation</Section.Title>
			<Section.Subtitle>
				All interactive components support standard keyboard interactions out of the box.
			</Section.Subtitle>
		</Section.Header>

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

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Component Examples</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={keyboardExample} /></div>

		</div>
	</Section.Root>

	<!-- ARIA Attributes -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="aria-attributes">ARIA Attributes</Section.Title>
			<Section.Subtitle>
				Components automatically manage ARIA attributes for roles, states, and relationships.
			</Section.Subtitle>
		</Section.Header>

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

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Automatic ARIA Management</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={ariaExample} /></div>

		</div>
	</Section.Root>

	<!-- Focus Management -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="focus-management">Focus Management</Section.Title>
			<Section.Subtitle>
				Automatic focus trapping, restoration, and visible focus indicators for better keyboard
				navigation.
			</Section.Subtitle>
		</Section.Header>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Focus Features</h3>
			<div class="space-y-3">
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
			</div>
		</div>

		<div class="mb-6 flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Focus Trap Example</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={focusTrapExample} /></div>

		</div>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Focus Restoration Example</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={focusManagementExample} /></div>

		</div>
	</Section.Root>

	<!-- Semantic HTML -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="semantic-html">Semantic HTML</Section.Title>
			<Section.Subtitle>
				Components use proper semantic HTML elements and can be customized with the `as` prop.
			</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground text-sm leading-relaxed">
					Semantic HTML uses elements that convey meaning about the content they contain. This helps
					screen readers, search engines, and other tools understand the structure and purpose of
					your content. All components default to semantic elements, and you can override them using
					the <code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">as</code> prop when
					needed.
				</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Semantic Structure</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={semanticExample} /></div>

		</div>
	</Section.Root>

	<!-- Screen Reader Support -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="screen-reader-support">Screen Reader Support</Section.Title>
			<Section.Subtitle>
				Proper labeling, announcements, and semantic structure for assistive technologies.
			</Section.Subtitle>
		</Section.Header>

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

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Screen Reader Patterns</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={screenReaderExample} /></div>

		</div>
	</Section.Root>

	<!-- Custom Attributes -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="custom-aria-attributes">Custom ARIA Attributes</Section.Title>
			<Section.Subtitle>
				Extend components with custom ARIA attributes using variants or props.
			</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground text-sm leading-relaxed">
					While components provide sensible ARIA defaults, you can add or override attributes using
					either the variant system (for global configuration) or by passing them directly as props.
					The variant system is particularly powerful for applying ARIA attributes based on
					component state.
				</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Variants with ARIA</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={customAttributesExample} /></div>

		</div>
	</Section.Root>

	<!-- Disabled States -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="disabled-states">Disabled States</Section.Title>
			<Section.Subtitle>
				Proper handling of disabled states with visual cues and ARIA attributes.
			</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground text-sm leading-relaxed">
					Disabled elements are excluded from keyboard navigation and properly announced to screen
					readers. Components use <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">aria-disabled</code
					>
					(for custom elements) or the native
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">disabled</code>
					attribute (for form inputs) along with visual styling to indicate their state.
				</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Disabled State Handling</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={disabledStateExample} /></div>

		</div>
	</Section.Root>

	<!-- Visual Indicators -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="focus-indicators">Focus Indicators</Section.Title>
			<Section.Subtitle>
				Clear visual focus indicators for keyboard navigation users.
			</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground text-sm leading-relaxed">
					All interactive components include visible focus indicators using the <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">:focus-visible</code
					>
					pseudo-class. This ensures keyboard users can see which element has focus, while avoiding focus
					rings on mouse clicks. You can customize focus styles using the
					<code class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs">--ring</code> CSS custom
					property.
				</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Focus Styles</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={visualIndicatorsExample} /></div>

		</div>
	</Section.Root>

	<!-- Reduced Motion -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="reduced-motion-support">Reduced Motion Support</Section.Title>
			<Section.Subtitle>Respect user preferences for reduced motion animations.</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground text-sm leading-relaxed">
					Components that include animations automatically respect the <code
						class="bg-muted text-foreground rounded px-1.5 py-0.5 text-xs"
						>prefers-reduced-motion</code
					>
					media query. When users enable reduced motion in their system settings, animations are either
					disabled or significantly reduced. You should follow this pattern in your custom animations
					as well.
				</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Reduced Motion Pattern</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={reducedMotionExample} /></div>

		</div>
	</Section.Root>

	<!-- Color Contrast -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="color-contrast">Color Contrast</Section.Title>
			<Section.Subtitle>
				All theme colors meet WCAG AA standards for color contrast ratios.
			</Section.Subtitle>
		</Section.Header>

				<p class="text-muted-foreground text-sm leading-relaxed">
					The default theme is designed to meet <strong>WCAG AA</strong> standards with a minimum contrast
					ratio of 4.5:1 for normal text and 3:1 for large text. All foreground/background color combinations
					have been tested for sufficient contrast. When creating custom themes, ensure your color pairs
					maintain these ratios.
				</p>

		<div class="flex flex-col">
			<div class="border-border py-2.5">
				<h3 class="font-semibold">Accessible Color Pairs</h3>
			</div>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={colorContrastExample} /></div>

		</div>
	</Section.Root>

	<!-- Testing -->
	<Section.Root>
		<Section.Header>
			<Section.Title id="accessibility-testing">Accessibility Testing</Section.Title>
			<Section.Subtitle>
				Test accessibility with automated tools and manual keyboard/screen reader testing.
			</Section.Subtitle>
		</Section.Header>

		<div class="mb-6">
			<h3 class="text-foreground mb-4 text-lg font-semibold">Testing Checklist</h3>
			<div class="space-y-3">
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

						<div class="flex gap-2">
							<div class="text-primary mt-0.5 flex-shrink-0 font-bold">5.</div>
							<div>
								<h4 class="mb-1 font-semibold">Focus Indicators</h4>
								<p class="text-muted-foreground text-sm">
									Ensure focus indicators are clearly visible when navigating with keyboard.
								</p>
							</div>
						</div>
			</div>
		</div>

				<h3 class="font-semibold mb-3">Testing Example</h3>
				<div class="overflow-hidden rounded-lg"><CodeBlock lang="typescript" code={testingExample} /></div>
	</Section.Root>

	<!-- Best Practices -->
	<Section.Root class="mb-0">
		<Section.Header>
			<Section.Title id="best-practices">Best Practices</Section.Title>
			<Section.Subtitle>
				Guidelines for building accessible applications with @svelte-atoms/core.
			</Section.Subtitle>
		</Section.Header>

		<div class="space-y-3">
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
		</div>
	</Section.Root>
</div>