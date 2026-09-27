import { apiUrl, postJson } from "@/lib/http/api-client"
import { clearAccessToken, setAccessToken } from "@/lib/session/session-store"
import type { LoginCredentials, LoginSession } from "../types"

const AUTH_PATHS = {
  login: "/auth/login",
  logout: "/auth/logout",
  githubLogin: "/auth/login/github",
} as const

export async function loginWithCredentials(credentials: LoginCredentials): Promise<LoginSession> {
  const session = await postJson<LoginSession>(AUTH_PATHS.login, credentials)
  setAccessToken(session.accessToken)
  return session
}

export function loginWithGithub(): void {
  window.location.assign(apiUrl(AUTH_PATHS.githubLogin))
}

export async function logout(): Promise<void> {
  try {
    await postJson<unknown>(AUTH_PATHS.logout, {})
  } catch {
    // Server-side revocation failed; the client session is dropped regardless.
  } finally {
    clearAccessToken()
  }
}