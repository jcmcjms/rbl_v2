import { getAccessToken } from "@/lib/session/session-store"

const API_BASE_URL: string = import.meta.env.VITE_API_BASE_URL ?? "/api"

const REQUEST_TIMEOUT_MS = 15_000

interface ProblemDetails {
  title?: string
  detail?: string
  errors?: Record<string, string[]>
}

export class ApiError extends Error {
  readonly status: number
  readonly title: string
  readonly validationErrors: Record<string, string[]>

  constructor(status: number, title: string, detail?: string, validationErrors: Record<string, string[]> = {}) {
    super(detail ?? title)
    this.name = "ApiError"
    this.status = status
    this.title = title
    this.validationErrors = validationErrors
  }
}

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`
}

export async function postJson<TResponse>(path: string, body: unknown): Promise<TResponse> {
  const token = getAccessToken()

  const response = await fetch(apiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include",
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })

  if (!response.ok) {
    throw await toApiError(response)
  }

  return (await response.json()) as TResponse
}

async function toApiError(response: Response): Promise<ApiError> {
  let problem: ProblemDetails | null = null
  try {
    problem = (await response.json()) as ProblemDetails
  } catch {
    // Non-JSON body (proxy/502 HTML): fall back to the status line.
  }

  return new ApiError(
    response.status,
    problem?.title ?? response.statusText,
    problem?.detail,
    problem?.errors ?? {}
  )
}