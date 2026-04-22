'use client'

import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download, Save, Check, Sparkles } from 'lucide-react'
import {
  CarouselData, Slide,
  SlidePortada, SlideMito, SlideRealidad, SlideCTA,
  SlideItem, SlideDato, SlideComparacion,
} from '@/types/carousel'
import {
  SlidePortadaComp, SlideMitoComp, SlideRealidadComp, SlideCTAComp,
  SlideItemComp, SlideDatoComp, SlideComparacionComp,
} from './slides'

const SCALE = 0.28

function SlideRenderer({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  if (slide.tipo === 'portada')    return <SlidePortadaComp data={slide} />
  if (slide.tipo === 'mito')       return <SlideMitoComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'realidad')   return <SlideRealidadComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'cta')        return <SlideCTAComp data={slide} totalSlides={total} />
  if (slide.tipo === 'item')       return <SlideItemComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'dato')       return <SlideDatoComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'comparacion') return <SlideComparacionComp data={slide} slideNum={index + 1} totalSlides={total} />
  return null
}

// ── Field helpers ──────────────────────────────────────────────
function Field({ label, value, onChange, multiline }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean
}) {
  const cls = "w-full bg-white border border-border rounded-lg px-3 py-2 text-xs text-text placeholder-muted outline-none focus:border-[#C8F135] focus:ring-1 focus:ring-[#C8F135]/20 resize-none transition-all"
  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-widest text-muted mb-1">{label}</label>
      {multiline
        ? <textarea rows={2} className={cls} value={value} onChange={e => onChange(e.target.value)} />
        : <input className={cls} value={value} onChange={e => onChange(e.target.value)} />
      }
    </div>
  )
}

// ── Slide editors ──────────────────────────────────────────────
function EditorPortada({ slide, onChange }: { slide: SlidePortada; onChange: (s: SlidePortada) => void }) {
  const u = (k: keyof SlidePortada) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Eyebrow" value={slide.eyebrow} onChange={u('eyebrow')} />
      <Field label="Número grande" value={slide.big_num} onChange={u('big_num')} />
      <Field label="Texto antes del tachado" value={slide.titulo_pre} onChange={u('titulo_pre')} />
      <Field label="Texto tachado (magenta)" value={slide.titulo_tachado} onChange={u('titulo_tachado')} />
      <Field label="Texto después del tachado" value={slide.titulo_post} onChange={u('titulo_post')} />
      <Field label="Texto lima (final)" value={slide.titulo_lima} onChange={u('titulo_lima')} />
    </div>
  )
}

function EditorMito({ slide, onChange }: { slide: SlideMito; onChange: (s: SlideMito) => void }) {
  const u = (k: keyof SlideMito) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Frase tachada" value={slide.tachado} onChange={u('tachado')} />
      <Field label="Continuación" value={slide.continuacion} onChange={u('continuacion')} />
      <Field label="Contexto" value={slide.contexto} onChange={u('contexto')} multiline />
      <Field label="Palabra en negrita" value={slide.contexto_negrita} onChange={u('contexto_negrita')} />
    </div>
  )
}

function EditorRealidad({ slide, onChange }: { slide: SlideRealidad; onChange: (s: SlideRealidad) => void }) {
  const u = (k: keyof SlideRealidad) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Título inicio" value={slide.titulo} onChange={u('titulo')} />
      <Field label="Destacado (gradiente)" value={slide.destacado} onChange={u('destacado')} />
      <Field label="Título final" value={slide.titulo_post} onChange={u('titulo_post')} />
      <Field label="Contexto" value={slide.contexto} onChange={u('contexto')} multiline />
      <Field label="Palabra en negrita" value={slide.contexto_negrita} onChange={u('contexto_negrita')} />
    </div>
  )
}

