import { useState, type FormEvent } from "react"
import { getLoginErrorMessage } from "../lib/login-error-message"
import { validateLoginCredentials } from "../lib/validation"
import { loginWithCredentials, loginWithGithub } from "../services/auth-service"
import type { LoginCredentials, LoginFieldErrors } from "../types"

export function useLogin(onSuccess: () => void) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [isSubmitting, setSubmitting] = useState(false)

  const handleEmailChange = (value: string) => {
    setEmail(value)
    setFieldErrors((previous) => ({ ...previous, email: undefined }))
  }

  const handlePasswordChange = (value: string) => {
    setPassword(value)
    setFieldErrors((previous) => ({ ...previous, password: undefined }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const credentials: LoginCredentials = { email: email.trim(), password }
    const errors = validateLoginCredentials(credentials)
    setFieldErrors(errors)
    setFormError(null)

    if (errors.email || errors.password) {
      return
    }

    setSubmitting(true)
    try {
      await loginWithCredentials(credentials)
      onSuccess()
    } catch (error) {
      setFormError(getLoginErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return {
    email,
    password,
    fieldErrors,
    formError,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    startGithubLogin: loginWithGithub,
  }
}