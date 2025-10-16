import { getContext, setContext } from 'svelte';

const ELEMENT_CONTEXT_KEY = '@atom-ui/context/gsap/element';

export function animate<T extends Element>(
	callback: (node: T, parentTween?: gsap.core.Tween) => gsap.core.Tween
) {
	return (node: T) => {
		const parentTween = getContext(ELEMENT_CONTEXT_KEY) as gsap.core.Tween | undefined;

		const tween = callback(node, parentTween);

		setContext(ELEMENT_CONTEXT_KEY, tween);

		return () => {};
	};
}

const TIMELINE_CONTEXT_KEY = '@atom-ui/context/gsap/timeline';

function timelineIdKey(id: string) {
	return [TIMELINE_CONTEXT_KEY, id].join('/');
}

export function timeline<T>(
	callback: (node: T, parentTimeline?: gsap.core.Timeline) => gsap.core.Timeline,
	id?: string,
	parentId?: string
) {
	return (node: T) => {
		const parentKey = parentId ? timelineIdKey(parentId) : TIMELINE_CONTEXT_KEY;
		const parentTimeline = getContext(parentKey) as gsap.core.Timeline | undefined;

		const timeline = callback(node, parentTimeline);

		if (id) {
			setContext(timelineIdKey(id), timeline);
		}
		setContext(TIMELINE_CONTEXT_KEY, timeline);

		return () => {};
	};
}
