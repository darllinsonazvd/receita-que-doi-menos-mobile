import type { JwtPayload } from 'jwt-decode'

export type JwtDecode = JwtPayload & {
  user_id: string
  user_name: string
}
