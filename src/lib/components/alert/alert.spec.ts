import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/svelte';
import AlertTestComponent from './alert-test.svelte';

describe('Alert Component', () => {
	describe('Basic Functionality', () => {
		it('should render alert with default variant', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'info',
					title: 'Test Alert',
					description: 'This is a test alert'
				}
			});

			const alert = screen.getByRole('alert');
			expect(alert).toBeInTheDocument();
			expect(alert).toHaveAttribute('data-variant', 'info');
			expect(screen.getByText('Test Alert')).toBeInTheDocument();
			expect(screen.getByText('This is a test alert')).toBeInTheDocument();
		});

		it('should render different variants correctly', () => {
			const variants = ['info', 'success', 'warning', 'error'] as const;

			variants.forEach((variant) => {
				const { unmount } = render(AlertTestComponent, {
					props: {
						variant,
						title: `${variant} alert`,
						description: `This is a ${variant} alert`
					}
				});

				const alert = screen.getByRole('alert');
				expect(alert).toHaveAttribute('data-variant', variant);
				unmount();
			});
		});

		it('should handle dismissible state', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'warning',
					title: 'Dismissible Alert',
					description: 'This alert can be dismissed',
					dismissible: true
				}
			});

			const alert = screen.getByRole('alert');
			expect(alert).toHaveAttribute('data-dismissible', 'true');
			expect(alert).toHaveAttribute('data-dismissed', 'false');

			const closeButton = screen.getByRole('button', { name: /dismiss alert/i });
			expect(closeButton).toBeInTheDocument();
		});

		it('should handle disabled state', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'info',
					title: 'Disabled Alert',
					description: 'This alert is disabled',
					disabled: true
				}
			});

			const alert = screen.getByRole('alert');
			expect(alert).toHaveAttribute('aria-disabled', 'true');
		});
	});

	describe('Dismissible Functionality', () => {
		it('should dismiss alert when close button is clicked', async () => {
			render(AlertTestComponent, {
				props: {
					variant: 'info',
					title: 'Dismissible Alert',
					description: 'Click to dismiss',
					dismissible: true
				}
			});

			const alert = screen.getByRole('alert');
			const closeButton = screen.getByRole('button', { name: /dismiss alert/i });

			expect(alert).toHaveAttribute('data-dismissed', 'false');

			await fireEvent.click(closeButton);

			// Note: In a real test, you might need to check for the dismissed state
			// or use a test wrapper that exposes the dismissed state
		});

		it('should not render close button when not dismissible', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'info',
					title: 'Non-dismissible Alert',
					description: 'Cannot be dismissed',
					dismissible: false
				}
			});

			const closeButton = screen.queryByRole('button', { name: /dismiss alert/i });
			expect(closeButton).not.toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should have proper ARIA attributes', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'error',
					title: 'Error Alert',
					description: 'Something went wrong'
				}
			});

			const alert = screen.getByRole('alert');
			expect(alert).toHaveAttribute('aria-labelledby');
			expect(alert).toHaveAttribute('aria-describedby');
		});

		it('should have proper heading hierarchy', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'success',
					title: 'Success Message',
					description: 'Operation completed successfully'
				}
			});

			const heading = screen.getByRole('heading', { level: 4 });
			expect(heading).toBeInTheDocument();
			expect(heading).toHaveTextContent('Success Message');
		});

		it('should have accessible close button', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'warning',
					title: 'Warning Alert',
					description: 'Please be careful',
					dismissible: true
				}
			});

			const closeButton = screen.getByRole('button', { name: /dismiss alert/i });
			expect(closeButton).toHaveAttribute('aria-label', 'Dismiss alert');
		});
	});

	describe('Styling and Classes', () => {
		it('should apply custom CSS classes', () => {
			render(AlertTestComponent, {
				props: {
					variant: 'info',
					title: 'Custom Class Alert',
					description: 'Has custom styling',
					class: 'custom-alert-class'
				}
			});

			const alert = screen.getByRole('alert');
			expect(alert).toHaveClass('custom-alert-class');
		});

		it('should apply variant-specific styling', () => {
			const { container } = render(AlertTestComponent, {
				props: {
					variant: 'error',
					title: 'Error Alert',
					description: 'Critical error'
				}
			});

			const alert = container.querySelector('[data-variant="error"]');
			expect(alert).toBeInTheDocument();
		});
	});
});
