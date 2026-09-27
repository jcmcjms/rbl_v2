import { AppLogo } from "@/components/app-logo"
import { LoginForm } from "./login-form"
import { LoginSidePanel } from "./login-side-panel"

const POST_LOGIN_PATH = "/"

export function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col p-6 lg:p-10">
        <AppLogo />
        <div className="flex flex-1 items-center justify-center py-12">
          <LoginForm
            className="w-full max-w-sm"
            onSuccess={() => window.location.assign(POST_LOGIN_PATH)}
          />
        </div>
      </div>
      <LoginSidePanel />
    </div>
  )
}