import {
	defineFocusedCapability,
	sharedCapabilityKey,
	type Capability,
	type CapabilityMetadata,
	type CapabilityKey
} from '../capability';
import {
	collectionCapability,
	type CollectionCapability,
	type CollectionProjectionOptions
} from './collection.svelte';
import {
	selectionCapability,
	type SelectionModel,
	type SelectionProjectionOptions
} from './selection.svelte';
import { rovingCapability, type RovingFocus, type RovingProjectionOptions } from './roving.svelte';
import { navigationCapability, type NavigationProjectionOptions } from './navigation.svelte';
import { inputCapability, type InputModel, type InputProjectionOptions } from './input.svelte';
import { typeaheadCapability, type TypeaheadOptions } from './typeahead.svelte';
import {
	labelledControl,
	errorMessageLink,
	type ErrorMessageLinkOptions,
	type LabelledControlOptions
} from './relationship.svelte';
import {
	createStatus,
	statusCapability,
	type StatusModel,
	type StatusProjectionOptions
} from './status.svelte';
import {
	validationCapability,
	type ValidationModel,
	type ValidationProjectionOptions
} from './validation.svelte';

export type CapabilityBundle = readonly Capability[] & {
	readonly meta: CapabilityMetadata & { readonly layer: 2; readonly kind: 'focused' };
};

export const SELECTABLE_COLLECTION = sharedCapabilityKey<readonly Capability[]>({
	owner: '@ixirjs/cap',
	name: 'focused:selectable-collection',
	version: 1
});
export const NAVIGABLE_COLLECTION = sharedCapabilityKey<readonly Capability[]>({
	owner: '@ixirjs/cap',
	name: 'focused:navigable-collection',
	version: 1
});
export const TYPEAHEAD_COLLECTION = sharedCapabilityKey<readonly Capability[]>({
	owner: '@ixirjs/cap',
	name: 'focused:typeahead-collection',
	version: 1
});
export const LABELLED_FIELD = sharedCapabilityKey<readonly Capability[]>({
	owner: '@ixirjs/cap',
	name: 'focused:labelled-field',
	version: 1
});
export const VALIDATED_CONTROL = sharedCapabilityKey<readonly Capability[]>({
	owner: '@ixirjs/cap',
	name: 'focused:validated-control',
	version: 1
});

interface CollectionSource<T> {
	kind?: string;
	collection?: CollectionCapability<T>;
	collectionOptions?: CollectionProjectionOptions | undefined;
}

export interface SelectableCollectionCapabilityOptions<T> extends CollectionSource<T> {
	selection: SelectionModel<T>;
	selectionOptions?: SelectionProjectionOptions<T> | undefined;
}

export interface NavigableCollectionCapabilityOptions<T = unknown> extends CollectionSource<T> {
	roving: RovingFocus<T>;
	rovingOptions?: RovingProjectionOptions | undefined;
	navigation?: NavigationProjectionOptions | undefined;
}

// This bundle provides buffered keyboard search; it does not derive or render a filtered collection view.
// Use `filterSelectData` (select/runes.svelte.ts) when the rendered collection must be filtered.
export interface TypeaheadCollectionCapabilityOptions<T = unknown> extends CollectionSource<T> {
	input: InputModel;
	roving: RovingFocus<T>;
	rovingOptions?: RovingProjectionOptions | undefined;
	inputOptions?: InputProjectionOptions | undefined;
	typeahead?: TypeaheadOptions<T> | undefined;
}

export interface LabelledFieldCapabilityOptions {
	labelled?: LabelledControlOptions | undefined;
	status?: StatusModel | undefined;
	statusOptions?: StatusProjectionOptions | undefined;
}

export interface ValidatedControlCapabilityOptions<T = unknown> {
	validation: ValidationModel<T>;
	validationOptions?: ValidationProjectionOptions | undefined;
	error?: ErrorMessageLinkOptions | undefined;
	status?: StatusModel | false | undefined;
	statusOptions?: StatusProjectionOptions | undefined;
}

