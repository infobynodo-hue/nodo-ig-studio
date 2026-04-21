import Link from 'next/link'

const stats = [
  { label: 'Carruseles generados', value: '0' },
  { label: 'Arquetipos disponibles', value: '3' },
  { label: 'Posts publicados', value: '0' },
]

export default function Dashboard() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-10">
        <p className="text-xs font-mono tracking-widest text-white/30 uppercase mb-2">Dashboard</p>
        <h1 className="text-3xl font-bold tracking-tight text-crema">Bienvenido, Santiago.</h1>
        <p className="text-white/50 mt-1 text-sm">Crea contenido para Instagram de NODO ONE.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {stats.map(({ label, value }) => (
          <div key={label} className="bg-[#12111f] border border-white/8 rounded-2xl p-5">
            <p className="text-3xl font-bold text-crema">{value}</p>
            <p className="text-xs text-white/40 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Quick action */}
      <div className="bg-purpura/10 border border-purpura/25 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-crema">Crear nuevo carrusel</p>
          <p className="text-xs text-white/40 mt-0.5">Dale una idea al agente y él genera el copy.</p>
        </div>
        <Link
          href="/carruseles/nuevo"
          className="bg-purpura hover:bg-purpura/80 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
        >
          Empezar →
        </Link>
      </div>
    </div>
  )
}
