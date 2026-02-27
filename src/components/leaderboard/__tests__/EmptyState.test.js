import { render } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';
import EmptyState from '../EmptyState.svelte';

describe('EmptyState', () => {
	it('renders with default props', () => {
		const { container } = render(EmptyState);
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('renders with custom title and body', () => {
		const { container } = render(EmptyState, {
			props: {
				title: 'No art collected yet',
				body: 'Start walking to discover art!'
			}
		});
		expect(container.innerHTML).toMatchSnapshot();
	});

	it('displays the provided title text', () => {
		const { getByText } = render(EmptyState, {
			props: { title: 'Custom title', body: 'Custom body' }
		});
		expect(getByText('Custom title')).toBeTruthy();
		expect(getByText('Custom body')).toBeTruthy();
	});
});
