/**
 * Access tokens live in module scope only: never localStorage/sessionStorage
 * (persisted tokens survive XSS and device theft). The token dies with the tab;
 * rehydration on boot happens via the httpOnly refresh-cookie endpoint
 * (POST /auth/refresh) once the backend contract lands.
 */
let accessToken: string | null = null

export function getAccessToken(): string | null {
  return accessToken
}

export function setAccessToken(token: string): void {
  accessToken = token
}

export function clearAccessToken(): void {
  accessToken = null
}