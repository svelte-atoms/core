<script lang="ts">
	let { size = 48, class: className = 'text-white' } = $props();

	// 6 axes representing the core principles
	const axes = [
		{ name: 'Reactivity', angle: 0 },
		{ name: 'Composability', angle: 60 },
		{ name: 'Extensibility', angle: 120 },
		{ name: 'Headless', angle: 180 },
		{ name: 'Accessibility', angle: 240 },
		{ name: 'Modularity', angle: 300 }
	];

	// Calculate dimensions
	const outerRadius = size * 0.45;
	const centerRadius = size * 0.25;

	// Create dash array for outer circle with 6 equal dashes
	// Circle circumference = 2 * π * r
	const circumference = 2 * Math.PI * outerRadius;
	const dashLength = circumference / 12; // 6 dashes + 6 gaps = 12 segments
	const dashArray = `${dashLength} ${dashLength}`;
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	class="atomic-logo {className}"
	role="img"
	aria-label="Atomic SV Logo - representing the 6 core axes of the component library"
>
	<!-- Outer dashed circle with 6 dashes -->
	<circle
		cx={size / 2}
		cy={size / 2}
		r={outerRadius}
		fill="none"
		stroke="currentColor"
		stroke-width={size * 0.05}
		stroke-dasharray={dashArray}
		stroke-linecap="round"
		class="opacity-80"
	/>

	<!-- Core solid circle -->
	<circle cx={size / 2} cy={size / 2} r={centerRadius} fill="currentColor" class="opacity-90" />
</svg>
