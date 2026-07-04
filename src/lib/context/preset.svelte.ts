import { getContext, setContext } from 'svelte';
import type { ClassValue } from 'svelte/elements';
import { mergePresetRecords, resolvePreset } from '$svelte-atoms/core/components/atom/utils/preset';
import type { Base } from '$svelte-atoms/core/components/atom';
import type { Bond } from '../shared';
import type { Attachment } from 'svelte/attachments';

const CONTEXT_KEY = '@svelte-atoms/context/preset';

export interface PresetEntryRecord {
	[key: string]: unknown;
	class?: ClassValue;
	as?: string;
	base?: Base;
	variants?: Record<string, Record<string, unknown>>;
	compounds?: Array<Record<string, unknown>>;
	defaults?: Record<string, unknown>;
	attachments?: Attachment[];
}

// A single preset entry value — either a record or a deferred factory returning one.
export type PresetEntryValue = PresetEntryRecord | (() => PresetEntryRecord);

// A preset entry — invoked with a bond, returns a PresetEntryValue or array.
// Arrays are merged in order (later entries win), enabling layered overrides.
export type PresetEntry = (
	bond: Bond | undefined | null,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- public extension point: forwarded args are opaque
	...args: any[]
) => PresetEntryValue | Array<PresetEntryValue>;

