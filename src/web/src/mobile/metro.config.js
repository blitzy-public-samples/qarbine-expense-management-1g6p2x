/**
 * Metro configuration for React Native
 * https://github.com/facebook/metro
 *
 * This configuration file customizes the Metro bundler for the React Native mobile application.
 * It defines settings and optimizations that enhance the build process, manage asset loading,
 * and ensure compatibility with various modules and libraries used within the mobile app.
 *
 * Requirements Addressed:
 * - Mobile Features (Technical Specification/13.8 Mobile Features)
 *   - Enhances the mobile experience for users on iOS and Android devices by ensuring proper asset handling,
 *     including images and SVG files, which are essential for UI components in offline scenarios.
 *
 * Location in Documentation: Technical Specification/13.8 Mobile Features
 */

const { getDefaultConfig } = require('metro-config'); // Importing metro-config package (version 0.66.2)

/**
 * Retrieves the default configuration for the Metro bundler, allowing customization
 * of asset extensions and module resolution.
 *
 * Steps:
 * 1. Import the metro-config package.
 * 2. Define additional asset extensions such as 'svg', 'png', and 'jpg'.
 * 3. Merge the default configuration with custom settings.
 * 4. Return the customized configuration object.
 */

module.exports = (async () => {
  // Step 1: Retrieve the default Metro configuration
  const defaultConfig = await getDefaultConfig();

  // Step 2: Extract existing asset extensions from the default configuration
  const { assetExts } = defaultConfig.resolver;

  // Step 2: Define additional asset extensions based on project requirements
  const additionalAssetExts = ['svg', 'png', 'jpg']; // Globals: assetExts: ['svg', 'png', 'jpg']

  // Step 3: Merge default asset extensions with additional ones
  defaultConfig.resolver.assetExts = [...assetExts, ...additionalAssetExts];

  // Step 4: Return the customized configuration object
  return defaultConfig;
})();