'use client'

import { useState } from 'react'
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CarouselData } from '@/types/carousel'
import CarouselPreview from '@/components/CarouselPreview'

const TONOS = ['Directo', 'Educativo', 'Polémico']
const PARES = [
  { value: 1, label: '1 par',   desc: '4 slides — portada · mito · realidad · CTA' },
  { value: 2, label: '2 pares', desc: '6 slides — portada · ×2 · CTA' },
  { value: 3, label: '3 pares', desc: '8 slides — portada · ×3 · CTA' },
]

type State = 'brief' | 'generating' | 'preview'

export default function NuevoCarrusel() {
  const [state, setState] = useState<State>('brief')
  const [idea, setIdea] = useState('')
  const [tono, setTono] = useState('Directo')
  const [pares, setPares] = useState(3)
  const [result, setResult] = useState<CarouselData | null>(null)
  const [error, setError] = useState('')

  async function generate() {
    if (!idea.trim()) return
    setState('generating')
    setError('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, tono, pares }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al generar')
      setResult({ ...data, _meta: { idea, tono } })
      setState('preview')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
      setState('brief')
    }
  }

  if (state === 'generating') {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={32} className="animate-spin text-lima" />
        <p className="text-sm font-semibold text-text">Generando {2 + pares * 2} slides...</p>
        <p className="text-xs text-muted">El agente está escribiendo el copy con el contexto de NODO.</p>
      </div>
    )
  }

  if (state === 'preview' && result) {
    return (
      <div className="p-8">
        <button onClick={() => setState('brief')} className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-6">
          <ArrowLeft size={15} /> Volver al brief
        </button>
        <CarouselPreview data={result} idea={idea} tono={tono} />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/carruseles" className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft size={15} /> Carruseles
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">Nuevo carrusel</p>
        <h1 className="text-2xl font-brand font-bold text-text">¿De qué va el post?</h1>
        <p className="text-sm text-muted mt-1">Dale una idea al agente. Él escribe todos los slides.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 space-y-6">
        {/* Idea */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">Tu idea</label>
          <textarea
            rows={4} value={idea} onChange={e => setIdea(e.target.value)}
            placeholder="Ej: los dueños de negocio creen que la IA es solo para grandes empresas..."
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted outline-none focus:border-[#C8F135] focus:ring-2 focus:ring-[#C8F135]/15 resize-none transition-all"
          />
        </div>

        {/* Número de slides */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">Número de slides</label>
          <div className="flex flex-col gap-2">
            {PARES.map(p => (
              <button key={p.value} onClick={() => setPares(p.value)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all text-left ${
                  pares === p.value ? 'border-[#C8F135] bg-lima/10' : 'border-border hover:border-[#C8F135]/50'
                }`}
              >
                <span className={`font-medium ${pares === p.value ? 'text-text' : 'text-muted'}`}>{p.label}</span>
                <span className="text-xs text-muted">{p.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tono */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">Tono</label>
          <div className="flex gap-2">
            {TONOS.map(t => (
              <button key={t} onClick={() => setTono(t)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  tono === t ? 'border-[#C8F135] bg-lima/10 text-text font-medium' : 'border-border text-muted hover:border-[#C8F135]/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{error}</p>}

        <button onClick={generate} disabled={!idea.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} />
          Generar {2 + pares * 2} slides con IA
        </button>
      </div>
    </div>
  )
}
