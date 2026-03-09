export type ColorScheme = 'light' | 'dark';

export function colorScheme() {
	let scheme = $state<ColorScheme | undefined>('light');
	let media: MediaQueryList | undefined;

	try {
		media = getMedia();
		scheme = media.matches ? 'dark' : 'light';
	} catch (e) {}

	$effect.pre(() => {
		if (typeof window === 'undefined') return;

		const handleChange = (ev: MediaQueryListEvent) => {
			scheme = ev.matches ? 'dark' : 'light';
		};

		const media = getMedia();
		media.addEventListener('change', handleChange);

		scheme = media.matches ? 'dark' : 'light';

		return () => {
			media.removeEventListener('change', handleChange);
		};
	});

	return {
		get current() {
			return scheme;
		}
	};

	function getMedia() {
		if (media) {
			return media;
		}

		return window.matchMedia('(prefers-color-scheme: dark)');
	}
}
