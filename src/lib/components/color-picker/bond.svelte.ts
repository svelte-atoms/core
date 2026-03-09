import {
	PopoverBond,
	PopoverState,
	type PopoverDomElements,
	type PopoverStateProps
} from '$svelte-atoms/core/components/popover/bond.svelte';
import { getContext, setContext } from 'svelte';
import { createAttachmentKey } from 'svelte/attachments';

// ── Types ──────────────────────────────────────────────────────────────────

export type RgbColor  = { r: number; g: number; b: number };
export type HslColor  = { h: number; s: number; l: number };
export type HsvColor  = { h: number; s: number; v: number };
export type HwbColor  = { h: number; w: number; b: number };

// ── Conversion helpers ─────────────────────────────────────────────────────

export function hexToRgb(hex: string): RgbColor {
	const n = hex.replace('#', '');
	const full = n.length === 3 ? n.split('').map((c) => c + c).join('') : n;
	return {
		r: parseInt(full.slice(0, 2), 16),
		g: parseInt(full.slice(2, 4), 16),
		b: parseInt(full.slice(4, 6), 16)
	};
}

export function rgbToHex({ r, g, b }: RgbColor): string {
	return '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
}

export function rgbToHsl({ r, g, b }: RgbColor): HslColor {
	r /= 255; g /= 255; b /= 255;
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

export function hslToRgb({ h, s, l }: HslColor): RgbColor {
	s /= 100; l /= 100;
	const k = (n: number) => (n + h / 30) % 12;
	const a = s * Math.min(l, 1 - l);
	const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
	return { r: Math.round(f(0) * 255), g: Math.round(f(8) * 255), b: Math.round(f(4) * 255) };
}

export function rgbToHsv({ r, g, b }: RgbColor): HsvColor {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
	let h = 0;
	const s = max === 0 ? 0 : d / max;
	const v = max;
	if (d !== 0) {
		switch (max) {
			case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
			case g: h = ((b - r) / d + 2) / 6; break;
			case b: h = ((r - g) / d + 4) / 6; break;
		}
	}
	return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

export function hsvToRgb({ h, s, v }: HsvColor): RgbColor {
	s /= 100; v /= 100;
	const k = (n: number) => (n + h / 60) % 6;
	const f = (n: number) => v - v * s * Math.max(0, Math.min(k(n), Math.min(4 - k(n), 1)));
	return { r: Math.round(f(5) * 255), g: Math.round(f(3) * 255), b: Math.round(f(1) * 255) };
}

export function rgbToHwb({ r, g, b }: RgbColor): HwbColor {
	const { h } = rgbToHsl({ r, g, b });
	r /= 255; g /= 255; b /= 255;
	const w = Math.min(r, g, b);
	const bk = 1 - Math.max(r, g, b);
	return { h, w: Math.round(w * 100), b: Math.round(bk * 100) };
}

export function hwbToRgb({ h, w, b }: HwbColor): RgbColor {
	w /= 100; b /= 100;
	if (w + b >= 1) {
		const g = w / (w + b);
		const v = Math.round(g * 255);
		return { r: v, g: v, b: v };
	}
	const rgb = hslToRgb({ h, s: 100, l: 50 });
	return {
		r: Math.round((rgb.r / 255 * (1 - w - b) + w) * 255),
		g: Math.round((rgb.g / 255 * (1 - w - b) + w) * 255),
		b: Math.round((rgb.b / 255 * (1 - w - b) + w) * 255)
	};
}

export function isValidHex(hex: string): boolean {
	return /^#[0-9A-Fa-f]{3}([0-9A-Fa-f]{3})?$/.test(hex);
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
	// Canonical internal state — RGB (lossless, no hue drift)
	#rgb = $state<RgbColor>({ r: 0, g: 0, b: 0 });

	constructor(props: () => Props) {
		super(props);
		const initial = props().value ?? '#000000';
		if (isValidHex(initial)) this.#rgb = hexToRgb(initial);
	}

	// ── Canonical value ──────────────────────────────────────────────────

	get value(): string {
		return rgbToHex(this.#rgb);
	}

	// ── Domain getters ───────────────────────────────────────────────────

	get rgb(): RgbColor  { return { ...this.#rgb }; }
	get hsl(): HslColor  { return rgbToHsl(this.#rgb); }
	get hsv(): HsvColor  { return rgbToHsv(this.#rgb); }
	get hwb(): HwbColor  { return rgbToHwb(this.#rgb); }

	get swatches(): string[] {
		return this.props.swatches ?? [];
	}

	// ── Setters (each domain → canonical RGB → hex prop) ────────────────

	#commit(rgb: RgbColor) {
		this.#rgb = rgb;
		this.props.value = rgbToHex(rgb);
	}

	setHex(hex: string)          { if (isValidHex(hex)) this.#commit(hexToRgb(hex)); }
	setRgb(rgb: RgbColor)        { this.#commit(rgb); }
	setHsl(hsl: HslColor)        { this.#commit(hslToRgb(hsl)); }
	setHsv(hsv: HsvColor)        { this.#commit(hsvToRgb(hsv)); }
	setHwb(hwb: HwbColor)        { this.#commit(hwbToRgb(hwb)); }

	// ── Per-channel setters ───────────────────────────────────────────────

	setR(r: number) { this.#commit({ ...this.#rgb, r }); }
	setG(g: number) { this.#commit({ ...this.#rgb, g }); }
	setB(b: number) { this.#commit({ ...this.#rgb, b }); }

	setH_hsl(h: number) { this.setHsl({ ...this.hsl, h }); }
	setS_hsl(s: number) { this.setHsl({ ...this.hsl, s }); }
	setL_hsl(l: number) { this.setHsl({ ...this.hsl, l }); }

	setH_hsv(h: number) { this.setHsv({ ...this.hsv, h }); }
	setS_hsv(s: number) { this.setHsv({ ...this.hsv, s }); }
	setV_hsv(v: number) { this.setHsv({ ...this.hsv, v }); }

	setH_hwb(h: number) { this.setHwb({ ...this.hwb, h }); }
	setW_hwb(w: number) { this.setHwb({ ...this.hwb, w }); }
	setB_hwb(b: number) { this.setHwb({ ...this.hwb, b }); }
}
