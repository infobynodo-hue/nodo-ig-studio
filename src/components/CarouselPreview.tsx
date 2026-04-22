'use client'

import { useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { Download } from 'lucide-react'
import { CarouselData, Slide, SlidePortada, SlideMito, SlideRealidad, SlideCTA } from '@/types/carousel'
import { SlidePortadaComp, SlideMitoComp, SlideRealidadComp, SlideCTAComp } from './slides'

const SCALE = 0.28

function SlideRenderer({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  if (slide.tipo === 'portada')  return <SlidePortadaComp data={slide} />
  if (slide.tipo === 'mito')     return <SlideMitoComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'realidad') return <SlideRealidadComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'cta')      return <SlideCTAComp data={slide} totalSlides={total} />
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

function SlideEditor({ slide, onChange }: { slide: Slide; onChange: (s: Slide) => void }) {
  if (slide.tipo === 'portada')  return <EditorPortada  slide={slide} onChange={onChange as (s: SlidePortada) => void} />
  if (slide.tipo === 'mito')     return <EditorMito     slide={slide} onChange={onChange as (s: SlideMito) => void} />
  if (slide.tipo === 'realidad') return <EditorRealidad slide={slide} onChange={onChange as (s: SlideRealidad) => void} />
  if (slide.tipo === 'cta')      return <EditorCTA      slide={slide} onChange={onChange as (s: SlideCTA) => void} />
  return null
}

// ── Main component ─────────────────────────────────────────────
export default function CarouselPreview({ data: initial }: { data: CarouselData }) {
  const [data, setData] = useState<CarouselData>(initial)
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])

  function updateSlide(index: number, slide: Slide) {
    const slides = [...data.slides]
    slides[index] = slide
    setData({ ...data, slides })
  }

  async function exportSlide(index: number) {
    const el = slidesRef.current[index]
    if (!el) return
    const child = el.querySelector('[data-slide]') as HTMLElement
    if (!child) return
    const png = await toPng(child, { width: 1080, height: 1350, pixelRatio: 2 })
    const a = document.createElement('a')
    a.href = png
    a.download = `nodo-ig-${String(index + 1).padStart(2, '0')}.png`
    a.click()
  }

  async function exportAll() {
    for (let i = 0; i < data.slides.length; i++) {
      await exportSlide(i)
      await new Promise(r => setTimeout(r, 300))
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo">Preview</p>
          <h2 className="text-lg font-brand font-bold text-text mt-0.5">{data.tema}</h2>
        </div>
        <button
          onClick={exportAll}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-sidebar bg-lima hover:bg-[#D4F53C] transition-colors"
        >
          <Download size={15} />
          Exportar todo ({data.slides.length} slides)
        </button>
      </div>

      {/* Slides — scroll horizontal */}
      <div className="flex gap-5 overflow-x-auto pb-4">
        {data.slides.map((slide, i) => (
          <div key={i} className="shrink-0 flex flex-col gap-3" style={{ width: 1080 * SCALE }}>
            {/* Label */}
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest text-center">
              {String(i + 1).padStart(2, '0')} · {slide.tipo}
            </p>

            {/* Preview */}
            <div
              ref={el => { slidesRef.current[i] = el }}
              style={{ width: 1080 * SCALE, height: 1350 * SCALE, position: 'relative', borderRadius: 10, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
            >
              <div
                data-slide
                style={{ width: 1080, height: 1350, transform: `scale(${SCALE})`, transformOrigin: 'top left', position: 'absolute', top: 0, left: 0 }}
              >
                <SlideRenderer slide={slide} index={i} total={data.slides.length} />
              </div>
            </div>

            {/* Editor */}
            <div className="bg-card border border-border rounded-xl p-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              <SlideEditor slide={slide} onChange={s => updateSlide(i, s)} />
            </div>

            {/* Export */}
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
