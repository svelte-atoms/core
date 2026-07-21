import type { BarcodeOptions, BarcodeType } from 'etiket';
import type {
	BarcodeIROptions,
	QRCodeIROptions,
	MatrixIROptions,
	RootNode
} from 'etiket/ir';
import type { QRCodeOptions } from 'etiket';

export type { BarcodeType, RootNode };

export interface BarcodeProps extends BarcodeOptions, BarcodeIROptions {
	class?: string;
	value: string;
	type?: BarcodeType;
}

export interface EtiketQRCodeProps extends QRCodeIROptions, QRCodeOptions {
	class?: string;
	value: string;
}

export interface DataMatrixProps extends MatrixIROptions {
	class?: string;
	value: string;
	/** Use GS1 DataMatrix encoding */
	gs1?: boolean;
}

export interface PDF417Props extends MatrixIROptions {
	class?: string;
	value: string;
	/** Error correction level (0-8) */
	ecLevel?: number;
	/** Number of data columns (1-30) */
	columns?: number;
	/** Use compact PDF417 variant */
	compact?: boolean;
}

export interface AztecProps extends MatrixIROptions {
	class?: string;
	value: string;
	/** Error correction percentage (5-95, default 23) */
	ecPercent?: number;
	/** Number of layers (1-32, auto if omitted) */
	layers?: number;
	/** Use compact Aztec variant */
	compact?: boolean;
}

