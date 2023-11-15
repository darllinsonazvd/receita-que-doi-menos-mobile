import { JwtDecode } from '../types/jwt'

/**
 * Verificar tempo de expiração do token
 *
 * @author Darllinson Azevedo
 *
 * @param decodedToken Token
 */
export function verifyTokenExpirationTime(decodedToken: JwtDecode) {
  const now = Math.floor(Date.now() / 1000)
  const tokenExpirationTime = decodedToken.exp || 300

  const totalExpirationTime = tokenExpirationTime - now
  return totalExpirationTime
}
