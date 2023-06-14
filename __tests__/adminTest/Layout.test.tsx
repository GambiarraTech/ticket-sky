import Layout from '@/components/admin/Layout';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';


describe('Layout component', () => {
  it('renders NavBar, SideMenu, Footer, and children', () => {
    // Renderiza o componente Layout
    render(
      <Layout>
        <div data-testid="children">Content</div>
      </Layout>
    );

    // Verifica se o children está presente
    expect(screen.getByTestId('children')).toBeInTheDocument();
  });
});