export function selectableCollectionCapability<T>(
	options: SelectableCollectionCapabilityOptions<T>
): CapabilityBundle {
	const collection = resolveCollection(options);
	return bundleCapabilities(
		SELECTABLE_COLLECTION,
		[collection, selectionCapability(options.selection, options.selectionOptions)],
		{
			projects: ['container', 'item'],
			docs: 'Layer 2 bundle for collection registration plus selected item projection.'
		}
	);
}

export function navigableCollectionCapability<T = unknown>(
	options: NavigableCollectionCapabilityOptions<T>
): CapabilityBundle {
	const collection = resolveCollection(options);
	return bundleCapabilities(
		NAVIGABLE_COLLECTION,
		[
			collection,
			rovingCapability(options.roving, options.rovingOptions),
			navigationCapability(options.roving, options.navigation)
		],
		{
			projects: ['container', 'item'],
			docs: 'Layer 2 bundle for collection-backed roving focus and keyboard navigation.'
		}
	);
}

export function typeaheadCollectionCapability<T = unknown>(
	options: TypeaheadCollectionCapabilityOptions<T>
): CapabilityBundle {
	const collection = resolveCollection(options);
	return bundleCapabilities(
		TYPEAHEAD_COLLECTION,
		[
			collection,
			rovingCapability(options.roving, options.rovingOptions),
			inputCapability(options.input, options.inputOptions),
			typeaheadCapability(collection.surface, options.roving, options.typeahead)
		],
		{
			projects: ['container', 'item', 'input'],
			docs: 'Layer 2 bundle for combobox input projection and buffered collection typeahead.'
		}
	);
}

export function labelledFieldCapability(
	options: LabelledFieldCapabilityOptions = {}
): CapabilityBundle {
	const capabilities: Capability[] = [labelledControl(options.labelled)];
	if (options.status) {
		capabilities.push(statusCapability(options.status, options.statusOptions));
	}
	return bundleCapabilities(LABELLED_FIELD, capabilities, {
		projects: ['label', 'description', 'control'],
		docs: 'Layer 2 bundle for labelled controls with optional scoped status projection.'
	});
}

export function validatedControlCapability<T = unknown>(
	options: ValidatedControlCapabilityOptions<T>
): CapabilityBundle {
	const status =
		options.status === false
			? undefined
			: (options.status ??
				createStatus({
					invalid: () => options.validation.isInvalid,
					busy: () => options.validation.isValidating
				}));
	const capabilities: Capability[] = [
		validationCapability(options.validation, options.validationOptions),
		errorMessageLink({
			invalid: () => options.validation.isInvalid,
			...options.error
		})
	];
	if (status) {
		capabilities.push(statusCapability(status, options.statusOptions));
	}
	return bundleCapabilities(VALIDATED_CONTROL, capabilities, {
		projects: ['control', 'error'],
		docs: 'Layer 2 bundle for validation state, error-message linkage, and validation status.'
	});
}

function resolveCollection<T>(options: CollectionSource<T>): CollectionCapability<T> {
	if (options.collection) return options.collection;
	if (!options.kind) {
		throw new Error(
			'[ixirjs] bundle collection capability requires either `kind` or `collection`.'
		);
	}
	return collectionCapability<T>(options.kind, options.collectionOptions);
}

function bundleCapabilities(
	slot: CapabilityKey<readonly Capability[]>,
	capabilities: readonly Capability[],
	meta: Omit<CapabilityMetadata, 'layer' | 'kind'>
): CapabilityBundle {
	const marker = defineFocusedCapability({ slot, capabilities, meta });
	const members = marker.surface!;
	return Object.assign([marker, ...members], {
		meta: marker.meta as CapabilityMetadata & { readonly layer: 2; readonly kind: 'focused' }
	}) as CapabilityBundle;
}
