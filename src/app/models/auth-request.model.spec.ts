import { AuthRequest } from './auth-request.model';

describe('AuthRequest', () => {
  it('should create an instance', () => {
    expect(new AuthRequest("1", "2")).toBeTruthy();
  });
});
