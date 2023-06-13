import Table from '@/components/cliente/TableIngressos';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

test('renderiza corretamente os dados da tabela', () => {
    const data = [
        {
            img: 'imagem1.png',
            nomeEvento: 'Evento 1',
            dataAquisicao: '01/06/2023',
            valorTotal: 'R$ 100,00',
        },
        {
            img: 'imagem2.png',
            nomeEvento: 'Evento 2',
            dataAquisicao: '02/06/2023',
            valorTotal: 'R$ 150,00',
        },
    ];

    render(<Table data={data} />);

    // Verifica se os elementos de cada item da tabela estão sendo renderizados corretamente
    data.forEach((item) => {
        const eventName = screen.getByText(item.nomeEvento);
        const eventInfo = screen.getByText(`Data de Aquisição: ${item.dataAquisicao}`);
        const eventValue = screen.getByText(`Valor total: ${item.valorTotal}`);

        expect(eventName).toBeInTheDocument();
        expect(eventInfo).toBeInTheDocument();
        expect(eventValue).toBeInTheDocument();
    });
});