import TitleLogin from '@/components/admin/TitleLogin';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

test('renders TitleLogin component', () => {
    render(<TitleLogin />);
    
    // Assert that the logo image is rendered
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    
    
  
    // Assert that the login text is rendered
    //expect(loginText).toBeInTheDocument();
    //const loginText = screen.getByRole('p', {name: /Login de Administador/i})
    
    

  });