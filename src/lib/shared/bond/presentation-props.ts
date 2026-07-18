import type { PresetKey } from '../../preset/types';
import { mergeSpreadProps } from './merge';

type PresentableAtom =
	| {
			preset?: string;
			spread?: Record<string | symbol, unknown>;
			bindId?: (source: () => string | undefined) => void;
	  }
	| undefined;

// Native presentation hosts need the Atom merge without tunnelling the preset selector into attrs.
function mergeAtomPresentationProps(
	atom: PresentableAtom,
	restProps: Record<string, unknown>
): Record<string | symbol, unknown> {
	atom?.bindId?.(() => (typeof restProps.id === 'string' ? restProps.id : undefined));
	return mergeSpreadProps(atom?.spread, stripDefaultLayerProps(restProps), {
		source: atom?.preset ? `atom preset "${atom.preset}"` : 'atom spread',
		nextSource: 'component props',
		nextIsUser: true
	});
}

export function mergeAtomProps(
	atom: PresentableAtom,
	preset: unknown,
	restProps: Record<string, unknown>
): Record<string, unknown> & { preset: PresetKey | undefined } {
	return {
		preset: (preset ?? atom?.preset) as PresetKey | undefined,
		...mergeAtomPresentationProps(atom, restProps)
	};
}

export function mergePresetProps(
	preset: unknown,
	defaultPreset: PresetKey,
	restProps: Record<string, unknown>
): Record<string, unknown> & { preset: PresetKey } {
	return {
		preset: (preset ?? defaultPreset) as PresetKey,
		...stripDefaultLayerProps(restProps)
	};
}

// `defaults` is HtmlAtom's internal low-priority layer, never an ordinary DOM prop.
function stripDefaultLayerProps(
	restProps: Record<string, unknown>
): Record<string | symbol, unknown> {
	if (!Object.hasOwn(restProps, 'defaults')) {
		return restProps as Record<string | symbol, unknown>;
	}

	const out: Record<string | symbol, unknown> = {};
	for (const key in restProps) {
		if (!Object.hasOwn(restProps, key) || key === 'defaults') continue;
		out[key] = restProps[key];
	}
	const symbolProps = restProps as Record<string | symbol, unknown>;
	for (const key of Object.getOwnPropertySymbols(restProps)) out[key] = symbolProps[key];
	return out;
}