// Registry of preset slot names → PresetEntry. Extend via module augmentation to add custom slots with full autocomplete.
export interface PresetModuleMap {
	accordion: PresetEntry;
	'accordion.item.body': PresetEntry;
	'accordion.item.header': PresetEntry;
	'accordion.item.indicator': PresetEntry;
	'accordion.item': PresetEntry;
	'alert.actions': PresetEntry;
	'alert.close': PresetEntry;
	/** @deprecated Use `alert.close`. */
	'alert.close-button': PresetEntry;
	'alert.content': PresetEntry;
	'alert.description': PresetEntry;
	'alert.icon': PresetEntry;
	alert: PresetEntry;
	'alert.title': PresetEntry;
	'card.content': PresetEntry;
	'card.description': PresetEntry;
	'card.footer': PresetEntry;
	'card.header': PresetEntry;
	'card.body': PresetEntry;
	'card.media': PresetEntry;
	card: PresetEntry;
	'card.subtitle': PresetEntry;
	'card.title': PresetEntry;
	'collapsible.body': PresetEntry;
	'collapsible.header': PresetEntry;
	'collapsible.indicator': PresetEntry;
	collapsible: PresetEntry;
	'combobox.control': PresetEntry;
	'combobox.trigger': PresetEntry;
	'combobox.item': PresetEntry;
	'combobox.content': PresetEntry;
	'select.content': PresetEntry;
	'select.item': PresetEntry;
	'select.trigger': PresetEntry;
	'dropdown-menu.content': PresetEntry;
	'dropdown-menu.item': PresetEntry;
	'context-menu.content': PresetEntry;
	'context-menu.item': PresetEntry;
	'dialog.close': PresetEntry;
	/** @deprecated Use `dialog.close`. */
	'dialog.close-button': PresetEntry;
	'dialog.body': PresetEntry;
	'dialog.content': PresetEntry;
	'dialog.description': PresetEntry;
	'dialog.footer': PresetEntry;
	'dialog.header': PresetEntry;
	dialog: PresetEntry;
	'dialog.title': PresetEntry;
	divider: PresetEntry;
	'dropdown.placeholder': PresetEntry;
	'dropdown.query': PresetEntry;
	'dropdown.trigger': PresetEntry;
	'dropdown.selections': PresetEntry;
	'dropdown.selection': PresetEntry;
	dropdown: PresetEntry;
	'dropdown.item': PresetEntry;
	'field.control': PresetEntry;
	'field.label': PresetEntry;
	'field.helper-text': PresetEntry;
	field: PresetEntry;
	form: PresetEntry;
	icon: PresetEntry;
	input: PresetEntry;
	'input.control': PresetEntry;
	'input.icon': PresetEntry;
	'input.placeholder': PresetEntry;
	'input.text': PresetEntry;
	'input.password': PresetEntry;
	'input.email': PresetEntry;
	'input.url': PresetEntry;
	'input.number': PresetEntry;
	'input.file': PresetEntry;
	'input.phone': PresetEntry;
	'input.currency': PresetEntry;
	'input.location': PresetEntry;
	'input.otp': PresetEntry;
	'input.color': PresetEntry;
	'input.time': PresetEntry;
	'input.date': PresetEntry;
	'input.datetime': PresetEntry;
	label: PresetEntry;
	'layer.inner': PresetEntry;
	layer: PresetEntry;
	link: PresetEntry;
	'list.divider': PresetEntry;
	'list.group': PresetEntry;
	'list.item': PresetEntry;
	'menu.content': PresetEntry;
	'menu.list': PresetEntry;
	'popover-dialog.body': PresetEntry;
	'popover-dialog.close': PresetEntry;
	'popover-dialog.content': PresetEntry;
	'popover-dialog.description': PresetEntry;
	'popover-dialog.footer': PresetEntry;
	'popover-dialog.header': PresetEntry;
	'popover-dialog.title': PresetEntry;
	'popover-dialog.trigger': PresetEntry;
	'popover-dialog': PresetEntry;
	'popover.tail': PresetEntry;
	'popover.indicator': PresetEntry;
	'popover.content': PresetEntry;
	'popover.trigger': PresetEntry;
	'portal.inner': PresetEntry;
	portal: PresetEntry;
	root: PresetEntry;
	'root.portals': PresetEntry;
	'sidebar.content': PresetEntry;
	sidebar: PresetEntry;
	'drawer.backdrop': PresetEntry;
	'drawer.body': PresetEntry;
	'drawer.content': PresetEntry;
	'drawer.description': PresetEntry;
	'drawer.title': PresetEntry;
	'drawer.footer': PresetEntry;
	'drawer.header': PresetEntry;
	drawer: PresetEntry;
	'stack.root': PresetEntry;
	'stack.item': PresetEntry;
	stepper: PresetEntry;
	'stepper.header': PresetEntry;
	'stepper.body': PresetEntry;
	'stepper.footer': PresetEntry;
	'stepper.step': PresetEntry;
	'stepper.step.indicator': PresetEntry;
	'stepper.step.header': PresetEntry;
	'stepper.step.body': PresetEntry;
	'stepper.step.separator': PresetEntry;
	'tabs.body': PresetEntry;
	'tabs.header': PresetEntry;
	tabs: PresetEntry;
	'tab.header': PresetEntry;
	'tab.body': PresetEntry;
	'tab.description': PresetEntry;
	tab: PresetEntry;
	'tree.body': PresetEntry;
	'tree.header': PresetEntry;
	'tree.indicator': PresetEntry;
	tree: PresetEntry;
	datagrid: PresetEntry;
	'datagrid.header': PresetEntry;
	'datagrid.column': PresetEntry;
	'datagrid.body': PresetEntry;
	'datagrid.row': PresetEntry;
	'datagrid.cell': PresetEntry;
	'datagrid.footer': PresetEntry;
	'datagrid.checkbox': PresetEntry;
	'datagrid.sort-icon': PresetEntry;
	scrollable: PresetEntry;
	'scrollable.container': PresetEntry;
	'scrollable.content': PresetEntry;
	'scrollable.track': PresetEntry;
	'scrollable.thumb': PresetEntry;
	toast: PresetEntry;
	'toast.title': PresetEntry;
	'toast.description': PresetEntry;
	'toast.close': PresetEntry;
	'tooltip.trigger': PresetEntry;
	'tooltip.content': PresetEntry;
	'tooltip.tail': PresetEntry;
	breadcrumb: PresetEntry;
	'breadcrumb.item': PresetEntry;
	'breadcrumb.separator': PresetEntry;
	badge: PresetEntry;
	chip: PresetEntry;
	'chip.close': PresetEntry;
	/** @deprecated Use `chip.close`. */
	'chip.close-button': PresetEntry;
	button: PresetEntry;
	checkbox: PresetEntry;
	'checkbox.checkmark': PresetEntry;
	'checkbox.indeterminate': PresetEntry;
	radio: PresetEntry;
	'radio.group': PresetEntry;
	container: PresetEntry;
	calendar: PresetEntry;
	'calendar.day': PresetEntry;
	'calendar.header': PresetEntry;
	'calendar.weekday': PresetEntry;
	'calendar.body': PresetEntry;
	'datepicker.trigger': PresetEntry;
	'datepicker.calendar': PresetEntry;
	'datepicker.years': PresetEntry;
	'datepicker.months': PresetEntry;
	'datepicker.header': PresetEntry;
	progress: PresetEntry;
	'progress.linear': PresetEntry;
	'progress.linear.track': PresetEntry;
	'progress.linear.fill': PresetEntry;
	'progress.circular': PresetEntry;
	'progress.circular.track': PresetEntry;
	'progress.circular.fill': PresetEntry;
}

