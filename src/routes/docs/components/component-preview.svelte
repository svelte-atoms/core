<script lang="ts">
	import type { Component } from 'svelte';
	import AccordionPreview from './previews/accordion.svelte';
	import AlertPreview from './previews/alert.svelte';
	import AvatarPreview from './previews/avatar.svelte';
	import BadgePreview from './previews/badge.svelte';
	import BreadcrumbPreview from './previews/breadcrumb.svelte';
	import ButtonPreview from './previews/button.svelte';
	import CardPreview from './previews/card.svelte';
	import CheckboxPreview from './previews/checkbox.svelte';
	import CollapsiblePreview from './previews/collapsible.svelte';
	import ComboboxPreview from './previews/combobox.svelte';
	import ContextMenuPreview from './previews/context-menu.svelte';
	import DataGridPreview from './previews/datagrid.svelte';
	import DialogPreview from './previews/dialog.svelte';
	import DividerPreview from './previews/divider.svelte';
	import DrawerPreview from './previews/drawer.svelte';
	import DropdownMenuPreview from './previews/dropdown-menu.svelte';
	import FormPreview from './previews/form.svelte';
	import HtmlAtomPreview from './previews/html-atom.svelte';
	import InputPreview from './previews/input.svelte';
	import KbdPreview from './previews/kbd.svelte';
	import LabelPreview from './previews/label.svelte';
	import LinkPreview from './previews/link.svelte';
	import ListPreview from './previews/list.svelte';
	import PopoverPreview from './previews/popover.svelte';
	import ProgressPreview from './previews/progress.svelte';
	import RadioPreview from './previews/radio.svelte';
	import ScrollablePreview from './previews/scrollable.svelte';
	import SelectPreview from './previews/select.svelte';
	import SidebarPreview from './previews/sidebar.svelte';
	import SliderPreview from './previews/slider.svelte';
	import StackPreview from './previews/stack.svelte';
	import StepperPreview from './previews/stepper.svelte';
	import SwatchPreview from './previews/swatch.svelte';
	import TabsPreview from './previews/tabs.svelte';
	import TextareaPreview from './previews/textarea.svelte';
	import ToastPreview from './previews/toast.svelte';
	import TooltipPreview from './previews/tooltip.svelte';
	import TreePreview from './previews/tree.svelte';

	const previews: Record<string, Component> = {
		Accordion: AccordionPreview,
		Alert: AlertPreview,
		Avatar: AvatarPreview,
		Badge: BadgePreview,
		Breadcrumb: BreadcrumbPreview,
		Button: ButtonPreview,
		Card: CardPreview,
		Checkbox: CheckboxPreview,
		Collapsible: CollapsiblePreview,
		Combobox: ComboboxPreview,
		'Context Menu': ContextMenuPreview,
		DataGrid: DataGridPreview,
		Dialog: DialogPreview,
		Divider: DividerPreview,
		Drawer: DrawerPreview,
		'Dropdown Menu': DropdownMenuPreview,
		Form: FormPreview,
		HtmlAtom: HtmlAtomPreview,
		Input: InputPreview,
		Kbd: KbdPreview,
		Label: LabelPreview,
		Link: LinkPreview,
		List: ListPreview,
		Popover: PopoverPreview,
		Progress: ProgressPreview,
		Radio: RadioPreview,
		Scrollable: ScrollablePreview,
		Select: SelectPreview,
		Sidebar: SidebarPreview,
		Slider: SliderPreview,
		Stack: StackPreview,
		Stepper: StepperPreview,
		Swatch: SwatchPreview,
		Tabs: TabsPreview,
		Textarea: TextareaPreview,
		Toast: ToastPreview,
		Tooltip: TooltipPreview,
		Tree: TreePreview
	};

	let { name }: { name: string } = $props();

	const Preview = $derived(previews[name]);
</script>

{#if Preview}
	<Preview />
{/if}
