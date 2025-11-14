<script lang="ts">
	import { Content } from '../popover/atoms';
	import { Root } from '../calendar/atoms';
	import { DatePickerBond } from './bond.svelte';

	const datePickerBond = DatePickerBond.get();
	const datePickerBondProps = $derived(datePickerBond?.state.props);

	let {
		class: klass = '',
		preset = 'datepicker.calendar',
		children: datePickerChildren,
		...restProps
	} = $props();

	const calendarProps = $derived({
		...datePickerBond?.content(),
		...datePickerBondProps,
		...restProps
	});

	function handleChange(ev: CustomEvent, { range, pivote }) {
		if (!datePickerBond) return;

		datePickerBond.state.props.range = range;
		datePickerBond.state.props.pivote = pivote;
	}
</script>

<Content
	class={['relative overflow-hidden p-0', klass]}
	base={Root}
	onchange={handleChange}
	{preset}
	{...calendarProps}
>
	{#snippet children({ calendar })}
		{@render datePickerChildren?.({
			datePicker: datePickerBond
		})}
	{/snippet}
</Content>
