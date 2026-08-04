/**
 * Helpers used by DsImage / DsAvatar / uploads.
 */
export async function getImageApi(url?: string | null): Promise<string> {
  if (!url) return '';
  // Showcase: treat absolute URLs as-is; relative paths stay unresolved.
  if (/^https?:\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }
  return url;
}

export async function uploadGeneralFiles(_files: File[]): Promise<unknown[]> {
  return [];
}
