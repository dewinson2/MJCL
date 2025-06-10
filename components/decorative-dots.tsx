export function DecorativeDots({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute pointer-events-none opacity-20 ${className}`}>
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-empresa-secondary"
            style={{
              opacity: Math.random() * 0.5 + 0.5,
              transform: `scale(${Math.random() * 0.5 + 0.5})`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
