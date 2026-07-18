<script lang="ts" generics="E extends keyof HTMLElementTagNameMap = 'div', B extends Base = Base">
	import { HtmlAtom, type Base } from '$ixirjs/ui/components/atom';
	import { mergeAtomProps } from '$ixirjs/ui/components/atom';
	import { ToastBond, ToastRootAtom } from './bond.svelte';
	import type { ToastRootProps } from './types';
	import { bindBond, createAtomInstance } from '$ixirjs/ui/shared';

	let {
		open = $bindable(true),
		disabled = false,
		duration = 0,
		dismissible = true,
		preset = undefined,
		factory = (props) => ToastBond.create(props),
		children = undefined,
		onopenchange = undefined,
		...restProps
	}: ToastRootProps<E, B> = $props();

	let openState = $derived(open);
	const callbackState = { bond: undefined as ToastBond | undefined };

	const binding = bindBond<ToastBond>(
		(props) => factory(props),
		{
			open: [
				() => openState,
				(v) => {
					const changed = !Object.is(openState, v);
					openState = v;
					open = openState;

					const callbackBond = callbackState.bond;
					if (changed && callbackBond) {
						onopenchange?.(openState, {
							bond: callbackBond,
							...callbackBond.takeOpenChangeContext()
						});
					}
				}
			],
			disabled: () => disabled,
			dismissible: () => dismissible
		},
		{ preset: () => preset }
	);

	const bond = binding.bond.share();
	callbackState.bond = bond;
	const rootAtom = createAtomInstance('root', {
		bond,
		factory: (owner) => new ToastRootAtom(owner!)
	});

	const rootProps = $derived(
		mergeAtomProps(rootAtom, preset, { ...binding.stateProps, ...restProps })
	);

	// Auto-dismiss when duration > 0.
	$effect(() => {
		if (!openState || duration <= 0) return;
		const handle = setTimeout(() => {
			bond.stageOpenChange({ reason: 'timeout' });
			bond.close();
		}, duration);
		return () => clearTimeout(handle);
	});

	export function getBond() {
		return bond;
	}
</script>

<HtmlAtom {...rootProps}>
	{@render children?.({ toast: bond })}
</HtmlAtom>