function EditorCTA({ slide, onChange }: { slide: SlideCTA; onChange: (s: SlideCTA) => void }) {
  const u = (k: keyof SlideCTA) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Eyebrow / pregunta" value={slide.eyebrow} onChange={u('eyebrow')} />
      <Field label="Label (ej: Comentá)" value={slide.label} onChange={u('label')} />
      <Field label="Palabra grande" value={slide.palabra} onChange={u('palabra')} />
      <Field label="Subtexto" value={slide.subtext} onChange={u('subtext')} multiline />
    </div>
  )
}

function EditorItem({ slide, onChange }: { slide: SlideItem; onChange: (s: SlideItem) => void }) {
  const u = (k: keyof SlideItem) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Título del punto" value={slide.titulo} onChange={u('titulo')} />
      <Field label="Descripción" value={slide.descripcion} onChange={u('descripcion')} multiline />
      <Field label="Palabra en negrita" value={slide.descripcion_negrita} onChange={u('descripcion_negrita')} />
    </div>
  )
}

function EditorDato({ slide, onChange }: { slide: SlideDato; onChange: (s: SlideDato) => void }) {
  const u = (k: keyof SlideDato) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Estadística (ej: 78%)" value={slide.stat} onChange={u('stat')} />
      <Field label="Qué mide" value={slide.stat_label} onChange={u('stat_label')} />
      <Field label="Contexto" value={slide.contexto} onChange={u('contexto')} multiline />
      <Field label="Palabra en negrita" value={slide.contexto_negrita} onChange={u('contexto_negrita')} />
    </div>
  )
}

function EditorComparacion({ slide, onChange }: { slide: SlideComparacion; onChange: (s: SlideComparacion) => void }) {
  const u = (k: keyof SlideComparacion) => (v: string) => onChange({ ...slide, [k]: v })
  return (
    <div className="space-y-2">
      <Field label="Etiqueta A (ej: SIN NODO)" value={slide.label_a} onChange={u('label_a')} />
      <Field label="Texto A (situación anterior)" value={slide.texto_a} onChange={u('texto_a')} multiline />
      <Field label="Etiqueta B (ej: CON NODO)" value={slide.label_b} onChange={u('label_b')} />
      <Field label="Texto B (situación nueva)" value={slide.texto_b} onChange={u('texto_b')} multiline />
      <Field label="Diferencia clave (centro)" value={slide.diferencia} onChange={u('diferencia')} />
    </div>
  )
}

function SlideEditor({ slide, onChange }: { slide: Slide; onChange: (s: Slide) => void }) {
  if (slide.tipo === 'portada')    return <EditorPortada    slide={slide} onChange={onChange as (s: SlidePortada) => void} />
  if (slide.tipo === 'mito')       return <EditorMito       slide={slide} onChange={onChange as (s: SlideMito) => void} />
  if (slide.tipo === 'realidad')   return <EditorRealidad   slide={slide} onChange={onChange as (s: SlideRealidad) => void} />
  if (slide.tipo === 'cta')        return <EditorCTA        slide={slide} onChange={onChange as (s: SlideCTA) => void} />
  if (slide.tipo === 'item')       return <EditorItem       slide={slide} onChange={onChange as (s: SlideItem) => void} />
  if (slide.tipo === 'dato')       return <EditorDato       slide={slide} onChange={onChange as (s: SlideDato) => void} />
  if (slide.tipo === 'comparacion') return <EditorComparacion slide={slide} onChange={onChange as (s: SlideComparacion) => void} />
  return null
}

// ── Archetype badge label ──────────────────────────────────────
const ARCHETYPE_LABELS: Record<string, string> = {
  'mito-realidad': 'Mito vs Realidad',
  'lista': 'Lista / Pasos',
  'dato': 'Dato Impacto',
  'comparacion': 'Antes / Después',
  'ia': 'IA eligió',
}

