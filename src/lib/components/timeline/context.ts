import { getContext, setContext } from 'svelte';
import type { TimelineAlign, TimelineOrientation } from './types';

export type TimelineContext = {
	orientation: TimelineOrientation;
	align: TimelineAlign;
};

const KEY = '@svelte-atoms/context/timeline';

export function setTimelineContext(ctx: TimelineContext) {
	return setContext(KEY, ctx);
}

export function getTimelineContext(): TimelineContext {
	return getContext(KEY) ?? { orientation: 'vertical', align: 'left' };
}
