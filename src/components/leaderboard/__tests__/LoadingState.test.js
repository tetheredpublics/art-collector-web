import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import LoadingState from '../LoadingState.svelte';

describe('LoadingState', () => {
	it('renders with default message', () => {
		const { container } = render(LoadingState);
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('renders with custom message', () => {
		const { container } = render(LoadingState, {
			props: { message: 'Fetching results…' }
		});
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('displays the loading message text', () => {
		const { getByText } = render(LoadingState, {
			props: { message: 'Please wait…' }
		});
		expect(getByText('Please wait…')).toBeTruthy();
	});

	it('contains the spinner element', () => {
		const { container } = render(LoadingState);
		const spinner = container.querySelector('.spinner');
		expect(spinner).toBeTruthy();
	});
});
