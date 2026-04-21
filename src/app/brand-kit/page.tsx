const palette = [
  { name: 'Navy', hex: '#1a1830', usage: '20–25% del feed' },
  { name: 'Crema', hex: '#F5F1EA', usage: '60% del feed' },
  { name: 'Arena', hex: '#ECE6DA', usage: '10–15% (testimoniales)' },
  { name: 'Púrpura', hex: '#7c3aed', usage: '5% (impact)' },
  { name: 'Magenta', hex: '#c026a8', usage: 'Mitos / acento' },
  { name: 'Lima', hex: '#C8F135', usage: 'Realidad / CTA' },
]

export default function BrandKit() {
  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-10">
        <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-2">Sistema</p>
        <h1 className="text-3xl font-bold tracking-tight text-crema">Brand Kit IG</h1>
        <p className="text-white/50 mt-1 text-sm">Paleta, tipografía y modos de color del feed NODO.</p>
      </div>

      {/* Paleta */}
      <section className="bg-[#12111f] border border-white/8 rounded-2xl p-6 mb-6">
        <h2 className="text-xs font-mono tracking-widest text-white/30 uppercase mb-4">Paleta</h2>
        <div className="grid grid-cols-3 gap-3">
          {palette.map(({ name, hex, usage }) => (
            <div key={name} className="rounded-xl overflow-hidden border border-white/8">
              <div className="h-16" style={{ background: hex }} />
              <div className="p-3 bg-white/3">
                <p className="text-sm font-medium text-crema">{name}</p>
                <p className="text-xs font-mono text-white/30">{hex}</p>
                <p className="text-xs text-white/25 mt-0.5">{usage}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tipografía */}
      <section className="bg-[#12111f] border border-white/8 rounded-2xl p-6">
        <h2 className="text-xs font-mono tracking-widest text-white/30 uppercase mb-4">Tipografía</h2>
        <div className="space-y-3 text-sm">
          {[
            { role: 'Display', font: 'Fraunces Variable', use: 'Títulos grandes, quotes' },
            { role: 'Body', font: 'Inter', use: 'Texto corrido, contexto' },
            { role: 'Eyebrow', font: 'JetBrains Mono', use: 'Labels, contadores, código' },
            { role: 'Logo', font: 'Syne', use: 'Marca NODO ONE' },
          ].map(({ role, font, use }) => (
            <div key={role} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
              <div>
                <p className="text-crema font-medium">{font}</p>
                <p className="text-xs text-white/30">{use}</p>
              </div>
              <span className="text-xs font-mono text-white/25 bg-white/5 px-2 py-1 rounded">{role}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
