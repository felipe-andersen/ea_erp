import { render, screen } from '@testing-library/react';
import Dashboard from './dashboard.view';
import { describe, it, vi } from 'vitest';
import { expect } from 'vitest';

vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        refresh: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => '/dashboard',
    useSearchParams: () => new URLSearchParams()
}));

describe('<Dashboard />', () => {
    it('render', () => {
        render(<Dashboard/>);
        expect(screen.getByText('Vender')).toBeInTheDocument();
    })
})