// All valid preset slot names — derived from PresetModuleMap for extensibility.
export type PresetModuleName = keyof PresetModuleMap;

// A preset key accepted by atoms — a single slot name or an ordered fallback chain (first-registered-wins).
export type PresetKey = PresetModuleName | (string & {}) | (PresetModuleName | (string & {}))[];

export type Preset = { [K in PresetModuleName]: PresetModuleMap[K] };

const LEGACY_PRESET_KEYS: Record<string, PresetModuleName> = {
	'alert.close-button': 'alert.close',
	'dialog.close-button': 'dialog.close',
	'chip.close-button': 'chip.close'
};

const PRESET_ALIASES: Record<string, readonly PresetModuleName[]> = {
	'alert.close': ['alert.close-button'],
	'dialog.close': ['dialog.close-button'],
	'chip.close': ['chip.close-button']
};

export function getPreset<K extends PresetModuleName>(key: K): PresetEntry | undefined;
export function getPreset(): Partial<Preset> | undefined;
export function getPreset(...args: unknown[]) {
	const context = getContext<Partial<Preset> | undefined>(CONTEXT_KEY);
	if (args.length) {
		const key = args[0] as PresetModuleName;
		return presetEntry(context, key);
	}
	return context;
}

function presetEntry(
	context: Partial<Preset> | undefined,
	key: PresetModuleName
): PresetEntry | undefined {
	const canonicalKey = canonicalPresetKey(key);
	const direct = context?.[canonicalKey];
	if (direct) return direct;
	for (const alias of PRESET_ALIASES[canonicalKey] ?? []) {
		const entry = context?.[alias];
		if (entry) return entry;
	}
	return undefined;
}

function canonicalPresetKey(key: PresetModuleName): PresetModuleName {
	return LEGACY_PRESET_KEYS[key] ?? key;
}

function mergePresetEntries(existing: PresetEntry, next: PresetEntry): PresetEntry {
	return ((bond, ...args) => {
		const a = resolvePreset(existing(bond, ...args));
		const b = resolvePreset(next(bond, ...args));
		if (a && b) return mergePresetRecords([a, b]);
		return a ?? b;
	}) as PresetEntry;
}

export function setPreset(preset: Partial<Preset>) {
	return mergePreset(() => preset);
}

export function mergePreset(
	callback: (currentPreset: Partial<Preset> | undefined) => Partial<Preset>
) {
	const currentPreset = getPreset();
	const override = callback(currentPreset);
	const result: Partial<Preset> = { ...currentPreset };

	const keys = Object.keys(override) as PresetModuleName[];
	for (const rawKey of keys) {
		const next = override[rawKey];
		if (!next) continue;

		const key = canonicalPresetKey(rawKey);
		const existing = presetEntry(result, key);
		result[key] = existing ? mergePresetEntries(existing, next) : next;
		for (const alias of PRESET_ALIASES[key] ?? []) delete result[alias];
	}

	return setContext(CONTEXT_KEY, result);
}
