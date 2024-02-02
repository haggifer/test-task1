import React from 'react';
import { render } from '@testing-library/react';
import ImageFallback from './ImageFallback';

describe('ImageFallback Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<ImageFallback />);
    expect(container).toBeInTheDocument();
  });

  it('renders with a custom className', () => {
    const { container } = render(<ImageFallback className="custom-class" />);
    const imageFallbackElement = container.querySelector('.custom-class');
    expect(imageFallbackElement).toBeInTheDocument();
  });

  it('applies custom styles using sx prop', () => {
    const { container } = render(<ImageFallback sx={{ color: 'red' }} />);
    const imageFallbackElement = container.firstChild as HTMLElement;
    expect(imageFallbackElement).toHaveStyle('color: red');
  });
});