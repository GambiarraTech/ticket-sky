import NavBar from '@/components/home/navbarhome';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


describe('NavBar component', () => {
    it('renders correctly', () => {
        render(
            <NavBar>
                <div>Child Component</div>
            </NavBar>
        );

        // Assert that the logo text is rendered
        const logoElement = screen.getByAltText('logoNavBar');
        expect(logoElement).toBeInTheDocument();

        // Assert that the child component is rendered
        const childComponent = screen.getByText(/child component/i);
        expect(childComponent).toBeInTheDocument();

        // Assert that the navigation links are rendered
        const link1 = screen.getByText(/ENTRAR/i);
        expect(link1).toBeInTheDocument();

        const link2 = screen.getByText(/CADASTRAR/i);
        expect(link2).toBeInTheDocument();
    });
});