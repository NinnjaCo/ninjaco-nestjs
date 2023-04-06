import { ApiQuery } from '@nestjs/swagger'
import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { JwtPayloadWithRt } from '../../modules/auth/types'

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    if (!data) return request.user
    return request.user[data]
  },
  [
    // Here it is. Use the `@ApiQuery` decorator purely as a function to define the meta only once here.
    (target, key) => {
      ApiQuery({
        name: 'refreshToken',
        schema: { type: 'string' },
        required: true,
      })(target, key, Object.getOwnPropertyDescriptor(target, key))
    },
  ]
)
