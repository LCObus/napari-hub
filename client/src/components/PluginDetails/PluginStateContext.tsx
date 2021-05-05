import { createContext, useContext } from 'react';
import { ReactNode } from 'react-markdown';

import { PluginData } from '@/types';

/**
 * Shared state for plugin data.
 */
interface PluginState {
  plugin: PluginData;
}

const PluginStateContext = createContext<PluginState | null>(null);

interface Props {
  children: ReactNode;
  plugin: PluginData;
}

/**
 * Provider for plugin state.  This allows child components to access the
 * plugin state directly from context so that we don't have to pass the
 * `plugin` prop around everywhere.
 */
export function PluginStateProvider({ children, plugin }: Props) {
  return (
    <PluginStateContext.Provider value={{ plugin }}>
      {children}
    </PluginStateContext.Provider>
  );
}

/**
 * Hook for accessing the plugin state context.  This allows components to
 * access the plugin data from anywhere.
 *
 * @returns The plugin state
 */
export function usePluginState(): PluginState {
  const context = useContext(PluginStateContext);

  if (!context) {
    throw new Error('usePluginState must be used in a PluginStateProvider');
  }

  return context;
}
