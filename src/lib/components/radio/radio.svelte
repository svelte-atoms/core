<script lang="ts" generics="T = string">
	import { getRadioGroupContext, type RadioCheckedChangeListener } from './context';
	import { Stack } from '../stack';
	import { toClassValue } from '$ixirjs/ui/utils';
	import { mergePresetProps, HtmlAtom } from '$ixirjs/ui/components/atom';
	import { animateRadioIndicatorIn, animateRadioIndicatorOut } from './motion.svelte';
	import type { RadioProps } from './types';

	const radioGroupContext = getRadioGroupContext<T>();

	let {
		class: klass = '',
		preset = undefined,
		value = $bindable(undefined),
		group = $bindable(),
		id = undefined,
		name = undefined,
		disabled = false,
		required = false,
		readonly = false,
		onchange = undefined,
		oninput = undefined,
		oncheckedchange = undefined,
		checkedContent = undefined,
		...restProps
	}: RadioProps<T> = $props();

	const radioProps = $derived(mergePresetProps(preset, 'radio', restProps));

	const _disabled = $derived(radioGroupContext?.disabled);
	const _required = $derived(radioGroupContext?.required);
	const _readonly = $derived(radioGroupContext?.readonly);
	const _name = $derived(radioGroupContext?.name);

	const proxy = {
		get current() {
			return radioGroupContext?.value ?? group;
		},
		set current(v) {
			group = v;
			if (radioGroupContext) {
				radioGroupContext.value = v;
			}
		}
	};

	const isDisabled = $derived(_disabled || disabled);
	const isRequired = $derived(_required || required);
	const isReadonly = $derived(_readonly || readonly);
	const isChecked = $derived(proxy.current === value);

	const checkedContentSnippet = $derived(
		isChecked ? (checkedContent ? customCheckedContent : defaultCheckedContent) : undefined
	);

	const notifyChecked: RadioCheckedChangeListener = (nextChecked, event) => {
		oncheckedchange?.(nextChecked, { event });
	};

	$effect(() => {
		if (!radioGroupContext || value === undefined) return;
		return radioGroupContext.register(value, notifyChecked);
	});

	let hasStandaloneInitialized = false;
	let previousStandaloneChecked = false;
	let pendingStandaloneEvent: Event | undefined;

	$effect(() => {
		if (radioGroupContext) return;

		const nextChecked = isChecked;
		if (hasStandaloneInitialized && previousStandaloneChecked !== nextChecked) {
			if (pendingStandaloneEvent) notifyChecked(nextChecked, pendingStandaloneEvent);
			else oncheckedchange?.(nextChecked, {});
		}

		previousStandaloneChecked = nextChecked;
		pendingStandaloneEvent = undefined;
		hasStandaloneInitialized = true;
	});

	function handleChange(event: Event) {
		onchange?.(event);
	}

	function select(event: Event) {
		if (value === undefined) return false;

		if (radioGroupContext) {
			return radioGroupContext.select(value, event, notifyChecked);
		}

		if (Object.is(group, value)) return false;
		group = value;
		return true;
	}

	function handleInput(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		oninput?.(event);

		if (!input.checked) return;

		if (!radioGroupContext) pendingStandaloneEvent = event;
		if (!select(event) && !radioGroupContext) pendingStandaloneEvent = undefined;
	}
</script>

{#snippet defaultCheckedContent()}
	<Stack.Item
		value="indicator"
		class="rounded-inherit pointer-events-none size-full scale-[0.6] bg-current"
		enter={animateRadioIndicatorIn()}
		exit={animateRadioIndicatorOut()}
	/>
{/snippet}

{#snippet customCheckedContent()}
	<HtmlAtom
		class="rounded-inherit pointer-events-none size-full scale-[0.6] bg-current"
		base={checkedContent}
		enter={animateRadioIndicatorIn()}
		exit={animateRadioIndicatorOut()}
	/>
{/snippet}

<Stack.Root
	class={[
		'text-foreground bg-input box-border inline-flex aspect-square size-4 max-h-fit max-w-fit cursor-pointer place-items-center rounded-full border border-border p-0',
		isDisabled && 'pointer-events-none opacity-50',
		toClassValue(klass, {})
	]}
	as="label"
	{...radioProps}
>
	<Stack.Item value="control" class="pointer-events-none flex size-full">
		<input
			bind:group={proxy.current}
			{id}
			{value}
			class="pointer-events-auto size-0 opacity-0"
			type="radio"
			name={_name ?? name}
			disabled={isDisabled}
			required={isRequired}
			readonly={isReadonly}
			onchange={handleChange}
			oninput={handleInput}
		/>
	</Stack.Item>

	{@render checkedContentSnippet?.()}
</Stack.Root>
