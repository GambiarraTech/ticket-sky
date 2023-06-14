import Footer from '@/components/admin/Footer';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

test('renders Footer component', () => {
  const { getByText } = render(<Footer bgcolor="#000" color="#fff" />);
  const footerElement = getByText(/Gambiarra Tech/i);
  
  expect(footerElement).toBeInTheDocument();
});