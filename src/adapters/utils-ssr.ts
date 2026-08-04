/**
 * SSR / shared-utils-ssr stand-ins.
 */
export function translate(key: string, _opts?: Record<string, unknown>): string {
  return key;
}

export function getCookie(_name: string): string | undefined {
  return undefined;
}

export function handleStatus(_status?: number | string): string {
  return 'default';
}

export function getEnvVariable(name: string, fallback = ''): string {
  return (import.meta as { env?: Record<string, string> }).env?.[name] ?? fallback;
}

export function formatPhoneNumber(value: string): string {
  return value;
}

export function actionAfterApiErrors(_err?: unknown): void {
  /* no-op */
}
