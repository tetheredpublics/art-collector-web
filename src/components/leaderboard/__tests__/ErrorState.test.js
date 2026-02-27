import { render, fireEvent } from '@testing-library/svelte';
import { describe, it, expect, vi } from 'vitest';
import ErrorState from '../ErrorState.svelte';

describe('ErrorState', () => {
	it('renders with default message', () => {
		const { container } = render(ErrorState);
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('renders with custom error message', () => {
		const { container } = render(ErrorState, {
			props: { message: 'Network error occurred.' }
		});
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('displays the error message text', () => {
		const { getByText } = render(ErrorState, {
			props: { message: 'Failed to load data.' }
		});
		expect(getByText('Failed to load data.')).toBeTruthy();
	});

	it('renders a Retry button', () => {
		const { getByText } = render(ErrorState);
		const button = getByText('Retry');
		expect(button).toBeTruthy();
		expect(button.tagName).toBe('BUTTON');
	});

	it('dispatches retry event when button is clicked', async () => {
		const { getByText, component } = render(ErrorState);
		const handler = vi.fn();
		component.$on('retry', handler);

		await fireEvent.click(getByText('Retry'));
		expect(handler).toHaveBeenCalledOnce();
	});
});
