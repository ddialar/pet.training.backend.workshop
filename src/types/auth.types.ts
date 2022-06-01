// ##############################################################
// #####                        JWT                         #####
// ##############################################################

export interface JwtPayload {
  sub: string
  username: string
}

export interface DecodedJwtToken extends JwtPayload {
  exp: number
  iat: number
}

// ##############################################################
// #####                       LOGIN                        #####
// ##############################################################

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}
