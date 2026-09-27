export function LoginSidePanel() {
  return (
    <div aria-hidden="true" className="relative hidden overflow-hidden bg-muted lg:block">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 420 420"
          fill="none"
          stroke="currentColor"
          className="size-[420px] text-border"
        >
          <circle cx="210" cy="210" r="105" />
          <line x1="210" y1="0" x2="210" y2="420" />
          <line x1="0" y1="210" x2="420" y2="210" />
          <line x1="62" y1="62" x2="358" y2="358" />
          <line x1="358" y1="62" x2="62" y2="358" />
        </svg>
        <span className="absolute flex size-24 items-center justify-center rounded-full border border-border bg-background/70 text-muted-foreground">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-8">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="9" cy="10" r="1.5" />
            <path d="m21 16-4.5-4.5L9 19" />
          </svg>
        </span>
      </div>
    </div>
  )
}