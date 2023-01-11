export interface JwtTokenInterface {
  sub: string, //e-mail
  iat: number,
  exp: number,
  roles: string[]
}
