import Navbar from '@/components/Navbar';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


test('renders Navbar component', () => {
    // Mock props
    const props = {
        backgroundColor: 'blue',
        leftComponent: <div>Left Component</div>,
        centerComponent: <div>Center Component</div>,
        rightComponent: <div>Right Component</div>,
    };

    // Render the Navbar component
    render(<Navbar {...props} />);

    // Assert that the components are rendered correctly
    const leftComponent = screen.getByText('Left Component');
    expect(leftComponent).toBeInTheDocument();

    const centerComponent = screen.getByText('Center Component');
    expect(centerComponent).toBeInTheDocument();

    const rightComponent = screen.getByText('Right Component');
    expect(rightComponent).toBeInTheDocument();

    // Additional assertions for the navbar style based on the background color prop
    const navbarElement = screen.getByRole('navigation');
    expect(navbarElement).toHaveClass('navbarBlue');
});
