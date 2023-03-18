import { Environment } from './environment';

describe('environment', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully return environment variable value', () => {
    expect(Environment.getNodeEnv()).toBeTruthy();
  });
});
