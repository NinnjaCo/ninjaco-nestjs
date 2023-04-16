import { User } from '../../users/schemas/user.schema'

export type Tokens = {
  access_token: string
  refresh_token: string
}

export type JwtPayload = {
  sub: string
}

export type AuthResponse = {
  user: Partial<User>
  access_token: string
  refresh_token: string
}
export type JwtPayloadWithRt = JwtPayload & { refreshToken: string }
