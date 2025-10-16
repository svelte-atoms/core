import { getContext, setContext } from 'svelte';
import { merge } from 'es-toolkit';
import type { ClassValue } from '$svelte-atoms/core/utils';
import type { Base } from '$svelte-atoms/core/components/atom';

export type ModuleName =
	| 'accordion'
	| 'accordion.item.body'
	| 'accordion.item.header'
	| 'accordion.item.indicator'
	| 'accordion.item'
	| 'alert.actions'
	| 'alert.close-button'
	| 'alert.content'
	| 'alert.description'
	| 'alert.icon'
	| 'alert'
	| 'alert.title'
	| 'card.content'
	| 'card.description'
	| 'card.footer'
	| 'card.header'
	| 'card.media'
	| 'card'
	| 'card.subtitle'
	| 'card.title'
	| 'collapsible.body'
	| 'collapsible.header'
	| 'collapsible.indicator'
	| 'collapsible'
	| 'combobox.input'
	| 'combobox.trigger'
	| 'combobox.item'
	| 'dialog.close-button'
	| 'dialog.body'
	| 'dialog.content'
	| 'dialog.description'
	| 'dialog.footer'
	| 'dialog.header'
	| 'dialog'
	| 'dialog.title'
	| 'divider'
	| 'dropdown.placeholder'
	| 'dropdown.query'
	| 'dropdown.trigger'
	| 'dropdown.value'
	| 'dropdown'
	| 'field.control'
	| 'field.label'
	| 'field'
	| 'form'
	| 'icon'
	| 'input.placeholder'
	| 'stack'
	| 'input.value'
	| 'label'
	| 'layer.inner'
	| 'layer'
	| 'link'
	| 'list.divider'
	| 'list.group'
	| 'list.item'
	| 'list.item'
	| 'list.item'
	| 'dropdown.item'
	| 'menu.body'
	| 'popover.arrow'
	| 'popover.indicator'
	| 'popover.content'
	| 'popover.trigger'
	| 'portal.inner'
	| 'portal'
	| 'root'
	| 'root.portals'
	| 'sidebar.content'
	| 'sidebar'
	| 'drawer.backdrop'
	| 'drawer.body'
	| 'drawer.content'
	| 'drawer.description'
	| 'drawer.title'
	| 'drawer.footer'
	| 'drawer.header'
	| 'drawer'
	| 'stack.item'
	| 'stack'
	| 'tabs.body'
	| 'tabs.header'
	| 'tabs'
	| 'tab.header'
	| 'tab.body'
	| 'tab.description'
	| 'tab'
	| 'tree.body'
	| 'tree.header'
	| 'tree.indicator'
	| 'tree'
	| 'datagrid'
	| 'datagrid.header'
	| 'datagrid.th'
	| 'datagrid.body'
	| 'datagrid.tr'
	| 'datagrid.td'
	| 'datagrid.footer'
	| 'datagrid.checkbox'
	| 'datagrid.sort-icon'
	| 'scrollable'
	| 'scrollable.container'
	| 'scrollable.content'
	| 'scrollable.track'
	| 'scrollable.thumb'
	| 'breadcrumb'
	| 'breadcrumb.item'
	| 'breadcrumb.separator'
	| 'badge'
	| 'button'
	| 'checkbox'
	| 'checkbox.checkmark'
	| 'checkbox.indeterminate'
	| 'radio'
	| 'radio.group'
	| 'container';

export type PresetEntry = {
	class?: ClassValue;
	as?: string;
	base?: Base;
};
export type Preset = Record<ModuleName, PresetEntry>;

const CONTEXT_KEY = '@svelte-atoms/context/preset';

export function getPreset<K extends ModuleName>(key: K): PresetEntry | undefined;
export function getPreset(): Partial<Preset> | undefined;
export function getPreset(...args: unknown[]) {
	const context = getContext<Partial<Preset> | undefined>(CONTEXT_KEY);
	if (args.length) {
		const key = args[0] as ModuleName;

		return context?.[key];
	}

	return context;
}

export function setPreset(preset: Partial<Preset>) {
	const currentPreset = getPreset() || {};

	return setContext(CONTEXT_KEY, merge(currentPreset, preset));
}
