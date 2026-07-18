// Stable factory-based authoring interface. Concrete runtime and protocol plumbing are experimental.
export { bindBond } from '../shared/bond/bind.svelte';
export { createAtomInstance } from '../shared/bond/use-atom.svelte';
export type { BondHandle, AtomHandle } from '../shared/bond/types';
export type {
	AtomCapabilityEntry,
	CreateAtomInstanceOptions
} from '../shared/bond/use-atom.svelte';

export { defineBond } from '../shared/authoring/define.svelte';
export { fuse } from '../shared/authoring/fuse.svelte';
export { usePart } from '../shared/authoring/use-part.svelte';
export type { UsedPart, UsePartOptions } from '../shared/authoring/use-part.svelte';
export type { BondOf, PropsOf } from '../shared/authoring/define.svelte';

export {
	capabilityKey,
	sharedCapabilityKey,
	defineBondCapability,
	defineAtomCapability,
	roles,
	customRole
} from '../shared/capability/capability';
export type {
	AtomCapability,
	AtomCapabilityConfig,
	BondCapability,
	BondCapabilityConfig,
	CapabilityKey,
	CapabilitySetupResult,
	Role,
	SurfaceOf
} from '../shared/capability/capability';

export {
	createDisclosure,
	disclosureCapability,
	disclosureTrigger,
	disclosureClose,
	disclosureToggle,
	DISCLOSURE
} from '../shared/capability/models/disclosure.svelte';
export type {
	Disclosure,
	DisclosureBacking,
	DisclosureActivationOptions
} from '../shared/capability/models/disclosure.svelte';
export {
	collectionCapability,
	collectionSlot
} from '../shared/capability/models/collection.svelte';
export type {
	CollectionCapability,
	CollectionProjectionOptions
} from '../shared/capability/models/collection.svelte';
export {
	createSelection,
	selectionCapability,
	SELECTION
} from '../shared/capability/models/selection.svelte';
export type {
	SelectionBacking,
	SelectionModel,
	SelectionProjectionOptions
} from '../shared/capability/models/selection.svelte';
export {
	createRovingFocus,
	rovingCapability,
	ROVING
} from '../shared/capability/models/roving.svelte';
export type {
	RovingBacking,
	RovingFocus,
	RovingProjectionOptions
} from '../shared/capability/models/roving.svelte';
export {
	triggerContentLink,
	labelledControl,
	tabPanelLink,
	errorMessageLink
} from '../shared/capability/models/relationship.svelte';
export {
	elementRef,
	pressable,
	focusable,
	dataState,
	ariaRole,
	motion
} from '../shared/capability/models/atom.svelte';
export type {
	AtomElement,
	AtomTeardown,
	AtomValue,
	ElementRefCallback,
	ElementRefOptions,
	PressableOptions,
	FocusableOptions,
	DataStateOptions,
	MotionOptions
} from '../shared/capability/models/atom.svelte';
