/**
 * Custom hook for API calls
 * Provides consistent API calling with loading states, error handling, and retry logic
 */

import { useState, useCallback } from 'react';
import { logError, logInfo } from '@/services/logger';
import { config } from '@/config/environment';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface ApiOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

interface UseApiReturn<T> extends ApiState<T> {
  execute: (url?: string, options?: RequestInit) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T = any>(
  initialUrl?: string,
  options: ApiOptions = {}
): UseApiReturn<T> {
  const {
    retries = 3,
    retryDelay = 1000,
    timeout = config.connection.timeout
  } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null
  });

  const execute = useCallback(async (
    url: string = initialUrl || '',
    requestOptions: RequestInit = {}
  ): Promise<T | null> => {
    if (!url) {
      setState(prev => ({ ...prev, error: 'No URL provided' }));
      return null;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...requestOptions.headers
      },
      ...requestOptions
    };

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...defaultOptions,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        setState({
          data,
          loading: false,
          error: null
        });

        logInfo('API call successful', { url, attempt: attempt + 1 });
        return data;

      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        
        logError('API call failed', lastError, {
          url,
          attempt: attempt + 1,
          retries
        });

        if (attempt < retries) {
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
        }
      }
    }

    setState(prev => ({
      ...prev,
      loading: false,
      error: lastError?.message || 'Unknown error occurred'
    }));

    return null;
  }, [initialUrl, retries, retryDelay, timeout]);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null
    });
  }, []);

  return {
    ...state,
    execute,
    reset
  };
}
