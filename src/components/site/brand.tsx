export const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-[1.8]">
    <path d="M3 10h13M11 5l5 5-5 5" />
  </svg>
)

export const Wordmark = () => (
  <span className="flex items-center gap-2" aria-label="MOD 12">
    <span className="flex flex-col gap-[3px]" aria-hidden="true">
      <span className="h-[3px] w-7 -skew-x-[28deg] bg-brand" />
      <span className="ml-2 h-[3px] w-5 -skew-x-[28deg] bg-brand" />
      <span className="ml-4 h-[3px] w-3 -skew-x-[28deg] bg-brand" />
    </span>
    <span className="-skew-x-[10deg] text-xl font-bold uppercase leading-none tracking-[-0.09em]">
      MOD<span className="ml-1 text-brand">12</span>
    </span>
  </span>
)

