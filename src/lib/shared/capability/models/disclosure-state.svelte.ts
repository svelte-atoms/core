import type { BondStateProps } from '../../bond/types';

/** Shared props for disclosure-backed component Bonds. */
export type DisclosureStateProps = BondStateProps & {
	open: boolean;
	disabled: boolean;
	readonly rest?: Record<string, unknown>;
};
