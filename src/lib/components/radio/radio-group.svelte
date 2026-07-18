<script lang="ts" generics="T = string">
	import {
		setRadioGroupContext,
		type RadioCheckedChangeListener,
		type RadioGroupContext
	} from './context';
	import { mergePresetProps, HtmlAtom } from '$ixirjs/ui/components/atom';
	import { defineProperty, defineState } from '$ixirjs/ui/utils';
	import type { RadioGroupProps } from './types';

	let {
		class: klass = '',
		preset = undefined,
		disabled = false,
		readonly = false,
		required = false,
		name = undefined,
		value = $bindable(),
		children,
		onvaluechange = undefined,
		...restProps
	}: RadioGroupProps<T> = $props();

	const groupProps = $derived(mergePresetProps(preset, 'radio.group', restProps));
	const checkedChangeListeners = new Map<T, Set<RadioCheckedChangeListener>>();

	function register(itemValue: T, listener: RadioCheckedChangeListener) {
		const listeners = checkedChangeListeners.get(itemValue) ?? new Set();
		listeners.add(listener);
		checkedChangeListeners.set(itemValue, listeners);

		return () => {
			listeners.delete(listener);
			if (listeners.size === 0) checkedChangeListeners.delete(itemValue);
		};
	}

	function notify(
		itemValue: T,
		checked: boolean,
		event: Event,
		source?: RadioCheckedChangeListener
	) {
		let sourceNotified = false;
		for (const listener of checkedChangeListeners.get(itemValue) ?? []) {
			listener(checked, event);
			if (listener === source) sourceNotified = true;
		}
		return sourceNotified;
	}

	function select(nextValue: T, event: Event, source?: RadioCheckedChangeListener) {
		if (Object.is(value, nextValue)) return false;

		const previousValue = value;
		value = nextValue;

		if (previousValue !== undefined) notify(previousValue, false, event);
		if (!notify(nextValue, true, event, source)) source?.(true, event);
		onvaluechange?.(nextValue, { event });
		return true;
	}

	const context = defineState<RadioGroupContext<T>>(
		[
			defineProperty('disabled', () => disabled ?? false),
			defineProperty('name', () => name),
			defineProperty('readonly', () => readonly ?? false),
			defineProperty('required', () => required ?? false),
			defineProperty(
				'value',
				() => value,
				(v) => (value = v)
			)
		],
		() => ({ register, select })
	);

	setRadioGroupContext(context);
</script>

<HtmlAtom class={['flex flex-col gap-1', '$preset', klass]} {...groupProps}>
	{@render children?.({})}
</HtmlAtom>