// ── Main component ─────────────────────────────────────────────
export default function CarouselPreview({
  data: initial, idea, tono, carouselId,
}: {
  data: CarouselData; idea?: string; tono?: string; carouselId?: string
}) {
  const [data, setData] = useState<CarouselData>(initial)
  const [saved, setSaved] = useState(!!carouselId)
  const [saving, setSaving] = useState(false)
  const [currentId, setCurrentId] = useState<string | undefined>(carouselId)
  const exportRefs = useRef<(HTMLDivElement | null)[]>([])

  function updateSlide(index: number, slide: Slide) {
    const slides = [...data.slides]
    slides[index] = slide
    setData({ ...data, slides })
    setSaved(false)
  }

  async function saveDraft() {
    setSaving(true)
    try {
      if (currentId) {
        await fetch(`/api/carousels/${currentId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slides: data.slides }),
        })
      } else {
        const res = await fetch('/api/carousels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tema: data.tema, slides: data.slides, idea, tono, arquetipo: data.arquetipo }),
        })
        const json = await res.json()
        setCurrentId(json.id)
      }
      setSaved(true)
    } finally {
      setSaving(false)
    }
  }

  async function exportSlide(index: number) {
    const el = exportRefs.current[index]
    if (!el) return
    const png = await toPng(el, { width: 1080, height: 1350, pixelRatio: 1 })
    const a = document.createElement('a')
    a.href = png
    a.download = `nodo-ig-${String(index + 1).padStart(2, '0')}.png`
    a.click()
  }

  async function exportAll() {
    for (let i = 0; i < data.slides.length; i++) {
      await exportSlide(i)
      await new Promise(r => setTimeout(r, 400))
    }
  }

  const archetypeLabel = data.arquetipo ? (ARCHETYPE_LABELS[data.arquetipo] ?? data.arquetipo) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo">Preview</p>
            {archetypeLabel && (
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-lima/15 text-lima border border-lima/30 font-mono uppercase tracking-wider">
                {data.arquetipo === 'ia' && <Sparkles size={9} />}
                {archetypeLabel}
              </span>
            )}
          </div>
          {data.arquetipo === 'ia' && (data as CarouselData & { razon_arquetipo?: string }).razon_arquetipo && (
            <p className="text-[11px] text-muted italic mt-0.5">
              {(data as CarouselData & { razon_arquetipo?: string }).razon_arquetipo}
            </p>
          )}
          <h2 className="text-lg font-brand font-bold text-text mt-0.5">{data.tema}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={saveDraft} disabled={saving || saved}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border ${
              saved ? 'border-emerald-400 text-emerald-700 bg-emerald-50' : 'border-border text-muted hover:text-text bg-card'
            }`}
          >
            {saved ? <><Check size={14} /> Guardado</> : <><Save size={14} /> Guardar borrador</>}
          </button>
          <button onClick={exportAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
          >
            <Download size={15} />
            Exportar todo ({data.slides.length} PNG)
          </button>
        </div>
      </div>

      {/* Slides ocultos a tamaño real — solo para exportar */}
      <div style={{ position: 'fixed', left: -9999, top: 0, pointerEvents: 'none', zIndex: -1 }}>
        {data.slides.map((slide, i) => (
          <div key={i} ref={el => { exportRefs.current[i] = el }} style={{ width: 1080, height: 1350 }}>
            <SlideRenderer slide={slide} index={i} total={data.slides.length} />
          </div>
        ))}
      </div>

      {/* Slides — scroll horizontal */}
      <div className="flex gap-5 overflow-x-auto pb-4">
        {data.slides.map((slide, i) => (
          <div key={i} className="shrink-0 flex flex-col gap-3" style={{ width: 1080 * SCALE }}>
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest text-center">
              {String(i + 1).padStart(2, '0')} · {slide.tipo}
            </p>

            <div style={{ width: 1080 * SCALE, height: 1350 * SCALE, position: 'relative', borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
              <div style={{ width: 1080, height: 1350, transform: `scale(${SCALE})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}>
                <SlideRenderer slide={slide} index={i} total={data.slides.length} />
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <SlideEditor slide={slide} onChange={s => updateSlide(i, s)} />
            </div>

            <button
              onClick={() => exportSlide(i)}
              className="flex items-center justify-center gap-1.5 text-[11px] text-muted hover:text-text transition-colors py-1"
            >
              <Download size={11} /> PNG
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
