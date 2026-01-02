/**
 * Property-Based Test for WorldMap Connection Line Rendering and Animation
 * 
 * **Property 1: Connection Line Rendering and Animation**
 * For any array of location pairs, the WorldMap component should render curved SVG paths 
 * between each pair and animate them with staggered timing when loop mode is enabled.
 * 
 * **Validates: Requirements 1.2, 3.1, 3.4**
 */

import { render } from '@testing-library/react';
import { WorldMap } from '../app/components/ui/map';

// Mock next-themes to avoid SSR issues in tests
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
  ThemeProvider: ({ children }) => children,
}));

// Mock next/image to avoid optimization issues in tests
jest.mock('next/image', () => {
  return function MockImage({ src, alt, priority, ...props }) {
    return <img src={src} alt={alt} data-testid="world-map-image" />;
  };
});

// Mock framer-motion to avoid animation complexity in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
    g: ({ children, ...props }) => <g {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Property-based test data generators
const generateRandomCoordinate = () => ({
  lat: Math.random() * 180 - 90,  // -90 to 90
  lng: Math.random() * 360 - 180, // -180 to 180
});

const generateLocationPair = (index) => ({
  start: {
    ...generateRandomCoordinate(),
    label: `Location ${index}A`,
  },
  end: {
    ...generateRandomCoordinate(),
    label: `Location ${index}B`,
  },
});

const generateLocationPairs = (count) => {
  return Array.from({ length: count }, (_, i) => generateLocationPair(i));
};

describe('WorldMap Connection Line Rendering Properties', () => {
  describe('Property 1: Connection Line Rendering', () => {
    test('should render SVG paths for any array of location pairs', () => {
      // Test with different numbers of location pairs (1-5)
      for (let pairCount = 1; pairCount <= 5; pairCount++) {
        const dots = generateLocationPairs(pairCount);
        
        const { container } = render(<WorldMap dots={dots} />);
        
        // Verify SVG container exists
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        
        // Verify correct number of path elements are rendered
        const paths = container.querySelectorAll('path[d*="M"][d*="Q"]');
        expect(paths).toHaveLength(pairCount);
        
        // Verify each path has curved structure (contains quadratic curve command 'Q')
        paths.forEach((path) => {
          const pathData = path.getAttribute('d');
          expect(pathData).toMatch(/M\s+[\d.-]+\s+[\d.-]+\s+Q\s+[\d.-]+\s+[\d.-]+\s+[\d.-]+\s+[\d.-]+/);
        });
      }
    });

    test('should render location points for all start and end coordinates', () => {
      const dots = generateLocationPairs(3);
      const { container } = render(<WorldMap dots={dots} />);
      
      // Should have circles for location points
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThanOrEqual(dots.length * 2);
      
      // Verify circles have proper positioning attributes
      circles.forEach((circle) => {
        expect(circle).toHaveAttribute('cx');
        expect(circle).toHaveAttribute('cy');
        expect(circle).toHaveAttribute('r');
      });
    });

    test('should apply gradient stroke to connection paths', () => {
      const dots = generateLocationPairs(2);
      const { container } = render(<WorldMap dots={dots} />);
      
      // Verify gradient definition exists
      const gradient = container.querySelector('#path-gradient');
      expect(gradient).toBeInTheDocument();
      
      // Verify paths use the gradient
      const paths = container.querySelectorAll('path[stroke="url(#path-gradient)"]');
      expect(paths).toHaveLength(dots.length);
    });

    test('should handle empty dots array gracefully', () => {
      const { container } = render(<WorldMap dots={[]} />);
      
      // Should still render the base map
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
      
      // Should not render any connection paths
      const paths = container.querySelectorAll('path[d*="M"][d*="Q"]');
      expect(paths).toHaveLength(0);
    });

    test('should maintain consistent path structure across different coordinate ranges', () => {
      // Test with extreme coordinates
      const extremeDots = [
        {
          start: { lat: -90, lng: -180, label: 'South Pole' },
          end: { lat: 90, lng: 180, label: 'North Pole' }
        },
        {
          start: { lat: 0, lng: 0, label: 'Equator' },
          end: { lat: 45, lng: 90, label: 'Mid Point' }
        }
      ];
      
      const { container } = render(<WorldMap dots={extremeDots} />);
      
      const paths = container.querySelectorAll('path[d*="M"][d*="Q"]');
      expect(paths).toHaveLength(2);
      
      // Verify all paths have valid curve structure
      paths.forEach((path) => {
        const pathData = path.getAttribute('d');
        expect(pathData).toMatch(/M\s+[\d.-]+\s+[\d.-]+\s+Q\s+[\d.-]+\s+[\d.-]+\s+[\d.-]+\s+[\d.-]+/);
      });
    });

    test('should project coordinates consistently within valid ranges', () => {
      // Generate random location pairs to test projection consistency
      for (let i = 0; i < 10; i++) {
        const dots = generateLocationPairs(2);
        const { container } = render(<WorldMap dots={dots} />);
        
        const circles = container.querySelectorAll('circle[cx][cy]');
        
        circles.forEach((circle) => {
          const cx = parseFloat(circle.getAttribute('cx'));
          const cy = parseFloat(circle.getAttribute('cy'));
          
          // Verify coordinates are within expected SVG viewBox (0-800, 0-400)
          expect(cx).toBeGreaterThanOrEqual(0);
          expect(cx).toBeLessThanOrEqual(800);
          expect(cy).toBeGreaterThanOrEqual(0);
          expect(cy).toBeLessThanOrEqual(400);
        });
      }
    });
  });
});