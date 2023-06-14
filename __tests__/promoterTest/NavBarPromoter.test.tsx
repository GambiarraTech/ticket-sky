import NavbarPromoter from '@/components/promoter/NavbarPromoter';
import { AuthContext } from '@/contexts/AuthContext';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


const mockAuthContext = {
    user: {
        id: '1',
        role: 'promoter',
        nome: 'John',
        sobrenome: 'Doe',
        email: 'john@example.com',
        cpf: '12345678900',
    },
    isLogged: true,
    login: jest.fn(),
    logout: jest.fn(),
};


describe('NavbarPromoter', () => {
    test('Renderiza corretamente', () => {
        render(
            <AuthContext.Provider value={mockAuthContext}>
                <NavbarPromoter />
            </AuthContext.Provider>
        );

        // Verifica se o logo está presente
        expect(screen.getByAltText('TicketSky - Logo')).toBeInTheDocument();


    });
});





