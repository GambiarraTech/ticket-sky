import Forms from '@/components/home/forms';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


describe('Forms component', () => {
    it('should render children', () => {
        render(
            <Forms>
                <div data-testid="child-element">Child Element</div>
            </Forms>
        );

        const childElement = screen.getByTestId('child-element');
        expect(childElement).toBeInTheDocument();
    });

    it('should render two buttons for "Cliente" and "Promoter"', () => {
        render(
            <Forms>
                <div>Example Children</div>
            </Forms>
        );

        const clienteButton = screen.getByText('Cliente');
        const promoterButton = screen.getByText('Promoter');

        expect(clienteButton).toBeInTheDocument();
        expect(promoterButton).toBeInTheDocument();
    });
});