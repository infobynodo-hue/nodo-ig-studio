import Link from 'next/link'
import { Plus, Grid2X2 } from 'lucide-react'

export default function Carruseles() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">
            Contenido
          </p>
          <h1 className="text-2xl font-brand font-bold text-text">Carruseles</h1>
        </div>
        <Link
          href="/carruseles/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
        >
          <Plus size={16} /> Nuevo carrusel
        </Link>
      </div>

      {/* Empty state */}
      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-16 text-center">
        <div className="w-12 h-12 rounded-2xl bg-lima/10 flex items-center justify-center mx-auto mb-4">
          <Grid2X2 size={22} className="text-lima" />
        </div>
        <p className="text-text font-semibold mb-1">Aún no hay carruseles</p>
        <p className="text-sm text-muted mb-5">Crea el primero con el agente de IA.</p>
        <Link
          href="/carruseles/nuevo"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
        >
          <Plus size={15} /> Crear carrusel
        </Link>
      </div>
    </div>
  )
}
