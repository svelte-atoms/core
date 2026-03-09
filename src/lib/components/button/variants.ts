import { defineVariants } from '$svelte-atoms/core/utils';

export const buttonVariants = defineVariants({
	variants: {
		variant: {
			default:
				'text-primary-foreground bg-primary hover:bg-primary/95 active:bg-primary/90',
			secondary:
				'text-secondary-foreground bg-secondary hover:bg-secondary/80 active:bg-secondary/70',
			outline:
				'border border-border bg-transparent text-foreground hover:bg-foreground/5 active:bg-foreground/10',
			ghost:
				'bg-transparent text-foreground hover:bg-foreground/5 active:bg-foreground/10 border-transparent',
			destructive:
				'bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80',
			link: 'bg-transparent text-primary underline-offset-4 hover:underline border-transparent p-0 h-auto'
		},
		size: {
			xs: 'h-7 px-2 py-1 text-xs rounded',
			sm: 'h-8 px-3 py-1.5 text-sm rounded-md',
			md: 'h-10 px-4 py-2 text-sm rounded-md',
			lg: 'h-11 px-6 py-2.5 text-base rounded-md',
			xl: 'h-12 px-8 py-3 text-base rounded-lg',
			icon: 'h-10 w-10 p-0 rounded-md'
		}
	},
	defaults: {
		variant: 'default',
		size: 'md'
	}
});

export type ButtonVariantProps = {
	variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon';
};
