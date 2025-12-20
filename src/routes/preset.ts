import { clickoutDrawer, type Preset } from '$svelte-atoms/core';
import { createAttachmentKey } from 'svelte/attachments';

const buttonVariants = () => ({
	variant: {
		primary: {
			class: 'bg-primary text-primary-foreground hover:bg-primary/80 active:bg-primary/100'
		},
		secondary: {
			class: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/100'
		},
		destructive: {
			class:
				'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/100'
		},
		outline: {
			class:
				'bg-foreground/0 hover:bg-foreground/0 active:bg-foreground/5 border border-border hover:border-foreground/25 text-foreground'
		},
		ghost: {
			class: 'bg-transparent hover:bg-accent/90 active:bg-accent/100 text-accent-foreground'
		}
	}
});

export const preset: Partial<Preset> = {
	root: () => ({
		class: 'flex flex-col items-center justify-center p-4'
	}),
	accordion: () => ({
		as: 'ul',
		class: 'w-full max-w-md rounded-md p-4 accordion-preset'
	}),
	'accordion.item': () => ({
		as: 'li',
		class: 'mb-2 last:mb-0 rounded-md border border-border bg-popover px-2 py-2'
	}),
	'accordion.item.header': (bond) => {
		return () => ({
			class: ['', bond?.state?.isActive ? 'text-foreground/100' : 'text-foreground/50']
		});
	},
	'accordion.item.body': () => ({
		class: 'overflow-hidden mt-2'
	}),
	badge: () => {
		const data = buttonVariants();

		return {
			class: 'transition-colors duration-100',
			variants: {
				variant: data?.variant
			},
			defaults: {
				variant: 'primary'
			}
		};
	},
	button: () => {
		const variants = buttonVariants();

		return {
			class:
				'flex items-center px-3 py-2 h-12 disabled:opacity-50 disabled:pointer-events-none items-center transition-colors duration-100',
			variants: variants,
			defaults: {
				variant: 'primary'
			}
		};
	},
	datagrid: () => ({
		class: 'bg-card rounded-none gap-x-2 overflow-hidden gap-x-2'
	}),
	'datagrid.header': () => ({
		class: 'bg-background/25 py-0'
	}),
	'datagrid.tr': (bond) => {
		const isSelected = bond?.state?.isSelected ?? false;
		const isHeader = bond?.state?.isHeader ?? false;

		return {
			class: [
				'pr-8 pl-8 duration-100 transition-colors transition-colors duration-100 rounded-none',
				!isHeader && 'hover:bg-foreground/2 active:bg-foreground/4 last:border-b-0',
				isSelected && 'bg-primary/2 hover:bg-primary/4 active:bg-primary/6'
			]
		};
	},
	'datagrid.th': () => {
		return {
			class: 'px-0 py-2 text-left font-semibold text-sm'
		};
	},
	'datagrid.td': () => {
		return {
			class: 'px-0 py-2'
		};
	},
	'dialog.content': () => ({
		class:
			'bg-card rounded-lg shadow-lg border border-border max-w-3xl w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-[50svw] p-0'
	}),
	'dialog.header': () => ({
		class: 'border-b px-6 py-4 flex items-center gap-4'
	}),
	'dialog.footer': () => ({
		class: 'border-t px-6 py-4 flex justify-end gap-2'
	}),
	'dialog.body': () => ({
		class: 'px-6 py-4'
	}),
	'drawer.content': () => ({
		[createAttachmentKey()]: clickoutDrawer((_, bond) => {
			bond?.state.close?.();
		})
	}),
	collapsible: () => ({
		class: 'max-w-md rounded-md border border-border p-2'
	}),
	'collapsible.header': () => ({
		class: 'px-2 py-2 hover:bg-foreground/5 active:bg-foreground/10 flex cursor-pointer rounded'
	}),
	'collapsible.body': () => ({
		class: 'text-sm px-2'
	}),
	'popover.content': () => ({
		class: ''
	}),
	'popover.indicator': () => ({
		class: 'text-accent'
	}),
	alert: () => ({
		class: 'relative gap-1 flex flex-col rounded-md border p-4 transition-all duration-200',
		variants: {
			variant: {
				primary: {
					class:
						'bg-primary/5 text-primary hover:bg-primary/10 active:bg-primary/15 border-primary border'
				},
				secondary: {
					class:
						'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:bg-secondary/100'
				},
				destructive: {
					class:
						'bg-destructive text-destructive-foreground hover:bg-destructive/80 active:bg-destructive/100'
				},
				outline: {
					class:
						'bg-transparent hover:bg-foreground/5 active:bg-foreground/10 border border-border text-foreground'
				},
				ghost: {
					class: 'bg-transparent hover:bg-accent/90 active:bg-accent/100 text-accent-foreground'
				},
				warning: {
					class:
						'bg-yellow-500/5 text-yellow-500 border-yellow-500/50 border hover:bg-yellow-500/8 active:bg-yellow-500/10'
				},
				info: {
					class:
						'bg-blue-500/5 text-blue-500 border-blue-500/50 border hover:bg-blue-500/8 active:bg-blue-500/10'
				}
			}
		},
		defaults: {
			variant: 'primary'
		}
	}),
	'alert.icon': () => ({
		class: 'inline-flex aspect-square size-4 shrink-0 items-center justify-center'
	}),
	'alert.content': () => ({
		class: 'flex-1 space-y-1 text-sm'
	}),
	'alert.title': () => ({
		class: 'text-md font-semibold leading-tight flex items-center gap-1'
	}),
	'alert.description': () => ({
		class: 'text-sm leading-relaxed opacity-90'
	}),
	'alert.actions': () => ({
		class: 'mt-3 flex items-center gap-2'
	}),
	'alert.close-button': () => ({
		class:
			'rounded-md p-0.5 size-6 opacity-70 transition-all hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-1'
	}),
	'menu.list': () => ({
		class: 'bg-card'
	}),
	'tab.header': () => ({
		class:
			"text-muted-foreground data-[active='true']:text-primary hover:text-foreground data-[active='true']:border-b-primary border-b border-transparent px-4 py-2"
	}),
	card: () => ({
		class: 'bg-card rounded-lg border border-border p-4 shadow-sm'
	}),
	'card.content': () => ({
		class: 'space-y-2'
	}),
	'card.header': () => ({
		class: 'font-semibold text-lg'
	}),
	'card.body': () => ({
		class: ''
	}),
	'card.title': () => ({
		class: 'font-medium text-md'
	}),
	'card.description': () => ({
		class: 'text-sm text-muted-foreground'
	}),
	'card.subtitle': () => ({
		class: 'text-sm text-muted-foreground'
	}),
	'card.media': () => ({
		class: 'rounded-md overflow-hidden'
	})
};
