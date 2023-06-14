import Modal from '@/components/Modal';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render, screen } from '@testing-library/react';

// Mock da função onClose
const onCloseMock = jest.fn();

// Props para o componente
const props = {
    isOpen: true,
    onClose: onCloseMock,
};

// Renderização e teste do componente
test('renders Modal component', () => {
    render(
        <Modal {...props}>
            <div>Modal content</div>
        </Modal>
    );

    // Verifica se o conteúdo do modal está sendo renderizado corretamente
    const modalContent = screen.getByText('Modal content');
    expect(modalContent).toBeInTheDocument();

    // Simula o clique no botão de fechar o modal
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    // Verifica se a função onClose foi chamada corretamente
    expect(onCloseMock).toHaveBeenCalledTimes(1);
});
