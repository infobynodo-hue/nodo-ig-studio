'use client'

import { useState } from 'react'
import { Sparkles, Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { CarouselData } from '@/types/carousel'
import CarouselPreview from '@/components/CarouselPreview'

const TONOS = ['Directo', 'Educativo', 'Polémico']

type State = 'brief' | 'generating' | 'preview'

export default function NuevoCarrusel() {
  const [state, setState] = useState<State>('brief')
  const [idea, setIdea] = useState('')
  const [tono, setTono] = useState('Directo')
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
        body: JSON.stringify({ idea, tono }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al generar')
      setResult(data)
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
        <p className="text-sm font-semibold text-text">Generando copy con IA...</p>
        <p className="text-xs text-muted">El agente está leyendo el contexto de NODO y escribiendo los 8 slides.</p>
      </div>
    )
  }

  if (state === 'preview' && result) {
    return (
      <div className="p-8">
        <button
          onClick={() => setState('brief')}
          className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-6"
        >
          <ArrowLeft size={15} /> Volver al brief
        </button>
        <CarouselPreview data={result} />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <Link href="/carruseles" className="flex items-center gap-2 text-sm text-muted hover:text-text transition-colors mb-4">
          <ArrowLeft size={15} /> Carruseles
        </Link>
        <p className="text-xs font-semibold uppercase tracking-widest text-indigo mb-1">
          Nuevo carrusel
        </p>
        <h1 className="text-2xl font-brand font-bold text-text">¿De qué va el post?</h1>
        <p className="text-sm text-muted mt-1">
          Dale una idea al agente. Él escribe los 8 slides completos.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border shadow-[0_2px_12px_rgba(0,0,0,0.06)] p-6 space-y-6">
        {/* Idea */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
            Tu idea
          </label>
          <textarea
            rows={4}
            value={idea}
            onChange={e => setIdea(e.target.value)}
            placeholder="Ej: los dueños de negocio creen que la IA es solo para grandes empresas..."
            className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-text placeholder-muted
              outline-none focus:border-[#C8F135] focus:ring-2 focus:ring-[#C8F135]/15 resize-none transition-all"
          />
        </div>

        {/* Tono */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">
            Tono
          </label>
          <div className="flex gap-2">
            {TONOS.map(t => (
              <button
                key={t}
                onClick={() => setTono(t)}
                className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                  tono === t
                    ? 'border-[#C8F135] bg-lima/10 text-text font-medium'
                    : 'border-border text-muted hover:border-[#C8F135] hover:bg-lima/5'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <button
          onClick={generate}
          disabled={!idea.trim()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Sparkles size={16} />
          Generar con IA
        </button>
      </div>
    </div>
  )
}
