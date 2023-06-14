import Footer from '@/components/Footer';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


test('renders Footer with correct text', () => {
    render(<Footer color="blue" />);

    const footerElement = screen.getByText(/© 2023 Copyright: Gambiarra Tech/i);
    expect(footerElement).toBeInTheDocument();
});