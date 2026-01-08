'use client'

export default function DnaIcon({ className = 'w-6 h-6', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Simple DNA helix mark (minimal + readable at small sizes) */}
      <path d="M7 4c4 4 6 6 10 10" />
      <path d="M17 4c-4 4-6 6-10 10" />
      <path d="M7 20c4-4 6-6 10-10" />
      <path d="M17 20c-4-4-6-6-10-10" />
      <path d="M9 8h6" />
      <path d="M9 16h6" />
      <path d="M10 12h4" />
    </svg>
  )
}


