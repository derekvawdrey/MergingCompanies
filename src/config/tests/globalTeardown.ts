/**
 * Clean up test container reference after all tests.
 */
import { Container } from "inversify";

declare global {
  // eslint-disable-next-line no-var
  var __TEST_CONTAINER__: Container | undefined;
}

export default function globalTeardown(): void {
  if (global.__TEST_CONTAINER__) {
    global.__TEST_CONTAINER__.unbindAll();
    global.__TEST_CONTAINER__ = undefined;
  }
}
