import Link from 'next/link'
import { Grid2X2, Layers, Send } from 'lucide-react'

const stats = [
  { label: 'Carruseles generados', value: '0',  sub: 'este mes' },
  { label: 'Arquetipos activos',   value: '3',  sub: 'disponibles' },
  { label: 'Posts publicados',     value: '0',  sub: 'en Instagram' },
]

export default function Dashboard() {
  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">
          Dashboard
        </p>
        <h1 className="text-2xl font-brand font-bold text-text">
          Bienvenido, Santiago.
        </h1>
        <p className="text-sm text-muted mt-1">
          Crea y gestiona el contenido de Instagram de NODO ONE.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, sub }) => (
          <div
            key={label}
            className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-5"
          >
            <p className="text-3xl font-brand font-bold text-text">{value}</p>
            <p className="text-xs font-semibold text-text mt-1">{label}</p>
            <p className="text-[11px] text-muted">{sub}</p>
          </div>
        ))}
      </div>

      {/* Quick action */}
      <div className="bg-sidebar rounded-2xl p-6 flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-white font-brand">
            Crear nuevo carrusel
          </p>
          <p className="text-xs text-[#9CA3AF] mt-0.5">
            Dale una idea al agente y él genera el copy completo.
          </p>
        </div>
        <Link
          href="/carruseles/nuevo"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
        >
          Empezar <Send size={14} />
        </Link>
      </div>

      {/* Arquetipos disponibles */}
      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-4">
          Arquetipos disponibles
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { name: 'Mito vs Realidad', icon: <Layers size={16} />, status: 'Listo' },
            { name: 'Lista educativa',  icon: <Grid2X2 size={16} />, status: 'Listo' },
            { name: 'Testimonial',      icon: <Grid2X2 size={16} />, status: 'Listo' },
          ].map(({ name, icon, status }) => (
            <div key={name} className="border border-border rounded-xl p-4">
              <div className="w-8 h-8 rounded-lg bg-lima/15 flex items-center justify-center text-lima mb-3">
                {icon}
              </div>
              <p className="text-sm font-medium text-text">{name}</p>
              <span className="inline-block mt-1 text-[11px] bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
