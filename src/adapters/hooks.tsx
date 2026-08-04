/**
 * Stub / showcase implementations of @ice-web-app/shared-hooks.
 */
import { useMemo, useState, type ReactNode, type MouseEvent, createContext, useContext } from 'react';
import { useTranslation as useTranslationOriginal } from 'react-i18next';

export function useTranslation(ns?: string) {
  return useTranslationOriginal(ns || 'common');
}

export function useLanguage() {
  return { language: 'en', changeLanguage: async (_lng: string) => undefined };
}

export function useHasAccess(_permission?: unknown) {
  return true;
}

export function useAuth() {
  return {
    logout: async () => undefined,
    isAuthenticated: true,
    user: { id: 'demo', name: 'Muira Demo' },
  };
}

export function usePopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  return {
    open: Boolean(anchorEl),
    anchorEl,
    onOpen: (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget),
    onClose: () => setAnchorEl(null),
  };
}

export function useElementOnScreen(_opts?: unknown) {
  return { containerRef: { current: null }, isVisible: true };
}

export function useSearchQuery() {
  const [query, setQuery] = useState('');
  return { query, setQuery };
}

export function useApi<T = unknown>(_key?: string, _fetcher?: () => Promise<T>) {
  return {
    data: undefined as T | undefined,
    error: undefined,
    isLoading: false,
    isValidating: false,
    mutate: async () => undefined,
  };
}

export async function callApi<T = unknown>(_opts: unknown): Promise<T> {
  return undefined as T;
}

export function evictApiCache(_keys?: unknown) {
  /* no-op in showcase */
}

export function buildRequestHeaders() {
  return {};
}

export function createApiClient() {
  return {
    get: async () => ({ data: null }),
    post: async () => ({ data: null }),
  };
}

export function useCentrifugo() {
  return { connected: false, publish: () => undefined };
}

export function useCurrentUserOnlineStatus() {
  return { isOnline: true };
}

export function onlineStatusToBadgeColor(_status?: unknown) {
  return 'success' as const;
}

export function makeChannelName(name: string) {
  return name;
}

const PresenceCtx = createContext({ online: true });

export function UserOnlinePresenceProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => ({ online: true }), []);
  return <PresenceCtx.Provider value={value}>{children}</PresenceCtx.Provider>;
}

export function useUserOnlinePresence() {
  return useContext(PresenceCtx);
}

export function useTour(_opts?: unknown) {
  return {
    setTourProps: (_p: unknown) => undefined,
    tourProps: { isOpen: false },
  };
}
