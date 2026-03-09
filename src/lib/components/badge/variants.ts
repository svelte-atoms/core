import { defineVariants } from '$svelte-atoms/core/utils';

export const badgeVariants = defineVariants({
	variants: {
		variant: {
			default: 'bg-foreground/10 text-foreground border-transparent',
			primary: 'bg-primary text-primary-foreground border-transparent',
			secondary: 'bg-secondary text-secondary-foreground border-transparent',
			outline: 'bg-transparent text-foreground border border-border',
			destructive: 'bg-destructive text-destructive-foreground border-transparent',
			success: 'bg-green-100 text-green-800 border-transparent dark:bg-green-900 dark:text-green-100',
			warning: 'bg-yellow-100 text-yellow-800 border-transparent dark:bg-yellow-900 dark:text-yellow-100'
		},
		size: {
			sm: 'px-1.5 py-0 text-[10px]',
			md: 'px-2.5 py-0.5 text-xs',
			lg: 'px-3 py-1 text-sm'
		}
	},
	defaults: {
		variant: 'default',
		size: 'md'
	}
});

export type BadgeVariantProps = {
	variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning';
	size?: 'sm' | 'md' | 'lg';
};
