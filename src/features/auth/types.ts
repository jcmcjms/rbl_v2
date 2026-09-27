export interface LoginCredentials {
  readonly email: string
  readonly password: string
}

export interface LoginSession {
  readonly accessToken: string
  readonly expiresAt: string
}

export interface LoginFieldErrors {
  email?: string
  password?: string
}