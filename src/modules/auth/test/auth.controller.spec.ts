import { AuthController } from '../auth.controller'
import { AuthResponse } from '../interfaces'
import { AuthService } from '../auth.service'
import { RoleEnum } from '../../roles/roles.enum'
import { Test, TestingModule } from '@nestjs/testing'
import { ValidateTokenRoleDto } from '../dto/validate-token-role.dto'
import { tokensStub } from './stubs/tokens.stub'
import { userStub } from './stubs/user.stub'
import { verifyEmailDto } from '../dto/verify-email.dto'

jest.mock('../auth.service')

describe('AuthController', () => {
  let controller: AuthController
  let authService: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    authService = module.get<AuthService>(AuthService)
    jest.clearAllMocks()
  })

  test('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('sign up', () => {
    describe('when sign up is called', () => {
      let authResponse: AuthResponse

      beforeEach(async () => {
        authResponse = await controller.register({
          email: 'test@test.com',
          dateOfBirth: '1990-01-01',
          firstName: 'test',
          lastName: 'test',
          password: 'test',
        })
      })

      test('should call AuthService.signUp', () => {
        expect(authService.signUp).toBeCalled()
      })

      test('should return an authResponse', () => {
        expect(authResponse).toEqual(authResponse)
      })
    })
  })

  describe('sign in', () => {
    describe('when sign in is called', () => {
      let authResponse: AuthResponse

      beforeEach(async () => {
        authResponse = await controller.signinLocal({
          email: 'test@test.com',
          password: 'test',
        })
      })

      test('should call AuthService.signIn', () => {
        expect(authService.signIn).toBeCalled()
      })

      test('should return an authResponse', () => {
        expect(authResponse).toEqual(authResponse)
      })
    })
  })

  describe('logout', () => {
    describe('when logout is called', () => {
      let result: boolean
      const userId = userStub()._id.toString()
      beforeEach(async () => {
        result = await controller.logout(userId)
      })

      test('should call AuthService.logout', () => {
        expect(authService.logout).toBeCalled()
      })

      test('should return true', () => {
        expect(result).toEqual(true)
      })
    })
  })

  describe('refresh tokens', () => {
    describe('when refresh tokens is called', () => {
      let tokens: AuthResponse
      const userId = userStub()._id.toString()
      const refreshToken = tokensStub().refresh_token
      beforeEach(async () => {
        tokens = await controller.refreshTokens(userId, refreshToken)
      })

      test('should call AuthService.refreshTokens', () => {
        expect(authService.refreshTokens).toBeCalled()
      })

      test('should return an authResponse', () => {
        expect(tokens).toEqual(tokens)
      })
    })
  })

  describe('verify email', () => {
    describe('when verify email is called', () => {
      let result: boolean
      const verifyEmailDto: verifyEmailDto = {
        token: 'test',
      }

      beforeEach(async () => {
        result = await controller.verifyEmail(verifyEmailDto)
      })

      test('should call AuthService.verifyEmail', () => {
        expect(authService.verifyEmail).toBeCalled()
      })

      test('should return true', () => {
        expect(result).toEqual(true)
      })
    })
  })

  describe('resend verification email', () => {
    describe('when resend verification email is called', () => {
      let result: boolean
      const email = 'test@test.com'

      beforeEach(async () => {
        result = await controller.resendVerificationEmail({ email })
      })

      test('should call AuthService.resendVerificationEmail', () => {
        expect(authService.resendVerificationEmail).toBeCalled()
      })

      test('should return true', () => {
        expect(result).toEqual(true)
      })
    })
  })

  describe('forgot password', () => {
    describe('when forgot password is called', () => {
      let result: boolean
      const email = 'test@test.com'

      beforeEach(async () => {
        result = await controller.forgotPassword({ email })
      })

      test('should call AuthService.forgotPassword', () => {
        expect(authService.forgotPassword).toBeCalled()
      })

      test('should return true', () => {
        expect(result).toEqual(true)
      })
    })
  })

  describe('reset password', () => {
    describe('when reset password is called', () => {
      let result: boolean

      const resetPasswordDto = {
        userId: userStub()._id.toString(),
        token: 'test',
        password: 'test',
      }

      beforeEach(async () => {
        result = await controller.resetPassword(resetPasswordDto)
      })

      test('should call AuthService.resetPassword', () => {
        expect(authService.resetPassword).toBeCalled()
      })

      test('should return true', () => {
        expect(result).toEqual(true)
      })
    })
  })

  describe('validate-token-role', () => {
    describe('when validate-token-role is called', () => {
      let result: boolean

      const validateTokenRoleDto: ValidateTokenRoleDto = {
        token: 'test',
        alloweRoles: [RoleEnum.ADMIN],
      }

      beforeEach(async () => {
        result = await controller.validateTokenRole(validateTokenRoleDto)
      })

      test('should call AuthService.validateTokenRole', () => {
        expect(authService.validateTokenRole).toBeCalled()
      })

      test('should return true', () => {
        expect(result).toEqual(true)
      })
    })
  })
})
