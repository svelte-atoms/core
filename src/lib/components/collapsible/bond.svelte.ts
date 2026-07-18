import { Bond, defineAtom } from '$ixirjs/ui/shared/bond';
import { defineBond } from '$ixirjs/ui/shared';
import {
	ariaRole,
	defineAtomCapability,
	sharedCapabilityKey,
	type AtomHost
} from '$ixirjs/ui/shared/capability';
import {
	createDisclosure,
	disclosureCapability,
	disclosureTrigger,
	type Disclosure
} from '$ixirjs/ui/shared/capability/models/disclosure.svelte';
import type { DisclosureStateProps } from '$ixirjs/ui/shared/capability/models/disclosure-state.svelte';
import { triggerContentLink } from '$ixirjs/ui/shared/capability/models/relationship.svelte';
import { isBrowser } from '$ixirjs/ui/utils/dom.svelte';

// -----------------------------------------------------------------------------
// Public types
// -----------------------------------------------------------------------------

export type CollapsibleStateProps = DisclosureStateProps & {
	value?: string;
	data?: unknown;
};

export type CollapsibleDomElements = {
	root: HTMLElement;
	header: HTMLElement;
	body: HTMLElement;
	indicator: HTMLElement;
};

// -----------------------------------------------------------------------------
// Internal types
// -----------------------------------------------------------------------------

type CollapsibleBondView = CollapsibleBondBase;

// -----------------------------------------------------------------------------
// Capability slots and shared helpers
// -----------------------------------------------------------------------------

const COLLAPSIBLE_HEADER = sharedCapabilityKey<void>({
	owner: '@ixirjs/collapsible',
	name: 'header',
	version: 1
});
const COLLAPSIBLE_BODY = sharedCapabilityKey<void>({
	owner: '@ixirjs/collapsible',
	name: 'body',
	version: 1
});

// -----------------------------------------------------------------------------
// Atom definitions
// -----------------------------------------------------------------------------

export const CollapsibleRootAtom = defineAtom<CollapsibleBondView>('root');
export type CollapsibleRootAtom = InstanceType<typeof CollapsibleRootAtom>;

export const CollapsibleHeaderAtom = defineAtom<CollapsibleBondView>('header', (atom) => {
	atom.capability(collapsibleHeaderPresentation());
});
export type CollapsibleHeaderAtom = InstanceType<typeof CollapsibleHeaderAtom>;

export const CollapsibleBodyAtom = defineAtom<CollapsibleBondView>('body', (atom) => {
	atom.capability(collapsibleBodyPresentation());
});
export type CollapsibleBodyAtom = InstanceType<typeof CollapsibleBodyAtom>;

export const CollapsibleIndicatorAtom = defineAtom<CollapsibleBondView>('indicator', (atom) => {
	atom.capability(ariaRole('icon'));
});
export type CollapsibleIndicatorAtom = InstanceType<typeof CollapsibleIndicatorAtom>;

// -----------------------------------------------------------------------------
// Atom capabilities
// -----------------------------------------------------------------------------

function collapsibleHeaderPresentation() {
	return defineAtomCapability<void, AtomHost, CollapsibleBondView>({
		slot: COLLAPSIBLE_HEADER,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['header'],
			docs: 'Collapsible header button semantics and disabled projection.'
		},
		behavior: {
			attrs: (node, bond) => {
				const isDisabled = bond?.isDisabled ?? false;
				const isButton = isBrowser() && node.element instanceof HTMLButtonElement;

				// aria-expanded/aria-controls come from the trigger-content relationship.
				return {
					'aria-disabled': isDisabled ? 'true' : 'false',
					disabled: isButton ? isDisabled : undefined,
					role: isButton ? undefined : 'button',
					tabindex: isButton ? undefined : isDisabled ? -1 : 0
				};
			}
		}
	});
}

function collapsibleBodyPresentation() {
	return defineAtomCapability<void, AtomHost, CollapsibleBondView>({
		slot: COLLAPSIBLE_BODY,
		meta: {
			layer: 1,
			kind: 'projection',
			projects: ['body'],
			docs: 'Collapsible body inert projection while closed.'
		},
		behavior: {
			attrs: (_node, bond) => ({
				// aria-labelledby/role=region come from the trigger-content relationship.
				inert: bond?.isOpen ? undefined : true
			})
		}
	});
}

// Base captures the parent collapsible from context, enabling nesting.

// -----------------------------------------------------------------------------
// Bond implementation
// -----------------------------------------------------------------------------

class CollapsibleBondBase extends Bond<CollapsibleStateProps> {
	#parent: CollapsibleBond | undefined;

	// Open/closed state is backed by props.open.
	readonly disclosure: Disclosure = createDisclosure({
		get: () => this.props.open,
		set: (v) => (this.props.open = v)
	});

	constructor(props: CollapsibleStateProps, name = 'collapsible') {
		super(props, name);
		this.#parent = getOptionalParentCollapsible();
		this.capability(disclosureCapability(this.disclosure));
		this.capability(triggerContentLink({ contentRole: 'region' }));
		this.capability(disclosureTrigger());
	}

	get isOpen(): boolean {
		return this.disclosure.isOpen;
	}

	get isDisabled(): boolean {
		return this.props.disabled ?? false;
	}

	open(): void {
		this.disclosure.open();
	}

	close(): void {
		this.disclosure.close();
	}

	toggle(): void {
		this.disclosure.toggle();
	}

	get parent(): CollapsibleBond | undefined {
		return this.#parent;
	}
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function getOptionalParentCollapsible(): CollapsibleBond | undefined {
	try {
		return CollapsibleBond.get();
	} catch {
		return undefined;
	}
}

// -----------------------------------------------------------------------------
// Bond spec and constructor facade
// -----------------------------------------------------------------------------

const collapsibleSpec = {
	name: 'collapsible',
	base: CollapsibleBondBase,
	atoms: {
		root: CollapsibleRootAtom,
		header: { atom: CollapsibleHeaderAtom, role: 'trigger' },
		body: { atom: CollapsibleBodyAtom, role: 'content' },
		indicator: CollapsibleIndicatorAtom
	}
};

export const CollapsibleBond = defineBond(collapsibleSpec);

export type CollapsibleBond = CollapsibleBondBase;
