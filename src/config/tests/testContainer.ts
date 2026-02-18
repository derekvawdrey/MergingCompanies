import { Container } from "inversify";

declare global {
  // eslint-disable-next-line no-var
  var __TEST_CONTAINER__: Container | undefined;
}

export function getTestContainer(): Container {
  const container = global.__TEST_CONTAINER__;
  if (!container) {
    throw new Error("Test container not initialized. Ensure Jest globalSetup has run.");
  }
  return container;
}
