import { SlidePortada, SlideMito, SlideRealidad, SlideCTA, SlideItem, SlideDato, SlideComparacion } from '@/types/carousel'

const C = {
  crema:   '#F5F1EA',
  navy:    '#1a1830',
  magenta: '#c026a8',
  purpura: '#7c3aed',
  lima:    '#C8F135',
  gray:    '#6a6580',
}

const SLIDE_W = 1080
const SLIDE_H = 1350

const baseSlide: React.CSSProperties = {
  width: SLIDE_W,
  height: SLIDE_H,
  position: 'relative',
  overflow: 'hidden',
  fontFamily: "'Inter', sans-serif",
  boxSizing: 'border-box',
}

// Auto-scales font size based on text length. Override with _fs.
function autoFs(text: string, base: number, targetChars: number, min: number, override?: number): number {
  if (override != null) return Math.max(min, override)
  if (!text) return base
  return Math.max(min, Math.floor(base * Math.min(1, targetChars / Math.max(text.length, 1))))
}

function Lockup({ dark, counter }: { dark?: boolean; counter: string }) {
  return (
    <div style={{
      position: 'absolute', bottom: 60, left: 80, right: 80,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingTop: 22,
      borderTop: `1px solid ${dark ? 'rgba(245,241,234,0.2)' : 'rgba(26,24,48,0.15)'}`,
    }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 32, color: dark ? C.crema : C.navy, letterSpacing: -0.5 }}>
        nodo<sup style={{ fontSize: 16, fontWeight: 500, color: dark ? 'rgba(245,241,234,0.5)' : C.gray, marginLeft: 2 }}>one</sup>
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: dark ? 'rgba(245,241,234,0.6)' : C.gray, letterSpacing: 1 }}>
        {counter}
      </span>
    </div>
  )
}

function Dots({ dark }: { dark?: boolean }) {
  return (
    <div style={{ position: 'absolute', top: 50, left: 60, display: 'flex', gap: 8 }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{ width: 18, height: 18, borderRadius: 4, background: dark ? 'rgba(245,241,234,0.15)' : 'rgba(26,24,48,0.12)', display: 'block' }} />
      ))}
    </div>
  )
}

function BgLines({ dark }: { dark?: boolean }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none',
      backgroundImage: `linear-gradient(90deg, ${dark ? 'rgba(245,241,234,0.06)' : 'rgba(26,24,48,0.04)'} 1px, transparent 1px)`,
      backgroundSize: '180px 100%',
    }} />
  )
}

function boldParts(text: string, bold: string, boldColor: string) {
  if (!bold || !text.includes(bold)) return [text]
  const parts = text.replace(bold, `__B__${bold}__B__`).split('__B__')
  return parts.map((p, i) =>
    i % 2 === 0 ? p : <strong key={i} style={{ color: boldColor, fontWeight: 600 }}>{p}</strong>
  )
}

// ── Portada ────────────────────────────────────────────────────
// Layout: [num HUGE] [titulo_pre LARGE] form one hero line that reads together.
// Supporting lines (titulo_post, titulo_lima) complete the sentence below.
// titulo_tachado is optional — only shown when non-empty (mito-realidad portadas).
export function SlidePortadaComp({ data }: { data: SlidePortada }) {
  const numSize  = autoFs(data.big_num, 220, 2, 80, data._fs?.num)
  const preSize  = autoFs(data.titulo_pre, Math.floor(numSize * 0.52), 8, 40, data._fs?.titulo_pre)
  const restTotal = (data.titulo_tachado + data.titulo_post + data.titulo_lima).length
  const restSize = autoFs('x'.repeat(restTotal), 70, 36, 38, data._fs?.titulo)

  return (
    <div style={{ ...baseSlide, background: C.crema, padding: '110px 80px 140px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <BgLines />
      <Dots />

      {/* Eyebrow */}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, letterSpacing: 3, color: C.magenta, textTransform: 'uppercase', marginBottom: 28, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {data.eyebrow}
      </div>

      {/* Hero line: big_num + titulo_pre read as one unit */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap', marginBottom: 12, overflow: 'hidden' }}>
        <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: numSize, lineHeight: 0.88, color: C.navy, letterSpacing: -8 }}>
          {data.big_num}
        </span>
        {data.titulo_pre && (
          <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: preSize, lineHeight: 1, color: C.navy, letterSpacing: -2 }}>
            {data.titulo_pre}
          </span>
        )}
      </div>

      {/* Supporting lines */}
      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: restSize, lineHeight: 1.1, color: C.navy, letterSpacing: -1.5, overflow: 'hidden', maxHeight: 340 }}>
        {data.titulo_tachado ? (
          <>
            <span style={{ textDecoration: 'line-through', textDecorationColor: C.magenta, textDecorationThickness: 4 }}>
              {data.titulo_tachado}
            </span>{' '}
          </>
        ) : null}
        {data.titulo_post && <span>{data.titulo_post} </span>}
        {data.titulo_lima && <span style={{ color: C.lima }}>{data.titulo_lima}</span>}
      </div>

      <Lockup counter="DESLIZA →" />
    </div>
  )
}

