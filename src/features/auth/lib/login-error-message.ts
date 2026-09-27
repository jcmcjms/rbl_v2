import { ApiError } from "@/lib/http/api-client"

export function getLoginErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
      case 403:
        return "Invalid email or password."
      case 423:
        return "This account is locked. Contact your administrator."
      case 429:
        return "Too many login attempts. Wait a few minutes and try again."
      default:
        return "Something went wrong while signing you in. Try again."
    }
  }

  if (error instanceof DOMException && (error.name === "TimeoutError" || error.name === "AbortError")) {
    return "The sign-in service took too long to respond. Try again."
  }

  if (error instanceof TypeError) {
    return "Unable to reach the sign-in service. Check your connection."
  }

  return "Something went wrong while signing you in. Try again."
}