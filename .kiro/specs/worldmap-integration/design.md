# Design Document: WorldMap Integration

## Overview

This design outlines the integration of an interactive WorldMap component to replace the existing WorkExperience section in the portfolio. The component will showcase global network connections through animated paths and interactive location points, maintaining the existing design language while adding engaging visual elements.

## Architecture

### Component Structure
```
app/components/ui/map.tsx          # Main WorldMap component
app/components/experience/         # Updated section (reused directory)
  └── GlobalNetwork.tsx           # Section wrapper component
app/page.tsx                      # Updated to use GlobalNetwork instead of WorkExperience
```

### Dependencies Integration
- **dotted-map**: Generates the world map SVG background
- **framer-motion**: Handles animations and interactions (already installed)
- **next-themes**: Provides theme context for light/dark mode (already installed)
- **next/image**: Optimized image rendering for the map SVG

## Components and Interfaces

### WorldMap Component Interface
```typescript
interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  showLabels?: boolean;
  labelClassName?: string;
  animationDuration?: number;
  loop?: boolean;
}
```

### GlobalNetwork Section Component
```typescript
interface GlobalNetworkProps {
  title?: string;
  description?: string;
  mapProps?: MapProps;
}
```

## Data Models

### Location Data Structure
```typescript
interface LocationPoint {
  lat: number;        // Latitude coordinate
  lng: number;        // Longitude coordinate  
  label?: string;     // Display name for the location
}

interface ConnectionPath {
  start: LocationPoint;  // Starting location
  end: LocationPoint;    // Destination location
}
```

### Default Connection Data
The component will use meaningful global connections representing professional network reach:
- North America: Fairbanks → Los Angeles
- Americas: Fairbanks → Brasília  
- Atlantic: Brasília → Lisbon
- Europe-Asia: London → New Delhi
- Asia-Pacific: New Delhi → Vladivostok
- Africa: New Delhi → Nairobi

## Animation System

### Path Animation Sequence
1. **Staggered Entry**: Each connection path animates with 0.3s delay between paths
2. **Curved Paths**: Bezier curves create natural connection arcs
3. **Moving Indicators**: Animated dots travel along paths during animation
4. **Loop Behavior**: Continuous animation cycle with pause between iterations

### Timing Configuration
- **Animation Duration**: 2 seconds per path
- **Stagger Delay**: 0.3 seconds between path starts
- **Pause Duration**: 2 seconds between animation cycles
- **Total Cycle**: ~4.5 seconds (including all paths + pause)

### Visual Effects
- **Gradient Paths**: Fade-in/fade-out effect on connection lines
- **Pulsing Points**: Animated circles at location markers
- **Glow Effects**: SVG filters for enhanced visual appeal
- **Hover States**: Scale animations on location point interaction

## Theme Integration

### Dark Mode Support
- **Map Background**: Black background with yellow-tinted dots
- **Connection Lines**: Configurable color (default: sky blue #0ea5e9)
- **Labels**: Adaptive background (white/95% opacity in light, black/95% in dark)
- **Borders**: Theme-aware border colors for labels

### Light Mode Support  
- **Map Background**: White background with gray-tinted dots
- **Connection Lines**: Same configurable color system
- **Labels**: Consistent styling with theme-appropriate colors

## Responsive Design

### Breakpoint Behavior
- **Mobile**: 2:1 aspect ratio, bottom-positioned tooltips
- **Tablet**: 2.5:1 aspect ratio, hover tooltips
- **Desktop**: 2:1 aspect ratio, full interactive experience

### Mobile Optimizations
- **Touch Interactions**: Proper touch event handling
- **Tooltip Positioning**: Fixed bottom positioning to avoid overlap
- **Performance**: Optimized animation performance for mobile devices

## Error Handling

### Dependency Management
- **Missing dotted-map**: Clear error message with installation instructions
- **Theme Context**: Graceful fallback to light theme if context unavailable
- **Image Loading**: Fallback handling for SVG map generation failures

### Data Validation
- **Invalid Coordinates**: Clamp latitude/longitude to valid ranges
- **Missing Labels**: Generate default labels for unlabeled locations
- **Empty Dots Array**: Display static world map without connections

## Testing Strategy

### Unit Tests
- Component rendering with various prop combinations
- Coordinate projection calculations
- Path generation algorithms
- Theme switching behavior
- Responsive breakpoint handling

### Integration Tests
- Theme provider integration
- Animation timing and sequencing
- User interaction handling (hover, touch)
- Mobile tooltip positioning

### Visual Regression Tests
- Screenshot comparisons across themes
- Animation state captures
- Responsive layout verification

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Connection Line Rendering and Animation
*For any* array of location pairs, the WorldMap component should render curved SVG paths between each pair and animate them with staggered timing when loop mode is enabled.
**Validates: Requirements 1.2, 3.1, 3.4**

### Property 2: Interactive Label Display
*For any* location point with hover interaction, the component should display the location label with smooth animations, and on mobile devices, tooltips should appear at the bottom of the component.
**Validates: Requirements 1.3, 4.2**

### Property 3: Theme Adaptation
*For any* theme state (light or dark), the WorldMap component should render with appropriate colors, backgrounds, and styling that matches the current theme.
**Validates: Requirements 1.5**

### Property 4: Animation System Completeness
*For any* connection path in loop mode, the component should display pulsing location points, moving dots along paths, and continuous animation cycles.
**Validates: Requirements 3.2, 3.3, 3.5**

### Property 5: Responsive Design Consistency
*For any* viewport size, the component should maintain proper aspect ratios, use responsive sizing for elements, and handle touch interactions appropriately on mobile devices.
**Validates: Requirements 4.1, 4.3, 4.4**

### Property 6: Location Label Validity
*For any* location data with labels, the displayed labels should be non-empty, readable strings that accurately represent the location names.
**Validates: Requirements 5.2**