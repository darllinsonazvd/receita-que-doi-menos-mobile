import { JwtDecode } from '../types/jwt'

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = require('buffer').Buffer

/**
 * Descriptografar token JWT
 *
 * @author Darllinson Azevedo
 *
 * @param token Token JWT
 */
export function jwtDecode(token: string): JwtDecode {
  const parts = (token || '')
    .split('.')
    .map((part) =>
      Buffer.from(
        part.replace(/-/g, '+').replace(/_/g, '/'),
        'base64',
      ).toString(),
    )
  const jwtPayload: JwtDecode = JSON.parse(parts[1])

  return jwtPayload
}
