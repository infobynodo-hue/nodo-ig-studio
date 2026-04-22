'use client'

import { useRef } from 'react'
import { toPng } from 'html-to-image'
import { Download, Loader2 } from 'lucide-react'
import { CarouselData, Slide } from '@/types/carousel'
import { SlidePortadaComp, SlideMitoComp, SlideRealidadComp, SlideCTAComp } from './slides'

const SCALE = 0.28

function SlideRenderer({ slide, index, total }: { slide: Slide; index: number; total: number }) {
  if (slide.tipo === 'portada') return <SlidePortadaComp data={slide} />
  if (slide.tipo === 'mito') return <SlideMitoComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'realidad') return <SlideRealidadComp data={slide} slideNum={index + 1} totalSlides={total} />
  if (slide.tipo === 'cta') return <SlideCTAComp data={slide} totalSlides={total} />
  return null
}

export default function CarouselPreview({ data }: { data: CarouselData }) {
  const slidesRef = useRef<(HTMLDivElement | null)[]>([])

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

      {/* Slides grid */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {data.slides.map((slide, i) => (
          <div key={i} className="shrink-0 flex flex-col gap-2">
            {/* Slide number */}
            <p className="text-[10px] font-mono text-muted uppercase tracking-widest text-center">
              {String(i + 1).padStart(2, '0')} · {slide.tipo.toUpperCase()}
            </p>

            {/* Slide wrapper (scaled preview) */}
            <div
              ref={el => { slidesRef.current[i] = el }}
              style={{ width: 1080 * SCALE, height: 1350 * SCALE, position: 'relative', borderRadius: 10, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            >
              {/* Full-size slide, scaled down */}
              <div
                data-slide
                style={{
                  width: 1080,
                  height: 1350,
                  transform: `scale(${SCALE})`,
                  transformOrigin: 'top left',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              >
                <SlideRenderer slide={slide} index={i} total={data.slides.length} />
              </div>
            </div>

            {/* Export single */}
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
