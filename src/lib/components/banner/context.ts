import { getContext, setContext } from 'svelte';

export type BannerContext = {
	dismiss: () => void;
};

const KEY = '@svelte-atoms/context/banner';
export const setBannerContext = (ctx: BannerContext) => setContext(KEY, ctx);
export const getBannerContext = (): BannerContext => getContext(KEY);
