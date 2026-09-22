/**
 * GitHub Pages project sites are served under a sub-path, and next/image does not
 * prepend `basePath` to string `src` values. Prefix public assets with this.
 */
const subPath = process.env.NEXT_PUBLIC_BASE_PATH;

export const BASE_PATH = subPath ? `/${subPath}` : "";

export const asset = (path: string) => `${BASE_PATH}${path}`;
