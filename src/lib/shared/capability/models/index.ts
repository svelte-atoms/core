// The capability models — stateful surfaces and stateless policies registered onto a BondState.
export {
	collectionCapability,
	collectionSlot,
	type CollectionCapability,
	type CollectionProjectionOptions
} from './collection.svelte';
export {
	createSelection,
	selectionCapability,
	SELECTION,
	type SelectionModel,
	type SelectionBacking,
	type SelectionProjectionOptions
} from './selection.svelte';
export { createDisclosure, type Disclosure, type DisclosureBacking } from './disclosure.svelte';
export {
	createRovingFocus,
	rovingCapability,
	ROVING,
	type RovingFocus,
	type RovingBacking,
	type RovingProjectionOptions
} from './roving.svelte';
export { navigationCapability, type NavigationProjectionOptions } from './navigation.svelte';
export {
	createInput,
	inputCapability,
	INPUT,
	type InputModel,
	type InputField,
	type InputProjectionOptions
} from './input.svelte';
export {
	triggerContentLink,
	labelledControl,
	TRIGGER_CONTENT,
	type TriggerContentOptions,
	type LabelledControlOptions
} from './relationship.svelte';
