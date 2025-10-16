export function on<E extends Event = Event, T extends EventTarget = Element>(
	type: keyof HTMLElementEventMap,
	handler: (ev: E & { currentTarget: EventTarget & T }) => void,
	options?: boolean | AddEventListenerOptions | undefined
) {
	const listener: EventListenerOrEventListenerObject = (ev: Event) => handler?.(ev);

	return (node: T) => {
		node.addEventListener(type, listener, options);

		return () => node.removeEventListener(type, listener, options);
	};
}
