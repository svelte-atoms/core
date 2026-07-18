<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { bindBond } from '$ixirjs/ui/shared';
	import { createAtomInstance } from '$ixirjs/ui/shared/bond';
	import { HtmlAtom, mergeAtomProps, type Base } from '$ixirjs/ui/components/atom';
	import { StepperBond, StepperRootAtom, type StepperBondProps } from './bond.svelte';
	import type { StepperRootProps } from './types';

	let {
		step = $bindable(0),
		linear = false,
		disabled = false,
		orientation = 'horizontal',
		onstepchange = undefined,
		class: klass = '',
		children = undefined,
		factory = defaultFactory,
		preset = undefined,
		...restProps
	}: StepperRootProps<E, B> = $props();

	let stepState = $derived(step);
	const callbackState = { bond: undefined as StepperBond | undefined };

	const binding = bindBond<StepperBond>(
		(props) => factory(props),
		{
			step: [
				() => stepState,
				(v) => {
					const changed = !Object.is(stepState, v);
					stepState = v;
					step = stepState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						onstepchange?.(stepState, { bond: callbackBond });
					}
				}
			],
			linear: () => linear,
			disabled: () => disabled,
			orientation: () => orientation
		},
		{ preset: () => preset }
	);
	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance<StepperRootAtom, StepperBond>('root', {
		bond,
		factory: (owner) => new StepperRootAtom(owner as StepperBond)
	});
	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	function defaultFactory(props: StepperBondProps) {
		return StepperBond.create(props);
	}

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom class={['flex flex-col', '$preset', klass]} {...rootProps}>
	{@render children?.({ stepper: bond })}
</HtmlAtom>