// ── Mito ───────────────────────────────────────────────────────
export function SlideMitoComp({ data, slideNum, totalSlides }: { data: SlideMito; slideNum: number; totalSlides: number }) {
  const titleTotal = (data.tachado + ' ' + data.continuacion).length
  const titleSize = autoFs('x'.repeat(titleTotal), 130, 28, 56, data._fs?.titulo)

  return (
    <div style={{ ...baseSlide, background: C.crema, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.magenta }} />
      <BgLines />
      <Dots />

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, letterSpacing: 4, color: C.magenta, textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 42, height: 42, borderRadius: '50%', background: C.magenta, color: C.crema, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22, flexShrink: 0 }}>✕</span>
        Mito · {String(data.numero).padStart(2, '0')} / {String(data.total).padStart(2, '0')}
      </div>

      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: titleSize, lineHeight: 1.0, color: C.navy, letterSpacing: -2, overflow: 'hidden', maxHeight: 420 }}>
        <span style={{ position: 'relative', display: 'inline' }}>
          {data.tachado}
          <span style={{ position: 'absolute', top: '50%', left: -4, right: -4, height: 7, background: C.magenta, transform: 'translateY(-50%) rotate(-1.5deg)', display: 'block', pointerEvents: 'none' }} />
        </span>
        {' '}{data.continuacion}
      </div>

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, color: C.gray, lineHeight: 1.5, marginTop: 36, maxWidth: '90%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {boldParts(data.contexto, data.contexto_negrita, C.magenta)}
      </div>

      <Lockup counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

// ── Realidad ───────────────────────────────────────────────────
export function SlideRealidadComp({ data, slideNum, totalSlides }: { data: SlideRealidad; slideNum: number; totalSlides: number }) {
  const titleTotal = (data.titulo + ' ' + data.destacado + ' ' + data.titulo_post).length
  const titleSize = autoFs('x'.repeat(titleTotal), 120, 30, 52, data._fs?.titulo)

  return (
    <div style={{ ...baseSlide, background: C.navy, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.lima }} />
      <BgLines dark />
      <Dots dark />

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, letterSpacing: 4, color: C.lima, textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ width: 42, height: 42, borderRadius: '50%', background: C.lima, color: C.navy, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, flexShrink: 0 }}>✓</span>
        Realidad · {String(data.numero).padStart(2, '0')} / {String(data.total).padStart(2, '0')}
      </div>

      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: titleSize, lineHeight: 1.05, color: C.crema, letterSpacing: -2, overflow: 'hidden', maxHeight: 440 }}>
        {data.titulo}{' '}
        <span style={{ background: 'linear-gradient(135deg, #c026a8 0%, #7c3aed 100%)', color: C.crema, padding: '2px 14px', borderRadius: 8 }}>
          {data.destacado}
        </span>{' '}
        {data.titulo_post}
      </div>

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, color: 'rgba(245,241,234,0.85)', lineHeight: 1.5, marginTop: 36, maxWidth: '90%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {boldParts(data.contexto, data.contexto_negrita, C.lima)}
      </div>

      <Lockup dark counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

