/**
 * Slim shared-utils surface used by the design system + layouts.
 * Avoids the full ICE utils barrel (API / i18n / services graph).
 */
export function formatPhoneNumber(input?: {
  phone?: string | number;
  code?: string | number;
  formValue?: string;
  displayVersion?: string;
}): { phone: string; code: string; formValue: string; display: string } {
  const phone = String(input?.phone ?? '');
  const code = String(input?.code ?? '');
  const formValue = input?.formValue ?? (code ? `${code}_${phone}` : phone);
  return { phone, code, formValue, display: code ? `+${code} ${phone}` : phone };
}

export function fileTypeByUrl(fileUrl = '') {
  return fileUrl?.split('.').pop() || '';
}

export function fileFormat(fileUrl: string | null | undefined): string {
  const ext = fileTypeByUrl(fileUrl || '');
  if (['jpg', 'jpeg', 'gif', 'bmp', 'png', 'svg', 'webp'].includes(ext)) return 'image';
  if (ext === 'pdf') return 'pdf';
  return ext || 'file';
}

export function fileData(file: File | string | { name?: string; path?: string; preview?: string }) {
  if (typeof file === 'string') {
    return { name: file, path: file, preview: file, size: 0, type: '' };
  }
  if (file instanceof File) {
    return {
      name: file.name,
      path: file.name,
      preview: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
    };
  }
  return {
    name: file.name || '',
    path: file.path || '',
    preview: file.preview || '',
    size: 0,
    type: '',
  };
}

export function fileThumb(_fileUrl?: string) {
  return '';
}

export function getCurrentEcosystemBasePath() {
  return '/innovation';
}

export function getCurrentZoneBasePath() {
  return '/innovation/collaboration-zone';
}

export function toast(message: string, _severity: 'success' | 'error' | 'info' | 'warning' = 'info') {
  if (typeof console !== 'undefined') console.info(`[muira toast] ${message}`);
}
