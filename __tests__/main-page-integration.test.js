/**
 * Main Page Integration Tests
 * 
 * Tests that verify the GlobalNetwork component is properly integrated
 * into the main page structure, replacing WorkExperience.
 */

describe('Main Page Integration', () => {
  test('Home component imports GlobalNetwork instead of WorkExperience', () => {
    const fs = require('fs');
    const path = require('path');
    
    const homeContent = fs.readFileSync(
      path.join(__dirname, '../app/components/Home.jsx'),
      'utf8'
    );
    
    // Should import GlobalNetwork
    expect(homeContent).toContain('import("./experience/GlobalNetwork")');
    
    // Should use GlobalNetwork component
    expect(homeContent).toContain('<GlobalNetwork />');
    
    // Should NOT import WorkExperience
    expect(homeContent).not.toContain('import("./experience/WorkExperience")');
    
    // Should NOT use WorkExperience component
    expect(homeContent).not.toContain('<WorkExperience />');
  });

  test('GlobalNetwork maintains proper section ordering', () => {
    const fs = require('fs');
    const path = require('path');
    
    const homeContent = fs.readFileSync(
      path.join(__dirname, '../app/components/Home.jsx'),
      'utf8'
    );
    
    // Check component order
    const heroIndex = homeContent.indexOf('<HeroSection />');
    const globalNetworkIndex = homeContent.indexOf('<GlobalNetwork />');
    const teamIndex = homeContent.indexOf('<TeamSection />');
    
    expect(heroIndex).toBeLessThan(globalNetworkIndex);
    expect(globalNetworkIndex).toBeLessThan(teamIndex);
  });

  test('GlobalNetwork component file exists and exports correctly', () => {
    const fs = require('fs');
    const path = require('path');
    
    const globalNetworkPath = path.join(__dirname, '../app/components/experience/GlobalNetwork.tsx');
    expect(fs.existsSync(globalNetworkPath)).toBe(true);
    
    const globalNetworkContent = fs.readFileSync(globalNetworkPath, 'utf8');
    expect(globalNetworkContent).toContain('export default GlobalNetwork');
  });

  test('Section spacing and layout consistency maintained', () => {
    const fs = require('fs');
    const path = require('path');
    
    const globalNetworkContent = fs.readFileSync(
      path.join(__dirname, '../app/components/experience/GlobalNetwork.tsx'),
      'utf8'
    );
    
    // Check for consistent section styling
    expect(globalNetworkContent).toContain('py-24 lg:py-32');
    expect(globalNetworkContent).toContain('bg-[#1a0b2e]');
    expect(globalNetworkContent).toContain('max-w-7xl mx-auto');
  });
});