declare module 'next-pwa' {
  import type { NextConfig } from 'next';

  type PWAPluginOptions = Record<string, unknown>;
  type WithPWA = (pluginOptions?: PWAPluginOptions) => (config: NextConfig) => NextConfig;

  const withPWA: WithPWA;
  export default withPWA;
}
