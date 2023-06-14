import Login from '@/components/home/login';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


describe('Login component', () => {
    it('should render the login form', () => {
        render(<Login />);

        // Check if the form inputs are rendered
        const emailInput = screen.getByLabelText('Digite o email:');
        const passwordInput = screen.getByLabelText('Digite a senha:');
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();

        // Check if the login button is rendered
        const loginButton = screen.getByRole('button', { name: 'Fazer login' });
        expect(loginButton).toBeInTheDocument();

        // Check if the "Esqueceu sua senha?" button is rendered
        const forgotPasswordButton = screen.getByRole('link', { name: 'Esqueceu sua senha?' });
        expect(forgotPasswordButton).toBeInTheDocument();

        // Check if the "Crie uma nova conta" link is rendered
        const createAccountLink = screen.getByRole('link', { name: 'Crie uma nova conta' });
        expect(createAccountLink).toBeInTheDocument();
    });
});
