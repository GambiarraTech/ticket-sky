import Card from '@/components/admin/Card';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

test('renders label and content correctly', () => {
  const label = 'Title';
  const content = 'Lorem ipsum dolor sit amet';

  render(<Card label={label} content={content} />);

  const labelElement = screen.getByText(label);
  const contentElement = screen.getByText(content);

  expect(labelElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
});