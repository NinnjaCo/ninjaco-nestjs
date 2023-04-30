import { tokensStub } from '../test/stubs/tokens.stub'
import { userStub } from '../test/stubs/user.stub'

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue({ ...userStub(), ...tokensStub() }),
  signIn: jest.fn().mockResolvedValue({ ...userStub(), ...tokensStub() }),
  logout: jest.fn().mockResolvedValue(true),
  refreshTokens: jest.fn().mockResolvedValue({ ...userStub(), ...tokensStub() }),
  getTokens: jest.fn().mockResolvedValue({ ...tokensStub() }),
  forgotPassword: jest.fn().mockResolvedValue(true),
  resetPassword: jest.fn().mockResolvedValue(true),
  validateTokenRole: jest.fn().mockResolvedValue(true),
  verifyEmail: jest.fn().mockResolvedValue(true),
  resendVerificationEmail: jest.fn().mockResolvedValue(true),
})
