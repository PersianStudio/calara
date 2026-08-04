import { resolve } from 'node:path';
import type { AliasOptions } from 'vite';

const root = resolve(__dirname);

/** Map ICE monorepo package names onto calara copies / adapters. */
export const iceAliases: AliasOptions = [
  { find: '@ice-web-app/designSystem', replacement: resolve(root, 'src') },
  { find: '@persianstudio/calara', replacement: resolve(root, 'src/index.ts') },
  { find: '@ice-web-app/assets', replacement: resolve(root, 'vendor/assets') },
  { find: '@ice-web-app/shared-types', replacement: resolve(root, 'src/types') },
  { find: '@ice-web-app/shared-constants', replacement: resolve(root, 'src/constants') },
  { find: '@ice-web-app/shared-utils-ssr', replacement: resolve(root, 'src/adapters/utils-ssr.ts') },
  { find: '@ice-web-app/shared-utils', replacement: resolve(root, 'src/adapters/utils.ts') },
  { find: '@ice-web-app/shared-hooks', replacement: resolve(root, 'src/adapters/hooks.tsx') },
  { find: '@ice-web-app/shared-helpers', replacement: resolve(root, 'src/adapters/helpers.ts') },
  { find: '@ice-web-app/shared-ui', replacement: resolve(root, 'src/adapters/ui.tsx') },
  { find: '@ice-web-app/shared-services', replacement: resolve(root, 'src/adapters/services.ts') },
  { find: '@ice-web-app/shared-i18n-file', replacement: resolve(root, 'src/adapters/i18n.ts') },
  { find: '@configs/themeConfig', replacement: resolve(root, 'src/materio/configs/themeConfig.ts') },
];
