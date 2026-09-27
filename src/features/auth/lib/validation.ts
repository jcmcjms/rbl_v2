import type { LoginCredentials, LoginFieldErrors } from "../types"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateLoginCredentials(credentials: LoginCredentials): LoginFieldErrors {
  const errors: LoginFieldErrors = {}

  if (credentials.email.length === 0) {
    errors.email = "Email is required."
  } else if (!EMAIL_PATTERN.test(credentials.email)) {
    errors.email = "Enter a valid email address."
  }

  if (credentials.password.length === 0) {
    errors.password = "Password is required."
  }

  return errors
}