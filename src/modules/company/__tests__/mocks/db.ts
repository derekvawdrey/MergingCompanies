export class MockDB {
  transaction = () => ({
    execute: jest.fn(),
  });
}
