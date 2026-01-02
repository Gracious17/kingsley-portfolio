/**
 * Property-Based Test for WorldMap Theme Adaptation
 * 
 * **Property 3: Theme Adaptation**
 * For any theme state (light or dark), the WorldMap component should render 
 * with appropriate colors, backgrounds, and styling that matches the current theme.
 * 
 * **Validates: Requirements 1.5**
 */

import { render } from '@testing-library/react';
import { WorldMap } from '../app/components/ui/map';

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({ src, alt }) {
    return <img src={src} alt={alt} data-testid="world-map-image" />;
  };
});

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
    g: ({ children, ...props }) => <g {...props}>{children}</g>,
  },
  AnimatePresence: ({ children }) => children,
}));

// Mock dotted-map
jest.mock('dotted-map', () => {
  return jest.fn().mockImplementation(() => ({
    getSVG: jest.fn((options) => {
      // Return different SVG based on theme colors
      const color = options.color || '#00000040';
      const bg = options.backgroundColor || 'white';
      return `<svg style="background-color: ${bg}"><circle fill="${color}" cx="50" cy="50" r="1"/></svg>`;
    })
  }));
});

describe('WorldMap Theme Adaptation Properties', () => {
  const testDots = [
    {
      start: { lat: 40.7128, lng: -74.0060, label: 'New York' },
      end: { lat: 51.5074, lng: -0.1278, label: 'London' }
    }
  ];

  describe('Property 3: Theme Adaptation', () => {
    test('should adapt to light theme', () => {
      // Mock useTheme to return light theme
      jest.doMock('next-themes', () => ({
        useTheme: () => ({ theme: 'light' }),
      }));

      // Re-require the component to get the mocked theme
      jest.resetModules();
      const { WorldMap } = require('../app/components/ui/map');
      
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify component renders
      expect(container).toBeInTheDocument();
      
      // Verify light theme classes are applied
      const mapContainer = container.querySelector('div');
      expect(mapContainer).toHaveClass('bg-white');
      expect(mapContainer).not.toHaveClass('dark:bg-black');
    });

    test('should adapt to dark theme', () => {
      // Mock useTheme to return dark theme
      jest.doMock('next-themes', () => ({
        useTheme: () => ({ theme: 'dark' }),
      }));

      // Re-require the component to get the mocked theme
      jest.resetModules();
      const { WorldMap } = require('../app/components/ui/map');
      
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify component renders
      expect(container).toBeInTheDocument();
      
      // Verify dark theme classes are applied
      const mapContainer = container.querySelector('div');
      expect(mapContainer).toHaveClass('dark:bg-black');
      expect(mapContainer).toHaveClass('bg-white'); // Tailwind includes both classes
    });

    test('should handle undefined theme gracefully', () => {
      // Mock useTheme to return undefined theme
      jest.doMock('next-themes', () => ({
        useTheme: () => ({ theme: undefined }),
      }));

      // Re-require the component to get the mocked theme
      jest.resetModules();
      const { WorldMap } = require('../app/components/ui/map');
      
      const { container } = render(<WorldMap dots={testDots} />);
      
      // Verify component still renders without crashing
      expect(container).toBeInTheDocument();
      
      // Should still have base styling
      const mapContainer = container.querySelector('div');
      expect(mapContainer).toBeInTheDocument();
    });

    test('should apply theme-appropriate label styling', () => {
      const dotsWithLabels = [
        {
          start: { lat: 40.7128, lng: -74.0060, label: 'New York' },
          end: { lat: 51.5074, lng: -0.1278, label: 'London' }
        }
      ];

      // Test light theme labels
      jest.doMock('next-themes', () => ({
        useTheme: () => ({ theme: 'light' }),
      }));

      jest.resetModules();
      const { WorldMap } = require('../app/components/ui/map');
      
      const { container } = render(<WorldMap dots={dotsWithLabels} showLabels={true} />);
      
      // Verify labels have theme-appropriate classes
      const labels = container.querySelectorAll('span');
      labels.forEach(label => {
        expect(label).toHaveClass('bg-white/95');
        expect(label).toHaveClass('dark:bg-black/95');
        expect(label).toHaveClass('text-black');
        expect(label).toHaveClass('dark:text-white');
        expect(label).toHaveClass('border-gray-200');
        expect(label).toHaveClass('dark:border-gray-700');
      });
    });

    test('should maintain consistent styling across theme changes', () => {
      const themes = ['light', 'dark', undefined, 'system'];
      
      themes.forEach(theme => {
        // Mock different themes
        jest.doMock('next-themes', () => ({
          useTheme: () => ({ theme }),
        }));

        jest.resetModules();
        const { WorldMap } = require('../app/components/ui/map');
        
        const { container } = render(<WorldMap dots={testDots} />);
        
        // Verify basic structure is maintained regardless of theme
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('viewBox', '0 0 800 400');
        
        // Verify gradient definitions exist
        const gradient = container.querySelector('#path-gradient');
        expect(gradient).toBeInTheDocument();
        
        // Verify paths are rendered
        const paths = container.querySelectorAll('path[d*="M"][d*="Q"]');
        expect(paths.length).toBeGreaterThan(0);
      });
    });

    test('should apply consistent line colors across themes', () => {
      const customLineColor = '#ff6b6b';
      
      ['light', 'dark'].forEach(theme => {
        jest.doMock('next-themes', () => ({
          useTheme: () => ({ theme }),
        }));

        jest.resetModules();
        const { WorldMap } = require('../app/components/ui/map');
        
        const { container } = render(
          <WorldMap dots={testDots} lineColor={customLineColor} />
        );
        
        // Verify custom line color is applied regardless of theme
        const circles = container.querySelectorAll('circle[fill]');
        circles.forEach(circle => {
          if (circle.getAttribute('fill') !== 'transparent') {
            expect(circle.getAttribute('fill')).toBe(customLineColor);
          }
        });
      });
    });

    test('should handle rapid theme switching', () => {
      // Simulate rapid theme changes
      const themes = ['light', 'dark', 'light', 'dark', 'light'];
      
      themes.forEach((theme, index) => {
        jest.doMock('next-themes', () => ({
          useTheme: () => ({ theme }),
        }));

        jest.resetModules();
        const { WorldMap } = require('../app/components/ui/map');
        
        const { container } = render(<WorldMap dots={testDots} />);
        
        // Verify component remains stable during theme changes
        expect(container).toBeInTheDocument();
        
        const svg = container.querySelector('svg');
        expect(svg).toBeInTheDocument();
        
        // Verify no broken styling
        const mapContainer = container.querySelector('div');
        expect(mapContainer).toHaveClass('w-full');
        expect(mapContainer).toHaveClass('rounded-lg');
      });
    });
  });
});