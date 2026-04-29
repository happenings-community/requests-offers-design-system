import { browser } from '$app/environment';

export async function loadRegistry(): Promise<void> {
  if (browser) {
    await import('../../registry/index.js');
  }
}
