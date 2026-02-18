/**
 * Jest globalSetup runs in a separate process (no Jest globals).
 * Container with mocks is created in setupTests.ts (Jest environment) instead.
 */
export default function globalSetup(): void {
  // No-op; container is initialized in setupTests.ts where jest.fn() is available
}
