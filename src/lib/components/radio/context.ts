import { getContext, setContext } from 'svelte';

export const RADIO_GROUP_CONTEXT_KEY = '@atoms/context/radio/group';

export type RadioCheckedChangeListener = (checked: boolean, event: Event) => void;

export type RadioGroupContext<T = string> = {
	disabled: boolean;
	required: boolean;
	readonly: boolean;
	name?: string;
	value: T | undefined;
	register(value: T, listener: RadioCheckedChangeListener): () => void;
	select(value: T, event: Event, source?: RadioCheckedChangeListener): boolean;
};

export function getRadioGroupContext<T = string>(): RadioGroupContext<T> | undefined {
	return getContext(RADIO_GROUP_CONTEXT_KEY);
}

export function setRadioGroupContext<T = string>(
	context: RadioGroupContext<T>
): RadioGroupContext<T> {
	return setContext(RADIO_GROUP_CONTEXT_KEY, context);
}
