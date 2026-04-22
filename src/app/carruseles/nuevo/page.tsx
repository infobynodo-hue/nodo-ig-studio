'use client'

import { useState } from 'react'
import { Sparkles, Loader2, ArrowLeft, Brain, List, BarChart2, ArrowLeftRight } from 'lucide-react'
import Link from 'next/link'
import { CarouselData } from '@/types/carousel'
import CarouselPreview from '@/components/CarouselPreview'

// ── Arquetipos ─────────────────────────────────────────────────
const ARQUETIPOS = [
  {
    id: 'ia',
    icon: Brain,
    label: 'IA elige',
    desc: 'El agente analiza tu idea y elige el formato más efectivo.',
    lima: true,
  },
  {
    id: 'mito-realidad',
    icon: ArrowLeftRight,
    label: 'Mito vs Realidad',
    desc: 'Destruye creencias falsas con datos reales. Slide tachado + respuesta.',
  },
  {
    id: 'lista',
    icon: List,
    label: 'Lista / Pasos',
    desc: 'N razones, errores o pasos. Cada slide = un punto numerado.',
  },
  {
    id: 'dato',
    icon: BarChart2,
    label: 'Dato Impacto',
    desc: 'Estadísticas que paran el scroll. Número grande + contexto.',
  },
]

// ── Cantidad de slides de contenido ───────────────────────────
const CANTIDADES: Record<string, { value: number; label: string; desc: string }[]> = {
  'ia': [],
  'mito-realidad': [
    { value: 1, label: '1 par',   desc: '4 slides — portada · mito · realidad · CTA' },
    { value: 2, label: '2 pares', desc: '6 slides — portada · ×2 · CTA' },
    { value: 3, label: '3 pares', desc: '8 slides — portada · ×3 · CTA' },
  ],
  'lista': [
    { value: 3, label: '3 puntos', desc: '5 slides — portada · ×3 · CTA' },
    { value: 4, label: '4 puntos', desc: '6 slides — portada · ×4 · CTA' },
    { value: 5, label: '5 puntos', desc: '7 slides — portada · ×5 · CTA' },
  ],
  'dato': [
    { value: 3, label: '3 datos', desc: '5 slides — portada · ×3 · CTA' },
    { value: 4, label: '4 datos', desc: '6 slides — portada · ×4 · CTA' },
    { value: 5, label: '5 datos', desc: '7 slides — portada · ×5 · CTA' },
  ],
  'comparacion': [
    { value: 2, label: '2 comparaciones', desc: '4 slides — portada · ×2 · CTA' },
    { value: 3, label: '3 comparaciones', desc: '5 slides — portada · ×3 · CTA' },
    { value: 4, label: '4 comparaciones', desc: '6 slides — portada · ×4 · CTA' },
  ],
}

const TONOS = ['Directo', 'Educativo', 'Polémico']

type State = 'brief' | 'generating' | 'preview'

export default function NuevoCarrusel() {
  const [state, setState] = useState<State>('brief')
  const [idea, setIdea] = useState('')
  const [tono, setTono] = useState('Directo')
  const [arquetipo, setArquetipo] = useState('ia')
  const [cantidad, setCantidad] = useState(3)
  const [result, setResult] = useState<CarouselData | null>(null)
  const [error, setError] = useState('')
  const [iaRazon, setIaRazon] = useState('')

  const opciones = CANTIDADES[arquetipo] ?? []

  // Cuando cambia el arquetipo, seleccionar la cantidad por defecto
  function selectArquetipo(id: string) {
    setArquetipo(id)
    const opts = CANTIDADES[id]
    if (opts && opts.length > 0) {
      const mid = Math.floor(opts.length / 2)
      setCantidad(opts[mid].value)
    }
  }

  async function generate() {
    if (!idea.trim()) return
    setState('generating')
    setError('')
    setIaRazon('')
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea, tono, arquetipo, cantidad }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error al generar')
      if (data.razon_arquetipo) setIaRazon(data.razon_arquetipo)
      setResult(data)
      setState('preview')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
      setState('brief')
    }
  }

  const totalSlides = arquetipo === 'ia'
    ? '~6-8'
    : arquetipo === 'mito-realidad'
      ? 2 + cantidad * 2
      : 2 + cantidad

  if (state === 'generating') {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 size={32} className="animate-spin text-lima" />
        <p className="text-sm font-semibold text-text">
          {arquetipo === 'ia' ? 'El agente está analizando tu idea y eligiendo el formato...' : `Generando ${totalSlides} slides...`}
        </p>
        <p className="text-xs text-muted">Escribiendo el copy con el contexto de NODO ONE.</p>
      </div>
    )
  }

  if (state === 'preview' && result) {
    return (
      <div className="p-8">
        {iaRazon && (
          <div className="mb-4 flex items-start gap-3 bg-lima/10 border border-lima/30 rounded-xl px-4 py-3">
            <Brain size={15} className="text-lima mt-0.5 shrink-0" />
            <p className="text-xs text-text"><span className="font-semibold text-lima">El agente eligió este formato:</span> {iaRazon}</p>
          </div>
        )}
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

        {/* Arquetipo */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">Formato</label>
          <div className="grid grid-cols-2 gap-2">
            {ARQUETIPOS.map(a => {
              const Icon = a.icon
              const active = arquetipo === a.id
              return (
                <button key={a.id} onClick={() => selectArquetipo(a.id)}
                  className={`flex flex-col items-start gap-1.5 px-4 py-3 rounded-xl border text-left transition-all ${
                    active
                      ? a.lima
                        ? 'border-[#C8F135] bg-lima/10'
                        : 'border-[#C8F135] bg-lima/10'
                      : 'border-border hover:border-[#C8F135]/40'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={14} className={active ? 'text-lima' : 'text-muted'} />
                    <span className={`text-sm font-semibold ${active ? 'text-text' : 'text-muted'}`}>{a.label}</span>
                    {a.lima && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-lima/20 text-lima font-mono uppercase tracking-wider">recomendado</span>}
                  </div>
                  <span className="text-[11px] text-muted leading-snug">{a.desc}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Cantidad — solo si no es IA */}
        {arquetipo !== 'ia' && opciones.length > 0 && (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-indigo mb-2">Número de slides</label>
            <div className="flex flex-col gap-2">
              {opciones.map(p => (
                <button key={p.value} onClick={() => setCantidad(p.value)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm transition-all text-left ${
                    cantidad === p.value ? 'border-[#C8F135] bg-lima/10' : 'border-border hover:border-[#C8F135]/50'
                  }`}
                >
                  <span className={`font-medium ${cantidad === p.value ? 'text-text' : 'text-muted'}`}>{p.label}</span>
                  <span className="text-xs text-muted">{p.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

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
          {arquetipo === 'ia'
            ? 'Generar — el agente elige el formato'
            : `Generar ${totalSlides} slides · ${ARQUETIPOS.find(a => a.id === arquetipo)?.label}`
          }
        </button>
      </div>
    </div>
  )
}
