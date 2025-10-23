<script module lang="ts">
	export type InputPortals = 'input.l0' | 'input.l1' | 'input.l2' | 'input.l3';

	export type InputProps = {
		value?: string;
		files?: File[];
		date?: Date | null;
		number?: number;
		checked?: boolean;
		class?: string;
		type?: HTMLInputTypeAttribute | null;
		preset?: PresetModuleName | (string & {});
		children?: Snippet<[]>;
	};
</script>

<script>
	import type { Snippet } from 'svelte';
	import type { HTMLInputTypeAttribute } from 'svelte/elements';
	import { on } from '$svelte-atoms/core/attachments/event.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { InputBond } from './bond.svelte';

	const bond = InputBond.get();

	let {
		value = $bindable(),
		files = $bindable(),
		date = $bindable(),
		number = $bindable(),
		checked = $bindable(),
		class: klass = '',
		type = 'text',
		preset: presetKey = 'input.value',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputProps = $props();

	const preset = getPreset(presetKey as PresetModuleName)?.apply(bond, [bond]);

	const valueProps = $derived({
		...(bond?.input?.() ?? {}),
		...restProps
	});

	function handleChange(ev: CustomEvent) {
		if (!onchange) return;

		onchange?.(ev, {
			value: value,
			files: files,
			date: date,
			number: number,
			checked: checked,
			event: ev
		});
	}

	function handleInput(ev: InputEvent) {
		if (!oninput) return;

		const currentTarget = ev.currentTarget as HTMLInputElement;

		if (type === 'number') {
			number = currentTarget.valueAsNumber;
		}

		if (type === 'date' || type == 'time' || type === 'datetime-local' || type === 'date-local') {
			date = currentTarget.valueAsDate;
		}

		oninput?.(ev, {
			value: value,
			files: files,
			date: date,
			number: number,
			checked: checked,
			event: ev
		});
	}
</script>

<input
	{type}
	bind:value={
		() => value,
		(v) => {
			value = v;
			if (bond) {
				bond.state.props.value = v;
			}
		}
	}
	class={[
		'h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none',
		preset?.class,
		toClassValue(bond, klass)
	]}
	onchange={handleChange}
	oninput={handleInput}
	{...valueProps}
	{@attach (node) => {
		if (type === 'file') {
			return on('input', () => {
				files = Array.from(node.files || []);
				bond!.state.props.files = files;
			})(node);
		}
	}}
/>
