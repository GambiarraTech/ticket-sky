import MeuPerfil from '@/components/cliente/ModalMeuPerfil';
import { AuthContext } from '@/contexts/AuthContext';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';


describe('MeuPerfil', () => {
    test('renderiza corretamente o componente MeuPerfil e atualiza os campos corretamente', () => {
        const user = {
            id: '1',
            role: 'user',
            nome: 'João',
            sobrenome: 'Silva',
            email: 'joao@example.com',
            cpf: '123456789',
        };

        render(
            <AuthContext.Provider value={{ user, isLogged: true, login: jest.fn(), logout: jest.fn() }}>
                <MeuPerfil />
            </AuthContext.Provider>
        );

        // Verifica se os campos são exibidos corretamente
        expect(screen.getByLabelText('Nome:')).toHaveValue(user.nome);
        expect(screen.getByLabelText('Sobrenome:')).toHaveValue(user.sobrenome);
        expect(screen.getByLabelText('E-mail:')).toHaveValue(user.email);
        expect(screen.getByLabelText('CPF:')).toHaveValue(user.cpf);

        // Simula a digitação de um novo valor nos campos
        fireEvent.change(screen.getByLabelText('Nome:'), { target: { value: 'Jane' } });
        fireEvent.change(screen.getByLabelText('Sobrenome:'), { target: { value: 'Smith' } });
        fireEvent.change(screen.getByLabelText('E-mail:'), { target: { value: 'jane.smith@example.com' } });
        fireEvent.change(screen.getByLabelText('CPF:'), { target: { value: '98765432101' } });

        // Verifica se os valores foram atualizados corretamente
        expect(screen.getByLabelText('Nome:')).toHaveValue('Jane');
        expect(screen.getByLabelText('Sobrenome:')).toHaveValue('Smith');
        expect(screen.getByLabelText('E-mail:')).toHaveValue('jane.smith@example.com');
        expect(screen.getByLabelText('CPF:')).toHaveValue('98765432101');
    });
});





