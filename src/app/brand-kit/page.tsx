const palette = [
  { name: 'Navy',    hex: '#1a1830', usage: '20–25% del feed' },
  { name: 'Crema',   hex: '#F5F1EA', usage: '60% del feed' },
  { name: 'Arena',   hex: '#ECE6DA', usage: '10–15% testimoniales' },
  { name: 'Púrpura', hex: '#7c3aed', usage: '5% impact' },
  { name: 'Magenta', hex: '#c026a8', usage: 'Mitos / acento' },
  { name: 'Lima',    hex: '#C8F135', usage: 'Realidad / CTA' },
]

const typo = [
  { role: 'Display', font: 'Fraunces Variable', use: 'Títulos grandes, quotes' },
  { role: 'Body',    font: 'Inter',              use: 'Texto corrido, contexto' },
  { role: 'Eyebrow', font: 'JetBrains Mono',    use: 'Labels, contadores' },
  { role: 'Logo',    font: 'Syne',               use: 'Marca NODO ONE' },
]

export default function BrandKit() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">
          Sistema
        </p>
        <h1 className="text-2xl font-brand font-bold text-text">Brand Kit IG</h1>
        <p className="text-sm text-muted mt-1">
          Paleta, tipografía y modos de color del feed NODO.
        </p>
      </div>

      {/* Paleta */}
      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 mb-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-4">Paleta</p>
        <div className="grid grid-cols-3 gap-3">
          {palette.map(({ name, hex, usage }) => (
            <div key={name} className="rounded-xl overflow-hidden border border-border">
              <div className="h-14" style={{ background: hex }} />
              <div className="p-3">
                <p className="text-sm font-semibold text-text">{name}</p>
                <p className="text-xs font-mono text-muted">{hex}</p>
                <p className="text-[11px] text-muted mt-0.5">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tipografía */}
      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-4">Tipografía</p>
        <div className="divide-y divide-border">
          {typo.map(({ role, font, use }) => (
            <div key={role} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-text">{font}</p>
                <p className="text-xs text-muted">{use}</p>
              </div>
              <span className="text-xs font-mono text-muted bg-surface px-2 py-1 rounded-lg border border-border">
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
