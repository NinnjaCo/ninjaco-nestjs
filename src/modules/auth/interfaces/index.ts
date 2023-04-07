import { ApiProperty } from '@nestjs/swagger'
import { User } from 'modules/users/schemas/user.schema'

// Use Class instead of Interface because of the @ApiProperty decorator

export class Tokens {
  @ApiProperty()
  access_token: string
  @ApiProperty()
  refresh_token: string
}

export class JwtPayload {
  @ApiProperty()
  sub: string
  @ApiProperty()
  role_id: string
}

export class AuthResponse {
  @ApiProperty()
  user: Partial<User>
  @ApiProperty()
  access_token: string
  @ApiProperty()
  refresh_token: string
}

export class JwtPayloadWithRt extends JwtPayload {
  @ApiProperty()
  refreshToken: string
}
