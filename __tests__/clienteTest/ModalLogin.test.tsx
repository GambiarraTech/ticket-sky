import ModalLogin from '@/components/cliente/ModalLogin';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';


describe('ModalLogin', () => {

    it('renders fields and buttons correctly', () => {
        render(<ModalLogin onSubmit={jest.fn()} />);

        // Verify the common elements
        expect(screen.getByPlaceholderText('E-mail')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Senha')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Fazer Login' })).toBeInTheDocument();
        expect(screen.getByText('Primeiro Acesso?')).toBeInTheDocument();
        expect(screen.getByText('Criar Conta')).toBeInTheDocument();

        // Switch to the 'signUp' variant
        fireEvent.click(screen.getByText('Criar Conta'));

        // Verify the additional elements for the 'signUp' variant
        expect(screen.getByPlaceholderText('Nome')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Sobrenome')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Cadastre-se' })).toBeInTheDocument();
    });

    test('switches between sign-in and sign-up variants when link button is clicked', () => {
        render(<ModalLogin onSubmit={() => { }} />);

        // Verifica o texto inicial
        expect(screen.getByText('Faça Login')).toBeInTheDocument();

        // Clica no botão de mudar a variante
        const linkButton = screen.getByText('Criar Conta');
        fireEvent.click(linkButton);

        // Verifica o texto após clicar no botão
        expect(screen.getByText('Faça seu cadastro')).toBeInTheDocument();
    });


});