import { getContext, setContext } from 'svelte';
import type { ClassValue } from 'svelte/elements';
import { merge } from 'es-toolkit';
import type { Base } from '$svelte-atoms/core/components/atom';
import type { Bond } from '../shared';

const CONTEXT_KEY = '@svelte-atoms/context/preset';

export type PresetModuleName =
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
	| 'combobox.control'
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
	| 'input'
	| 'input.control'
	| 'input.placeholder'
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
	| 'stack.root'
	| 'stack.item'
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
	| 'container'
	| 'calendar'
	| 'calendar.day'
	| 'calendar.header'
	| 'calendar.weekday'
	| 'calendar.body'
	| 'datepicker.trigger'
	| 'datepicker.calendar'
	| 'datepicker.years'
	| 'datepicker.months'
	| 'datepicker.header';

export type PresetEntryRecord = {
	[key: string]: unknown;
	class?: ClassValue;
	as?: string;
	base?: Base;
	variants?: Record<string, Record<string, any>>;
	compounds?: Array<Record<string, any>>;
	defaults?: Record<string, any>;
};

export type PresetEntry = (bond: Bond | undefined | null, ...args: any[]) => PresetEntryRecord;

export type Preset = Record<PresetModuleName, PresetEntry>;

export function getPreset<K extends PresetModuleName>(key: K): PresetEntry | undefined;
export function getPreset(): Partial<Preset> | undefined;
export function getPreset(...args: unknown[]) {
	const context = getContext<Partial<Preset> | undefined>(CONTEXT_KEY);
	if (args.length) {
		const key = args[0] as PresetModuleName;

		return context?.[key];
	}

	return context;
}

export function setPreset(preset: Partial<Preset>) {
	const currentPreset = getPreset() || {};

	return setContext(CONTEXT_KEY, merge(currentPreset, preset));
}
