<script module lang="ts">
	export type InputPortals = 'input.l0' | 'input.l1' | 'input.l2' | 'input.l3';
</script>

<script lang="ts" generics="B extends Base = Base">
	import { on } from '$svelte-atoms/core/attachments/event.svelte';
	import { getPreset } from '$svelte-atoms/core/context';
	import { cn, toClassValue } from '$svelte-atoms/core/utils';
	import type { PresetModuleName } from '$svelte-atoms/core/context/preset.svelte';
	import { InputBond } from './bond.svelte';
	import type { InputControlProps } from './types';
	import type { Base } from '../atom';

	const bond = InputBond.get();

	let {
		value = $bindable(),
		files = $bindable(),
		date = $bindable(),
		number = $bindable(),
		checked = $bindable(),
		class: klass = '',
		type = 'text',
		preset: presetKey = 'input.control',
		onchange = undefined,
		oninput = undefined,
		...restProps
	}: InputControlProps<B> = $props();

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

	function toFileList(files: File[]) {
		const dataTransfer = new DataTransfer();
		files.forEach((file) => dataTransfer.items.add(file));
		return dataTransfer.files;
	}
</script>

<input
	bind:value={
		() => value,
		(v) => {
			value = v;
			if (bond) {
				bond.state.props.value = v;
			}
		}
	}
	bind:files={
		() => toFileList(files ?? []),
		(v) => {
			files = Array.from(v ?? []);
			if (bond) {
				bond.state.props.files = files;
			}
		}
	}
	class={cn(
		'text-foreground placeholder:text-muted-foreground h-full w-full flex-1 bg-transparent px-2 leading-1 outline-none',
		preset?.class,
		toClassValue(klass, bond)
	)}
	type={type ?? 'text'}
	onchange={handleChange}
	oninput={handleInput}
	{...valueProps}
/>
