import registryJson from './registry.json';
import type { Registry, RegistryItem } from '../../scripts/sync-from-skill/types';

const registry = registryJson as unknown as Registry;

export function useRegistry(): Registry {
  return registry;
}

export function useItem(id: string): RegistryItem | undefined {
  return registry.items.find((i) => i.id === id);
}

export function isRegistryMissing(r: Registry): boolean {
  return !r || !Array.isArray(r.items) || r.items.length === 0;
}
