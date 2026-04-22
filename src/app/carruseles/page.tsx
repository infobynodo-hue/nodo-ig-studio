'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Grid2X2, Clock, FileCheck } from 'lucide-react'

type CarouselRow = {
  id: string
  created_at: string
  tema: string
  status: 'draft' | 'published'
  tono: string | null
}

export default function Carruseles() {
  const [rows, setRows] = useState<CarouselRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/carousels')
      .then(r => r.json())
      .then(data => { setRows(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">Contenido</p>
          <h1 className="text-2xl font-brand font-bold text-text">Carruseles</h1>
        </div>
        <Link href="/carruseles/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
        >
          <Plus size={16} /> Nuevo carrusel
        </Link>
      </div>

      {loading ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <p className="text-sm text-muted">Cargando...</p>
        </div>
      ) : rows.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-16 text-center">
          <div className="w-12 h-12 rounded-2xl bg-lima/10 flex items-center justify-center mx-auto mb-4">
            <Grid2X2 size={22} className="text-lima" />
          </div>
          <p className="text-text font-semibold mb-1">Aún no hay carruseles</p>
          <p className="text-sm text-muted mb-5">Crea el primero con el agente de IA.</p>
          <Link href="/carruseles/nuevo"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
          >
            <Plus size={15} /> Crear carrusel
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {rows.map(row => (
            <Link key={row.id} href={`/carruseles/${row.id}`}
              className="bg-card border border-border rounded-2xl p-5 flex items-center justify-between hover:border-[#C8F135]/50 hover:shadow-[0_2px_16px_rgba(200,241,53,0.08)] transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-lima/10 flex items-center justify-center shrink-0">
                  <Grid2X2 size={18} className="text-lima" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-text group-hover:text-indigo transition-colors">{row.tema}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(row.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    {row.tono && <span className="text-xs text-muted">· {row.tono}</span>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border font-medium ${
                  row.status === 'published'
                    ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-700 border-amber-500/20'
                }`}>
                  {row.status === 'published' ? <><FileCheck size={10} /> Publicado</> : <><Clock size={10} /> Borrador</>}
                </span>
                <span className="text-muted text-sm group-hover:text-text transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
