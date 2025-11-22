import type { QRCodeBrowser } from '@qrcode-js/browser';

type QRCodeOptions = Parameters<ReturnType<typeof QRCodeBrowser>['setOptions']>[0];

export type QRCodeProps = {
	class?: string;
	value: string;
	finder?: QRCodeOptions['finder'];
	dots?: QRCodeOptions['dots'];
	drawFunction?: QRCodeOptions['drawFunction'];
	gradient?: QRCodeOptions['gradient'];
	logo?: QRCodeOptions['logo'];
	margin?: QRCodeOptions['margin'];
	qr?: QRCodeOptions['qr'];
};
