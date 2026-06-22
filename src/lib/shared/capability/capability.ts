import type { Bond } from '../bond/bond.svelte';
import type { BondVirtualElement } from '../bond/types';

// attrs merge (last wins), handlers chain — folded into spread by BondAtom.role().
export interface Behavior<
	B extends Bond = Bond,
	E extends Element | BondVirtualElement = Element | BondVirtualElement
> {
	attrs?(bond: B): Record<string, unknown>;
	handlers?(bond: B): Record<string, unknown>;
	onmount?(node: E, bond: B): void | (() => void);
}

// Phantom type makes the key the registry: capability(key) returns Capability<Surface> without a cast.
declare const SURFACE: unique symbol;
export type CapabilityKey<Surface = unknown> = symbol & { readonly [SURFACE]?: Surface };

export type SurfaceOf<K> = K extends CapabilityKey<infer S> ? S : unknown;

// Unexported keys are unforgeable — the private seam.
export function capabilityKey<Surface = unknown>(description: string): CapabilityKey<Surface> {
	return Symbol(description) as CapabilityKey<Surface>;
}

// Symbol.for survives duplicate library copies and HMR; forgeable by description — the public projection seam.
// Namespace descriptions to avoid global registry collisions.
export function sharedCapabilityKey<Surface = unknown>(
	description: string
): CapabilityKey<Surface> {
	return Symbol.for(description) as CapabilityKey<Surface>;
}

// symbols don't stringify in templates or console output.
export function slotName(slot: symbol): string {
	return slot.description ?? slot.toString();
}

// item/input carry a string ctx; structural roles carry none. Custom roles fall through to optional unknown.
export interface RoleContexts {
	item: string;
	input: string;
	container: void;
	content: void;
	surface: void;
	trigger: void;
	label: void;
	description: void;
	control: void;
}
export type KnownRole = keyof RoleContexts & string;
// Drives .role() enforcement: void → no arg, ctx-bearing → required arg, custom → optional unknown.
export type RoleCtxArgs<R extends string> = R extends KnownRole
	? RoleContexts[R] extends void
		? [ctx?: undefined]
		: [ctx: RoleContexts[R]]
	: [ctx?: unknown];

// Dual of the atom: slot = identity key, surface = stateful model, behavior() projects by role.
export interface Capability<Surface = unknown> {
	// CapabilityKey phantom drives typed retrieval via bond.capability(key) — not through this field.
	readonly slot: symbol;
	// Present on stateful models (Disclosure, SelectionModel…); omitted on stateless policies.
	readonly surface?: Surface;
	// DEV validates these slots are registered before this capability projects.
	readonly requires?: readonly symbol[];
	behavior?(role: string, ctx?: unknown): Behavior | undefined;
	// Whole-bond effect run via useCapabilities(); home for document listeners and focus/escape plumbing.
	setup?(bond: Bond): Disposable | (() => void) | void;
	// When a slot is already held, the registry calls compose(prior) instead of replacing — wrap/delegate rather than rewrite. Built by decorateCapability().
	compose?(prior: Capability<Surface>): Capability<Surface>;
}

// void roles → no ctx; ctx-bearing → typed; custom → unknown. Drives defineCapability's typed dispatch.
export type RoleCtx<R extends string> = R extends KnownRole
	? RoleContexts[R] extends void
		? void
		: RoleContexts[R]
	: unknown;

// Typed role → projection map. ctx is typed per role; no `ctx as T` casts.
export type CapabilityRoleMap = {
	[R in KnownRole]?: (ctx: RoleCtx<R>) => Behavior | undefined;
} & {
	// Custom roles: ctx is unknown. `never` param keeps these assignable alongside the typed known keys.
	[role: string]: (ctx: never) => Behavior | undefined;
};

// Use roles: (typed map, preferred) or behavior: (raw escape hatch for dynamic role sets).
export interface CapabilityConfig<Surface = unknown> {
	slot: symbol;
	surface?: Surface;
	requires?: readonly symbol[];
	setup?(bond: Bond): Disposable | (() => void) | void;
	compose?(prior: Capability<Surface>): Capability<Surface>;
	// Preferred: typed role → projection map.
	roles?: CapabilityRoleMap;
	// Escape hatch: raw projection, for capabilities whose handled roles are computed at runtime.
	behavior?(role: string, ctx?: unknown): Behavior | undefined;
}

// Canonical authoring entry point. Folds roles/behavior into the Capability the registry projects.
export function defineCapability<Surface = unknown>(
	config: CapabilityConfig<Surface>
): Capability<Surface> {
	const { slot, surface, requires, setup, compose, roles, behavior } = config;
	const project =
		behavior ?? (roles ? (role: string, ctx?: unknown) => roles[role]?.(ctx as never) : undefined);
	return {
		slot,
		...(surface !== undefined ? { surface } : {}),
		...(requires ? { requires } : {}),
		...(setup ? { setup } : {}),
		...(compose ? { compose } : {}),
		...(project ? { behavior: project } : {})
	} as Capability<Surface>;
}

export interface CapabilityInfo {
	slot: symbol;
	// The slot key's description, for human-readable display (symbols don't stringify in templates).
	description: string | undefined;
	hasSurface: boolean;
	requires: readonly symbol[];
	hasSetup: boolean;
}

// Per-role projection snapshot from one capability; produced by Bond.explainRole().
export interface RoleProjectionInfo {
	slot: symbol;
	description: string | undefined;
	attrs?: Record<string, unknown>;
	handlers?: Record<string, unknown>;
	hasOnmount: boolean;
}

// Facets to override when decorating a slot. Omit a field to delegate it to the prior holder.
export interface CapabilityDecoration<S> {
	// base is the prior holder's Behavior for this role, undefined if it doesn't handle it.
	behavior?(role: string, ctx: unknown, base: Behavior | undefined): Behavior | undefined;
	surface?(base: S | undefined): S;
	setup?(base: Capability<S>['setup']): Capability<S>['setup'];
}

// Wrap a slot's current holder, delegating unmodified facets — register AFTER the base or compose fires on nothing.
export function decorateCapability<S>(
	slot: CapabilityKey<S>,
	decoration: CapabilityDecoration<S>
): Capability<S> {
	return {
		slot,
		compose(prior) {
			const surface = decoration.surface ? decoration.surface(prior.surface) : prior.surface;
			const setup = decoration.setup ? decoration.setup(prior.setup) : prior.setup;
			return {
				slot,
				behavior: (role, ctx) => {
					const base = prior.behavior?.(role, ctx);
					return decoration.behavior ? decoration.behavior(role, ctx, base) : base;
				},
				// Conditional spreads: under exactOptionalPropertyTypes, absent key != explicit undefined.
				...(surface !== undefined ? { surface } : {}),
				...(prior.requires ? { requires: prior.requires } : {}),
				...(setup ? { setup } : {})
			};
		}
	};
}
