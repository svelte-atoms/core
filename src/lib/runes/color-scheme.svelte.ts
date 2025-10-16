export type ColorScheme = 'light' | 'dark';

export function colorScheme() {
	let scheme = $state<ColorScheme | undefined>(undefined);

	$effect(() => {
		if (typeof window === 'undefined') return;

		const handleChange = (ev: MediaQueryListEvent) => {
			scheme = ev.matches ? 'light' : 'dark';
		};

		const media = window.matchMedia('(prefers-color-scheme: light)');
		media.addEventListener('change', handleChange);

		scheme = media.matches ? 'light' : 'dark';

		return () => {
			media.removeEventListener('change', handleChange);
		};
	});

	return {
		get current() {
			return scheme;
		}
	};
}
