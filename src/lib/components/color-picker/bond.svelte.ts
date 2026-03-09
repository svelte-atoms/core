import {
	PopoverBond,
	PopoverState,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';

// ── Helpers ────────────────────────────────────────────────────────────────

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h = 0, s = 0;
	const l = (max + min) / 2;
	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
			case g: h = ((b - r) / d + 2) / 6; break;
			case b: h = ((r - g) / d + 4) / 6; break;
		}
	}
	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number): string {
	s /= 100; l /= 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	const toHex = (v: number) => Math.round(v * 255).toString(16).padStart(2, '0');
	return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}

export function isValidHex(hex: string): boolean {
	return /^#[0-9A-Fa-f]{6}$/.test(hex);
}

// ── Bond ───────────────────────────────────────────────────────────────────

export type ColorPickerBondProps = PopoverStateProps & {
	value?: string;
	swatches?: string[];
	readonly rest?: Record<string, unknown>;
};

export type ColorPickerDomElements = PopoverDomElements & {
	trigger: HTMLElement;
	content: HTMLElement;
};

export class ColorPickerBond<
	Props extends ColorPickerBondProps = ColorPickerBondProps,
	State extends ColorPickerBondState<Props> = ColorPickerBondState<Props>
> extends PopoverBond<Props, State, ColorPickerDomElements> {
	static override CONTEXT_KEY = '@svelte-atoms/bonds/color-picker';

	constructor(state: State) {
		super(state);
	}

	override trigger() {
		return {
			...super.trigger(),
			'aria-label': 'Color picker',
			'aria-haspopup': 'dialog' as const,
			'aria-expanded': this.state.props.open ?? false,
			[createAttachmentKey()]: (node: HTMLElement) => {
				this.elements.trigger = node;
			}
		};
	}

	override content() {
		return {
			...super.content(),
			role: 'dialog' as const,
			'aria-label': 'Pick a color'
		};
	}

	override share(): this {
		return ColorPickerBond.set(this) as this;
	}

	static override get(): ColorPickerBond {
		return getContext(this.CONTEXT_KEY);
	}

	static override set(bond: ColorPickerBond): ColorPickerBond {
		return setContext(this.CONTEXT_KEY, bond);
	}
}

export class ColorPickerBondState<
	Props extends ColorPickerBondProps = ColorPickerBondProps
> extends PopoverState<Props> {
	#hsl = $state({ h: 0, s: 0, l: 0 });

	constructor(props: () => Props) {
		super(props);
		// Sync HSL from initial value
		const initial = props().value;
		if (initial && isValidHex(initial)) {
			this.#hsl = hexToHsl(initial);
		}
	}

	get value(): string {
		return this.props.value ?? '#000000';
	}

	get hsl() {
		return this.#hsl;
	}

	get swatches(): string[] {
		return this.props.swatches ?? [];
	}

	setHex(hex: string) {
		if (!isValidHex(hex)) return;
		this.props.value = hex;
		this.#hsl = hexToHsl(hex);
	}

	setHsl(h: number, s: number, l: number) {
		this.#hsl = { h, s, l };
		this.props.value = hslToHex(h, s, l);
	}

	setH(h: number) { this.setHsl(h, this.#hsl.s, this.#hsl.l); }
	setS(s: number) { this.setHsl(this.#hsl.h, s, this.#hsl.l); }
	setL(l: number) { this.setHsl(this.#hsl.h, this.#hsl.s, l); }
}
