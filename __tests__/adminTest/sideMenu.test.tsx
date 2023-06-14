import SideMenu from "@/components/admin/sideMenu";
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

test('renders SideMenu component with correct options', () =>{
    render(<SideMenu>Mocked Children</SideMenu>)

    // Query the options in the side menu
    const adminOption = screen.getByText('Administradores');
    const promotersOption = screen.getByText('Promoters');
    const eventosOption = screen.getByText('Eventos');

    //Assert the options are rendered correctly
    expect(adminOption).toBeInTheDocument();
    expect(promotersOption).toBeInTheDocument();
    expect(eventosOption).toBeInTheDocument();




})























