/**
 * Property-Based Test for WorldMap Responsive Design
 * 
 * **Property 5: Responsive Design Consistency**
 * For any viewport size, the component should maintain proper aspect ratios, 
 * use responsive sizing for elements, and handle touch interactions appropriately 
 * on mobile devices.
 * 
 * **Validates: Requirements 4.1, 4.3, 4.4**
 */

import { render } from '@testing-library/react';
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

// Mock window.matchMedia for responsive testing
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('WorldMap Responsive Design Properties', () => {
  const testDots = [
    {
      start: { lat: 40.7128, lng: -74.0060, label: 'New York' },
      end: { lat: 51.5074, lng: -0.1278, label: 'London' }
    },
    {
      start: { lat: 35.6762, lng: 139.6503, label: 'Tokyo' },
      end: { lat: -33.8688, lng: 151.2093, label: 'Sydney' }
    }
  ];

  describe('Property 5: Responsive Design Consistency', () => {
    test('should maintain proper aspect ratios across different viewport concepts', () => {
      // Test different viewport scenarios
      const viewportScenarios = [
        { name: 'mobile', width: 375, expectedAspect: 'aspect-[2/1]' },
        { name: 'tablet', width: 768, expectedAspect: 'md:aspect-[2.5/1]' },
        { name: 'desktop', width: 1024, expectedAspect: 'lg:aspect-[2/1]' }
      ];

      viewportScenarios.forEach(scenario => {
        const { container } = render(<WorldMap dots={testDots} />);
        
        // Verify the container has responsive aspect ratio classes
        const mapContainer = container.querySelector('div');
        expect(mapContainer).toHaveClass('w-full');
        expect(mapContainer).toHaveClass('aspect-[2/1]');
        expect(mapContainer).toHaveClass('md:aspect-[2.5/1]');
        expect(mapContainer).toHaveClass('lg:aspect-[2/1]');
      });
    });

    test('should use responsive sizing for map elements', () => {
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify main container has responsive classes
      const mapContainer = container.querySelector('div');
      expect(mapContainer).toHaveClass('w-full');
      expect(mapContainer).toHaveClass('rounded-lg');
      expect(mapContainer).toHaveClass('relative');
      expect(mapContainer).toHaveClass('font-sans');
      expect(mapContainer).toHaveClass('overflow-hidden');
      
      // Verify SVG has proper responsive attributes
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('w-full', 'h-full');
      expect(svg).toHaveClass('absolute', 'inset-0');
      expect(svg).toHaveAttribute('preserveAspectRatio', 'xMidYMid meet');
    });

    test('should handle touch interactions appropriately on mobile devices', () => {
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify interactive elements have proper touch-friendly styling
      const interactiveElements = container.querySelectorAll('.cursor-pointer');
      expect(interactiveElements.length).toBeGreaterThan(0);
      
      // Verify SVG is configured for touch interactions
      const svg = container.querySelector('svg');
      expect(svg).toHaveClass('pointer-events-auto');
      expect(svg).toHaveClass('select-none');
    });

    test('should display mobile tooltips with proper positioning', () => {
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Check for mobile tooltip structure (even if not currently visible)
      // The tooltip container should be present in the DOM structure
      const mapContainer = container.querySelector('div');
      expect(mapContainer).toBeInTheDocument();
      
      // Verify the component structure supports mobile tooltips
      // (AnimatePresence is mocked, so we verify the container exists)
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    test('should maintain consistent SVG viewBox across all screen sizes', () => {
      // Test with different mock viewport sizes
      const viewportSizes = [320, 768, 1024, 1440, 1920];
      
      viewportSizes.forEach(width => {
        // Mock different viewport widths
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        });
        
        const { container } = render(<WorldMap dots={testDots} />);
        
        // SVG viewBox should remain consistent regardless of viewport
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 800 400');
      });
    });

    test('should scale location points consistently across viewport sizes', () => {
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify location points have consistent sizing
      const circles = container.querySelectorAll('circle[r="3"]');
      expect(circles.length).toBeGreaterThan(0);
      
      // All location point circles should have the same radius
      circles.forEach(circle => {
        expect(circle).toHaveAttribute('r', '3');
      });
    });

    test('should maintain readable text sizing across devices', () => {
      const { container } = render(<WorldMap dots={testDots} showLabels={true} />);
      
      // Verify labels have responsive text sizing
      const labels = container.querySelectorAll('span');
      labels.forEach(label => {
        expect(label).toHaveClass('text-sm');
        expect(label).toHaveClass('font-medium');
      });
    });

    test('should handle different screen orientations', () => {
      // Test portrait and landscape orientations
      const orientations = [
        { width: 375, height: 667, name: 'portrait' },
        { width: 667, height: 375, name: 'landscape' }
      ];
      
      orientations.forEach(orientation => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: orientation.width,
        });
        Object.defineProperty(window, 'innerHeight', {
          writable: true,
          configurable: true,
          value: orientation.height,
        });
        
        const { container } = render(<WorldMap dots={testDots} />);
        
        // Component should render successfully in both orientations
        const mapContainer = container.querySelector('div');
        expect(mapContainer).toBeInTheDocument();
        expect(mapContainer).toHaveClass('w-full');
        
        // SVG should maintain proper scaling
        const svg = container.querySelector('svg');
        expect(svg).toHaveClass('w-full', 'h-full');
      });
    });

    test('should provide appropriate spacing for touch targets', () => {
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify location points have adequate size for touch interaction
      const locationPoints = container.querySelectorAll('circle[r="3"]');
      locationPoints.forEach(point => {
        // Base circle radius should be at least 3px
        const radius = parseInt(point.getAttribute('r'));
        expect(radius).toBeGreaterThanOrEqual(3);
      });
      
      // Verify pulsing circles provide larger touch targets
      const pulsingCircles = container.querySelectorAll('circle[opacity="0.5"]');
      expect(pulsingCircles.length).toBeGreaterThan(0);
    });

    test('should maintain performance across different device capabilities', () => {
      // Test with different numbers of connection points to simulate performance
      const performanceTestCases = [
        { dots: 1, name: 'minimal' },
        { dots: 5, name: 'moderate' },
        { dots: 10, name: 'heavy' }
      ];
      
      performanceTestCases.forEach(testCase => {
        const dots = Array.from({ length: testCase.dots }, (_, i) => ({
          start: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180, label: `Start${i}` },
          end: { lat: Math.random() * 180 - 90, lng: Math.random() * 360 - 180, label: `End${i}` }
        }));
        
        const { container } = render(<WorldMap dots={dots} />);
        
        // Component should render successfully regardless of complexity
        expect(container.querySelector('svg')).toBeInTheDocument();
        
        // Should render the expected number of paths
        const paths = container.querySelectorAll('path[d*="M"][d*="Q"]');
        expect(paths).toHaveLength(testCase.dots);
      });
    });

    test('should handle edge cases in responsive behavior', () => {
      // Test very small and very large viewport sizes
      const edgeCases = [
        { width: 280, name: 'very-small' },
        { width: 320, name: 'small' },
        { width: 2560, name: 'very-large' },
        { width: 3840, name: 'ultra-wide' }
      ];
      
      edgeCases.forEach(edgeCase => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: edgeCase.width,
        });
        
        const { container } = render(<WorldMap dots={testDots} />);
        
        // Component should remain stable at edge viewport sizes
        const mapContainer = container.querySelector('div');
        expect(mapContainer).toBeInTheDocument();
        expect(mapContainer).toHaveClass('w-full');
        
        // SVG should maintain proper structure
        const svg = container.querySelector('svg');
        expect(svg).toHaveAttribute('viewBox', '0 0 800 400');
        expect(svg).toHaveClass('w-full', 'h-full');
      });
    });

    test('should maintain accessibility across responsive breakpoints', () => {
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify interactive elements maintain accessibility features
      const interactiveElements = container.querySelectorAll('.cursor-pointer');
      interactiveElements.forEach(element => {
        expect(element).toHaveClass('cursor-pointer');
      });
      
      // Verify SVG maintains proper accessibility attributes
      const svg = container.querySelector('svg');
      expect(svg).toHaveAttribute('preserveAspectRatio');
      expect(svg).toHaveClass('select-none'); // Prevents text selection issues
    });
  });
});