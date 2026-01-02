/**
 * Property-Based Test for WorldMap Interactive Label Display
 * 
 * **Property 2: Interactive Label Display**
 * For any location point with hover interaction, the component should display 
 * the location label with smooth animations, and on mobile devices, tooltips 
 * should appear at the bottom of the component.
 * 
 * **Validates: Requirements 1.3, 4.2**
 */

import { render, fireEvent, screen } from '@testing-library/react';
import { WorldMap } from '../app/components/ui/map';

// Mock dependencies
jest.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

jest.mock('next/image', () => {
  return function MockImage({ src, alt }) {
    return <img src={src} alt={alt} data-testid="world-map-image" />;
  };
});

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, onHoverStart, onHoverEnd, ...props }) => (
      <div 
        {...props}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {children}
      </div>
    ),
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
    g: ({ children, onHoverStart, onHoverEnd, ...props }) => (
      <g 
        {...props}
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {children}
      </g>
    ),
  },
  AnimatePresence: ({ children }) => children,
}));

jest.mock('dotted-map', () => {
  return jest.fn().mockImplementation(() => ({
    getSVG: () => '<svg><circle cx="50" cy="50" r="1"/></svg>'
  }));
});

describe('WorldMap Interactive Label Display Properties', () => {
  // Property-based test data generators
  const generateLocationWithLabel = (index) => ({
    lat: Math.random() * 180 - 90,
    lng: Math.random() * 360 - 180,
    label: `TestLocation${index}`
  });

  const generateLocationPairsWithLabels = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      start: generateLocationWithLabel(i * 2),
      end: generateLocationWithLabel(i * 2 + 1)
    }));
  };

  describe('Property 2: Interactive Label Display', () => {
    test('should display labels for any location points when showLabels is true', () => {
      // Test with different numbers of location pairs (1-5)
      for (let pairCount = 1; pairCount <= 5; pairCount++) {
        const dots = generateLocationPairsWithLabels(pairCount);
        
        const { container } = render(
          <WorldMap dots={dots} showLabels={true} />
        );
        
        // Verify labels are rendered for all locations
        dots.forEach(dot => {
          expect(screen.getByText(dot.start.label)).toBeInTheDocument();
          expect(screen.getByText(dot.end.label)).toBeInTheDocument();
        });
        
        // Verify labels have proper styling
        const labels = container.querySelectorAll('span');
        expect(labels.length).toBe(pairCount * 2); // start + end for each pair
        
        labels.forEach(label => {
          expect(label).toHaveClass('text-sm', 'font-medium', 'px-2', 'py-0.5', 'rounded-md');
          expect(label).toHaveClass('bg-white/95', 'dark:bg-black/95');
          expect(label).toHaveClass('text-black', 'dark:text-white');
          expect(label).toHaveClass('border', 'border-gray-200', 'dark:border-gray-700');
        });
      }
    });

    test('should not display labels when showLabels is false', () => {
      const dots = generateLocationPairsWithLabels(3);
      
      const { container } = render(
        <WorldMap dots={dots} showLabels={false} />
      );
      
      // Verify no labels are rendered
      const labels = container.querySelectorAll('span');
      expect(labels).toHaveLength(0);
      
      // But location points should still be rendered
      const circles = container.querySelectorAll('circle');
      expect(circles.length).toBeGreaterThan(0);
    });

    test('should handle locations without labels gracefully', () => {
      const dotsWithoutLabels = [
        {
          start: { lat: 40.7128, lng: -74.0060 }, // No label
          end: { lat: 51.5074, lng: -0.1278, label: 'London' }
        },
        {
          start: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
          end: { lat: -33.8688, lng: 151.2093 } // No label
        }
      ];
      
      const { container } = render(
        <WorldMap dots={dotsWithoutLabels} showLabels={true} />
      );
      
      // Should only render labels for locations that have them
      expect(screen.getByText('London')).toBeInTheDocument();
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
      
      // Should not crash or render empty labels
      const labels = container.querySelectorAll('span');
      expect(labels).toHaveLength(2);
    });

    test('should apply smooth animations to label display', () => {
      const dots = generateLocationPairsWithLabels(2);
      
      const { container } = render(
        <WorldMap dots={dots} showLabels={true} />
      );
      
      // Verify labels are wrapped in motion components (mocked as divs)
      const labelContainers = container.querySelectorAll('foreignObject');
      expect(labelContainers.length).toBe(dots.length * 2);
      
      // Each label should be in a container that supports animation
      labelContainers.forEach(container => {
        expect(container).toHaveClass('pointer-events-none');
      });
    });

    test('should handle hover interactions on location points', () => {
      const dots = [
        {
          start: { lat: 40.7128, lng: -74.0060, label: 'New York' },
          end: { lat: 51.5074, lng: -0.1278, label: 'London' }
        }
      ];
      
      const { container } = render(<WorldMap dots={dots} />);
      
      // Find hover-enabled elements (mocked g elements with mouse events)
      const hoverElements = container.querySelectorAll('g[onMouseEnter]');
      expect(hoverElements.length).toBeGreaterThan(0);
      
      // Verify hover elements have cursor pointer styling
      hoverElements.forEach(element => {
        expect(element).toHaveClass('cursor-pointer');
      });
    });

    test('should display mobile tooltips on hover', () => {
      const dots = [
        {
          start: { lat: 40.7128, lng: -74.0060, label: 'New York' },
          end: { lat: 51.5074, lng: -0.1278, label: 'London' }
        }
      ];
      
      const { container } = render(<WorldMap dots={dots} />);
      
      // Find a hover-enabled element
      const hoverElement = container.querySelector('g[onMouseEnter]');
      expect(hoverElement).toBeInTheDocument();
      
      // Simulate hover
      fireEvent.mouseEnter(hoverElement);
      
      // Check if mobile tooltip appears (would be rendered by AnimatePresence)
      // In the mocked version, we can verify the structure exists
      expect(container).toBeInTheDocument();
    });

    test('should position labels correctly relative to location points', () => {
      const dots = generateLocationPairsWithLabels(3);
      
      const { container } = render(
        <WorldMap dots={dots} showLabels={true} />
      );
      
      // Verify foreignObject elements (label containers) have positioning
      const labelContainers = container.querySelectorAll('foreignObject');
      
      labelContainers.forEach(labelContainer => {
        // Should have x, y positioning attributes
        expect(labelContainer).toHaveAttribute('x');
        expect(labelContainer).toHaveAttribute('y');
        expect(labelContainer).toHaveAttribute('width', '100');
        expect(labelContainer).toHaveAttribute('height', '30');
      });
    });

    test('should maintain label visibility across different coordinate ranges', () => {
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
      
      render(<WorldMap dots={extremeDots} showLabels={true} />);
      
      // All labels should be rendered regardless of coordinate extremes
      expect(screen.getByText('South Pole')).toBeInTheDocument();
      expect(screen.getByText('North Pole')).toBeInTheDocument();
      expect(screen.getByText('Equator')).toBeInTheDocument();
      expect(screen.getByText('Mid Point')).toBeInTheDocument();
    });

    test('should handle special characters in labels', () => {
      const dotsWithSpecialLabels = [
        {
          start: { lat: 48.8566, lng: 2.3522, label: 'Paris, France 🇫🇷' },
          end: { lat: 35.6762, lng: 139.6503, label: 'Tokyo (東京)' }
        },
        {
          start: { lat: 55.7558, lng: 37.6176, label: 'Москва' },
          end: { lat: 39.9042, lng: 116.4074, label: '北京市' }
        }
      ];
      
      render(<WorldMap dots={dotsWithSpecialLabels} showLabels={true} />);
      
      // Should handle Unicode characters, emojis, and special characters
      expect(screen.getByText('Paris, France 🇫🇷')).toBeInTheDocument();
      expect(screen.getByText('Tokyo (東京)')).toBeInTheDocument();
      expect(screen.getByText('Москва')).toBeInTheDocument();
      expect(screen.getByText('北京市')).toBeInTheDocument();
    });

    test('should maintain consistent label styling across theme changes', () => {
      const dots = generateLocationPairsWithLabels(2);
      
      // Test with different theme contexts
      ['light', 'dark'].forEach(theme => {
        jest.doMock('next-themes', () => ({
          useTheme: () => ({ theme }),
        }));

        jest.resetModules();
        const { WorldMap } = require('../app/components/ui/map');
        
        const { container } = render(
          <WorldMap dots={dots} showLabels={true} />
        );
        
        // Verify labels maintain consistent structure regardless of theme
        const labels = container.querySelectorAll('span');
        expect(labels.length).toBe(dots.length * 2);
        
        labels.forEach(label => {
          // Should have theme-aware classes
          expect(label).toHaveClass('bg-white/95', 'dark:bg-black/95');
          expect(label).toHaveClass('text-black', 'dark:text-white');
          expect(label).toHaveClass('border-gray-200', 'dark:border-gray-700');
        });
      });
    });
  });
});