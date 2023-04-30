import { Tokens } from 'modules/auth/types'

export const tokensStub: () => Tokens = () => ({
  access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  refresh_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
})
