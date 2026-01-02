/**
 * Unit Tests for GlobalNetwork Component
 * 
 * Tests component rendering, content display, section title and description
 * **Validates: Requirements 5.4, 5.5**
 */

import { render, screen } from '@testing-library/react';
import GlobalNetwork from '../app/components/experience/GlobalNetwork';

// Mock the WorldMap component
jest.mock('../app/components/ui/map', () => ({
  WorldMap: ({ dots, lineColor, showLabels, animationDuration, loop }) => (
    <div data-testid="world-map" data-dots-count={dots?.length || 0}>
      Mock WorldMap Component
      <div data-testid="map-config">
        lineColor: {lineColor}, 
        showLabels: {showLabels?.toString()}, 
        animationDuration: {animationDuration}, 
        loop: {loop?.toString()}
      </div>
    </div>
  ),
}));

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
  },
}));

describe('GlobalNetwork Component', () => {
  describe('Component Rendering', () => {
    test('should render without crashing', () => {
      render(<GlobalNetwork />);
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    test('should render with default props', () => {
      render(<GlobalNetwork />);
      
      // Check default title
      expect(screen.getByText('Global Network')).toBeInTheDocument();
      
      // Check default description
      expect(screen.getByText(/Connect with teams and clients worldwide/)).toBeInTheDocument();
      
      // Check WorldMap is rendered
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
    });

    test('should render with custom props', () => {
      const customTitle = "Custom Global Network";
      const customDescription = "Custom description for global connectivity";
      const customMapProps = {
        lineColor: "#ff6b6b",
        showLabels: false,
        animationDuration: 3,
        loop: false
      };

      render(
        <GlobalNetwork 
          title={customTitle}
          description={customDescription}
          mapProps={customMapProps}
        />
      );
      
      // Check custom title
      expect(screen.getByText(customTitle)).toBeInTheDocument();
      
      // Check custom description
      expect(screen.getByText(customDescription)).toBeInTheDocument();
      
      // Check custom map props are passed through
      const mapConfig = screen.getByTestId('map-config');
      expect(mapConfig).toHaveTextContent('lineColor: #ff6b6b');
      expect(mapConfig).toHaveTextContent('showLabels: false');
      expect(mapConfig).toHaveTextContent('animationDuration: 3');
      expect(mapConfig).toHaveTextContent('loop: false');
    });
  });

  describe('Section Title and Description Display', () => {
    test('should display section title with correct styling', () => {
      render(<GlobalNetwork />);
      
      const title = screen.getByText('Global Network');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
      expect(title).toHaveClass('text-4xl', 'sm:text-5xl', 'lg:text-6xl');
      expect(title).toHaveClass('font-normal', 'text-white');
    });

    test('should display custom section title', () => {
      const customTitle = "My Professional Network";
      render(<GlobalNetwork title={customTitle} />);
      
      const title = screen.getByText(customTitle);
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
    });

    test('should display section description with correct styling', () => {
      render(<GlobalNetwork />);
      
      const description = screen.getByText(/Connect with teams and clients worldwide/);
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-sm', 'md:text-lg', 'text-neutral-400');
    });

    test('should display custom section description', () => {
      const customDescription = "Building bridges across continents through technology and collaboration.";
      render(<GlobalNetwork description={customDescription} />);
      
      const description = screen.getByText(customDescription);
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
    });

    test('should display statistics section', () => {
      render(<GlobalNetwork />);
      
      // Check for statistics
      expect(screen.getByText('6+')).toBeInTheDocument();
      expect(screen.getByText('Global Connections')).toBeInTheDocument();
      expect(screen.getByText('24/7')).toBeInTheDocument();
      expect(screen.getByText('Worldwide Availability')).toBeInTheDocument();
      expect(screen.getByText('∞')).toBeInTheDocument();
      expect(screen.getByText('Limitless Collaboration')).toBeInTheDocument();
    });
  });

  describe('WorldMap Integration', () => {
    test('should pass correct connection data to WorldMap', () => {
      render(<GlobalNetwork />);
      
      const worldMap = screen.getByTestId('world-map');
      expect(worldMap).toHaveAttribute('data-dots-count', '6');
    });

    test('should pass default map configuration', () => {
      render(<GlobalNetwork />);
      
      const mapConfig = screen.getByTestId('map-config');
      expect(mapConfig).toHaveTextContent('lineColor: #0ea5e9');
      expect(mapConfig).toHaveTextContent('showLabels: true');
      expect(mapConfig).toHaveTextContent('animationDuration: 2');
      expect(mapConfig).toHaveTextContent('loop: true');
    });

    test('should override map configuration with custom props', () => {
      const customMapProps = {
        lineColor: "#purple",
        showLabels: false,
        animationDuration: 5,
        loop: false
      };

      render(<GlobalNetwork mapProps={customMapProps} />);
      
      const mapConfig = screen.getByTestId('map-config');
      expect(mapConfig).toHaveTextContent('lineColor: #purple');
      expect(mapConfig).toHaveTextContent('showLabels: false');
      expect(mapConfig).toHaveTextContent('animationDuration: 5');
      expect(mapConfig).toHaveTextContent('loop: false');
    });
  });

  describe('Section Structure and Styling', () => {
    test('should maintain consistent section structure', () => {
      const { container } = render(<GlobalNetwork />);
      
      // Check section element with correct id and classes
      const section = container.querySelector('section#experience');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('relative', 'w-full', 'py-24', 'lg:py-32', 'bg-[#1a0b2e]');
    });

    test('should include background decorative elements', () => {
      const { container } = render(<GlobalNetwork />);
      
      // Check for background blur elements
      const blurElements = container.querySelectorAll('.blur-\\[120px\\]');
      expect(blurElements).toHaveLength(2);
      
      // Check for purple gradient backgrounds
      const purpleElements = container.querySelectorAll('[class*="bg-purple"]');
      expect(purpleElements.length).toBeGreaterThan(0);
    });

    test('should have proper responsive container', () => {
      const { container } = render(<GlobalNetwork />);
      
      const mainContainer = container.querySelector('.max-w-7xl');
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
    });

    test('should maintain z-index layering', () => {
      const { container } = render(<GlobalNetwork />);
      
      const contentContainer = container.querySelector('.relative.z-10');
      expect(contentContainer).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('should have proper heading hierarchy', () => {
      render(<GlobalNetwork />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Global Network');
    });

    test('should have semantic section structure', () => {
      const { container } = render(<GlobalNetwork />);
      
      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('id', 'experience');
    });

    test('should provide meaningful text content', () => {
      render(<GlobalNetwork />);
      
      // Check that descriptive text is present and meaningful
      expect(screen.getByText(/Connect with teams and clients worldwide/)).toBeInTheDocument();
      expect(screen.getByText(/Global Connections/)).toBeInTheDocument();
      expect(screen.getByText(/Worldwide Availability/)).toBeInTheDocument();
      expect(screen.getByText(/Limitless Collaboration/)).toBeInTheDocument();
    });
  });

  describe('Error Handling', () => {
    test('should handle missing props gracefully', () => {
      render(<GlobalNetwork title="" description="" />);
      
      // Should still render the component structure
      expect(screen.getByTestId('world-map')).toBeInTheDocument();
      
      // Should handle empty strings
      const { container } = render(<GlobalNetwork title="" description="" />);
      expect(container.querySelector('h2')).toBeInTheDocument();
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    test('should handle undefined mapProps', () => {
      render(<GlobalNetwork mapProps={undefined} />);
      
      // Should still render with default map configuration
      const mapConfig = screen.getByTestId('map-config');
      expect(mapConfig).toHaveTextContent('lineColor: #0ea5e9');
    });
  });
});