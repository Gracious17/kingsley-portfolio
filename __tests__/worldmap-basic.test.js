/**
 * Basic test for WorldMap component to verify it can be imported and rendered
 */

import { render } from '@testing-library/react';

// Mock all external dependencies
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('next/image', () => {
  return function MockImage() {
    return <div data-testid="mock-image">Mock World Map</div>;
  };
});

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
    g: ({ children, ...props }) => <g {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }) => children,
}));

jest.mock('dotted-map', () => {
  return jest.fn().mockImplementation(() => ({
    getSVG: () => '<svg><circle cx="50" cy="50" r="1"/></svg>'
  }));
});

describe('WorldMap Basic Functionality', () => {
  test('should render without crashing', () => {
    const { WorldMap } = require('../app/components/ui/map');
    
    const { container } = render(<WorldMap />);
    
    expect(container).toBeInTheDocument();
  });

  test('should render with dots prop', () => {
    const { WorldMap } = require('../app/components/ui/map');
    
    const dots = [
      {
        start: { lat: 40.7128, lng: -74.0060, label: 'New York' },
        end: { lat: 51.5074, lng: -0.1278, label: 'London' }
      }
    ];
    
    const { container } = render(<WorldMap dots={dots} />);
    
    expect(container).toBeInTheDocument();
  });
});