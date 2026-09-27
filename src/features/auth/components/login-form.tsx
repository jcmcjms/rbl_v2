import { CircleNotch, GithubLogo } from "@phosphor-icons/react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "../hooks/use-login"

interface LoginFormProps {
  className?: string
  onSuccess: () => void
}

export function LoginForm({ className, onSuccess }: LoginFormProps) {
  const {
    email,
    password,
    fieldErrors,
    formError,
    isSubmitting,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
    startGithubLogin,
  } = useLogin(onSuccess)

  return (
    <form noValidate onSubmit={handleSubmit} className={cn("grid gap-5", className)}>
      <div className="grid gap-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>

      {formError && (
        <p role="alert" className="text-xs text-destructive">
          {formError}
        </p>
      )}

      <fieldset disabled={isSubmitting} className="grid gap-4 border-0 p-0 m-0 min-w-0">
        <div className="grid gap-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            placeholder="m@example.com"
            autoComplete="username"
            value={email}
            onChange={(event) => handleEmailChange(event.target.value)}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
          />
          {fieldErrors.email && (
            <p id="login-email-error" className="text-xs text-destructive">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Button asChild variant="link" size="xs" className="px-0">
              <a href="/forgot-password">Forgot your password?</a>
            </Button>
          </div>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => handlePasswordChange(event.target.value)}
            aria-invalid={fieldErrors.password ? true : undefined}
            aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
          />
          {fieldErrors.password && (
            <p id="login-password-error" className="text-xs text-destructive">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          {isSubmitting && <CircleNotch className="animate-spin" />}
          {isSubmitting ? "Signing in…" : "Login"}
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
          Or continue with
          <span aria-hidden="true" className="h-px flex-1 bg-border" />
        </div>

        <Button type="button" variant="outline" className="w-full" onClick={startGithubLogin}>
          <GithubLogo weight="fill" />
          Login with GitHub
        </Button>
      </fieldset>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account? Accounts are provisioned by your administrator.
      </p>
    </form>
  )
}