interface SpinnerProps {
  label?: string
}

export function Spinner({ label = 'Загрузка...' }: SpinnerProps) {
  return (
    <div role="status" className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-500" />
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  )
}
