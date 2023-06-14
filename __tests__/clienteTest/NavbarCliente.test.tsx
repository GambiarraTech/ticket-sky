import NavbarCliente from '@/components/cliente/NavbarCliente';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';



test('renderiza corretamente quando o usuário não está logado como cliente', () => {

    render(<NavbarCliente />);

    // Verifica se o elemento de "Fazer Login" está presente
    expect(screen.getByText('Fazer Login')).toBeInTheDocument();

    // Dispara um evento de clique no botão de "Fazer Login"
    fireEvent.click(screen.getByText('Fazer Login'));


});


