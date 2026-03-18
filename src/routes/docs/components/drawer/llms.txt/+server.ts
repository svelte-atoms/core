import { render } from 'svelte/server';
import Page from './page.svelte';
import { metadata } from '../shared';
import {
	slideoverRootProps,
	slideoverContentProps,
	slideoverHeaderProps,
	drawerBodyProps,
	slideoverFooterProps,
	slideoverTitleProps,
	slideoverDescriptionProps,
	slideoverBackdropProps
} from '../props';

export function GET() {
	const { body } = render(Page, { props: { data: { metadata, slideoverRootProps, slideoverContentProps, slideoverHeaderProps, drawerBodyProps, slideoverFooterProps, slideoverTitleProps, slideoverDescriptionProps, slideoverBackdropProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
