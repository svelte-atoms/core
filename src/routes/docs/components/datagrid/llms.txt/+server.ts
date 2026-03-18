import { render } from 'svelte/server';
import Page from './page.svelte';
import { metadata } from '../shared';
import {
	datagridRootProps,
	datagridHeaderProps,
	datagridBodyProps,
	datagridFooterProps,
	datagridThProps,
	datagridTdProps,
	datagridCheckboxProps,
	datagridTrProps
} from '../props';

export function GET() {
	const { body } = render(Page, { props: { data: { metadata, datagridRootProps, datagridHeaderProps, datagridBodyProps, datagridFooterProps, datagridThProps, datagridTdProps, datagridCheckboxProps, datagridTrProps } } });
	const text = body
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&amp;/g, '&');

	return new Response(text, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
}
