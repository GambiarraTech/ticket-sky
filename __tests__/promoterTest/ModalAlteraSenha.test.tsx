import AlterarSenha from '@/components/promoter/ModalAlteraSenha';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


describe('AlterarSenha', () => {
  test('renders fields correctly', () => {
    render(<AlterarSenha onSubmit={() => {}} />);
    
    const senhaAtualInput = screen.getByPlaceholderText('Senha Atual');
    const novaSenhaInput = screen.getByPlaceholderText('Nova Senha');
    const confirmacaoInput = screen.getByPlaceholderText('Digite novamente a nova senha');
    
    expect(senhaAtualInput).toBeInTheDocument();
    expect(novaSenhaInput).toBeInTheDocument();
    expect(confirmacaoInput).toBeInTheDocument();
  });

  
});