// ── CTA ────────────────────────────────────────────────────────
export function SlideCTAComp({ data, totalSlides }: { data: SlideCTA; totalSlides: number }) {
  const palabraSize = autoFs(data.palabra, 180, 7, 60, data._fs?.palabra)

  return (
    <div style={{ ...baseSlide, background: C.navy, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', overflow: 'hidden' }}>
      <BgLines dark />
      <Dots dark />
      <div style={{ width: '100%' }}>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 20, letterSpacing: 3, textTransform: 'uppercase', color: C.lima, marginBottom: 14, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {data.eyebrow}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 26, color: 'rgba(245,241,234,0.65)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 10 }}>
          {data.label}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: palabraSize, lineHeight: 0.92, letterSpacing: -3, color: C.crema, overflow: 'hidden', width: '100%' }}>
          <span style={{ background: `linear-gradient(180deg, transparent 76%, ${C.lima} 76%, ${C.lima} 93%, transparent 93%)`, padding: '0 12px', display: 'inline-block', maxWidth: '100%' }}>
            {data.palabra}
          </span>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 26, color: 'rgba(245,241,234,0.80)', marginTop: 32, lineHeight: 1.45, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {data.subtext}
        </div>
      </div>
      <Lockup dark counter={`${String(totalSlides).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

// ── Item (Lista / Pasos) ───────────────────────────────────────
export function SlideItemComp({ data, slideNum, totalSlides }: { data: SlideItem; slideNum: number; totalSlides: number }) {
  const titleSize = autoFs(data.titulo, 100, 20, 48, data._fs?.titulo)

  return (
    <div style={{ ...baseSlide, background: C.crema, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.magenta }} />
      <BgLines />
      <Dots />

      <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, marginBottom: 32, overflow: 'hidden' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 160, lineHeight: 1, color: 'transparent', WebkitTextStroke: `3px ${C.magenta}`, letterSpacing: -6, flexShrink: 0 }}>
          {String(data.numero).padStart(2, '0')}
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: 4, color: C.gray, textTransform: 'uppercase', paddingBottom: 8 }}>
          de {String(data.total).padStart(2, '0')}
        </div>
      </div>

      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: titleSize, lineHeight: 1.05, color: C.navy, letterSpacing: -1.5, overflow: 'hidden', maxHeight: 360 }}>
        {data.titulo}
      </div>

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, color: C.gray, lineHeight: 1.5, marginTop: 32, maxWidth: '90%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {boldParts(data.descripcion, data.descripcion_negrita, C.magenta)}
      </div>

      <Lockup counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

// ── Dato Impacto ───────────────────────────────────────────────
export function SlideDatoComp({ data, slideNum, totalSlides }: { data: SlideDato; slideNum: number; totalSlides: number }) {
  const statSize = autoFs(data.stat, 260, 4, 100, data._fs?.stat)
  const labelSize = autoFs(data.stat_label, 44, 28, 28, data._fs?.label)

  return (
    <div style={{ ...baseSlide, background: C.navy, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.lima }} />
      <BgLines dark />
      <Dots dark />

      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: 4, color: 'rgba(245,241,234,0.4)', textTransform: 'uppercase', marginBottom: 12, overflow: 'hidden', whiteSpace: 'nowrap' }}>
        Dato · {String(data.numero).padStart(2, '0')} / {String(data.total).padStart(2, '0')}
      </div>

      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: statSize, lineHeight: 0.9, letterSpacing: -6, background: `linear-gradient(135deg, ${C.lima} 0%, #a8e020 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', overflow: 'hidden', maxHeight: 280 }}>
        {data.stat}
      </div>

      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: labelSize, color: C.crema, lineHeight: 1.2, marginTop: 12, maxWidth: '85%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
        {data.stat_label}
      </div>

      <div style={{ width: 70, height: 3, background: C.lima, marginTop: 40, marginBottom: 28, borderRadius: 2, flexShrink: 0 }} />

      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, color: 'rgba(245,241,234,0.75)', lineHeight: 1.5, maxWidth: '88%', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical' }}>
        {boldParts(data.contexto, data.contexto_negrita, C.lima)}
      </div>

      <Lockup dark counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

// ── Comparacion (Antes / Después) ──────────────────────────────
export function SlideComparacionComp({ data, slideNum, totalSlides }: { data: SlideComparacion; slideNum: number; totalSlides: number }) {
  const sizeA = autoFs(data.texto_a, 72, 35, 38, data._fs?.texto_a)
  const sizeB = autoFs(data.texto_b, 72, 35, 38, data._fs?.texto_b)
  const diffSize = autoFs(data.diferencia, 38, 20, 24, data._fs?.diferencia)

  return (
    <div style={{ ...baseSlide, background: C.crema, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <BgLines />
      <Dots />

      <div style={{ flex: 1, background: C.navy, padding: '120px 80px 70px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative' }}>
        <BgLines dark />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: 5, color: 'rgba(245,241,234,0.4)', textTransform: 'uppercase', marginBottom: 14 }}>
          {data.label_a}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: sizeA, lineHeight: 1.1, color: C.crema, letterSpacing: -1.5, overflow: 'hidden', maxHeight: 240 }}>
          {data.texto_a}
        </div>
      </div>

      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 10,
        background: `linear-gradient(135deg, ${C.magenta} 0%, ${C.purpura} 100%)`,
        borderRadius: 60, padding: '16px 44px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.40)',
        maxWidth: '80%', textAlign: 'center',
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: diffSize, color: '#fff', letterSpacing: -0.5, whiteSpace: 'nowrap' }}>
          {data.diferencia}
        </span>
      </div>

      <div style={{ flex: 1, background: C.crema, padding: '70px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, letterSpacing: 5, color: C.magenta, textTransform: 'uppercase', marginBottom: 14 }}>
          {data.label_b}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: sizeB, lineHeight: 1.1, color: C.navy, letterSpacing: -1.5, overflow: 'hidden', maxHeight: 240 }}>
          {data.texto_b}
        </div>
      </div>

      <Lockup counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}
