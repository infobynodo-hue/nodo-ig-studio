import { SlidePortada, SlideMito, SlideRealidad, SlideCTA } from '@/types/carousel'

const C = {
  crema:   '#F5F1EA',
  arena:   '#ECE6DA',
  navy:    '#1a1830',
  navy2:   '#2a2742',
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

function Lockup({ dark, counter }: { dark?: boolean; counter: string }) {
  return (
    <div style={{
      position: 'absolute', bottom: 60, left: 80, right: 80,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      paddingTop: 22,
      borderTop: `1px solid ${dark ? 'rgba(245,241,234,0.2)' : 'rgba(26,24,48,0.15)'}`,
    }}>
      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 32, color: dark ? C.crema : C.navy, letterSpacing: -0.5 }}>
        nodo<sup style={{ fontSize: 16, fontWeight: 500, color: dark ? 'rgba(245,241,234,0.5)' : '#6a6580', marginLeft: 2 }}>one</sup>
      </span>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 20, color: dark ? 'rgba(245,241,234,0.6)' : '#6a6580', letterSpacing: 1 }}>
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

export function SlidePortadaComp({ data }: { data: SlidePortada }) {
  return (
    <div style={{ ...baseSlide, background: C.crema, padding: '110px 80px 90px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <BgLines />
      <Dots />
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 24, letterSpacing: 3, color: C.magenta, textTransform: 'uppercase', marginBottom: 16 }}>
          {data.eyebrow}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 340, lineHeight: 0.85, color: C.navy, letterSpacing: -14, marginTop: 0, marginBottom: 24 }}>
          {data.big_num}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 72, lineHeight: 1, color: C.navy, letterSpacing: -2 }}>
          {data.titulo_pre}{' '}
          <span style={{ textDecoration: 'line-through', textDecorationColor: C.magenta, textDecorationThickness: 6 }}>
            {data.titulo_tachado}
          </span>{' '}
          {data.titulo_post}{' '}
          <span style={{ color: C.lima }}>{data.titulo_lima}</span>
        </div>
      </div>
      <Lockup counter="DESLIZA →" />
    </div>
  )
}

export function SlideMitoComp({ data, slideNum, totalSlides }: { data: SlideMito; slideNum: number; totalSlides: number }) {
  const contexto = data.contexto.replace(
    data.contexto_negrita,
    `__BOLD__${data.contexto_negrita}__BOLD__`
  )
  const parts = contexto.split('__BOLD__')

  return (
    <div style={{ ...baseSlide, background: C.crema, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.magenta }} />
      <BgLines />
      <Dots />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 26, letterSpacing: 4, color: C.magenta, textTransform: 'uppercase', marginBottom: 28 }}>
          <span style={{ width: 46, height: 46, borderRadius: '50%', background: C.magenta, color: C.crema, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 24 }}>✕</span>
          Mito · {String(data.numero).padStart(2, '0')} / {String(data.total).padStart(2, '0')}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 120, lineHeight: 0.96, color: C.navy, letterSpacing: -2.5, position: 'relative', marginBottom: 0 }}>
          <span style={{ display: 'inline-block', position: 'relative' }}>
            {data.tachado}
            <span style={{ position: 'absolute', top: '50%', left: -6, right: -6, height: 8, background: C.magenta, transform: 'translateY(-50%) rotate(-2deg)', display: 'block' }} />
          </span>
          {' '}{data.continuacion}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, color: '#6a6580', lineHeight: 1.45, marginTop: 'auto', paddingTop: 40, maxWidth: '88%' }}>
          {parts.map((p, i) => i % 2 === 0
            ? p
            : <strong key={i} style={{ color: C.magenta, fontWeight: 600 }}>{p}</strong>
          )}
        </div>
      </div>
      <Lockup counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

export function SlideRealidadComp({ data, slideNum, totalSlides }: { data: SlideRealidad; slideNum: number; totalSlides: number }) {
  const contexto = data.contexto.replace(
    data.contexto_negrita,
    `__BOLD__${data.contexto_negrita}__BOLD__`
  )
  const parts = contexto.split('__BOLD__')

  return (
    <div style={{ ...baseSlide, background: C.navy, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, background: C.lima }} />
      <BgLines dark />
      <Dots dark />
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 26, letterSpacing: 4, color: C.lima, textTransform: 'uppercase', marginBottom: 28 }}>
          <span style={{ width: 46, height: 46, borderRadius: '50%', background: C.lima, color: C.navy, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 22 }}>✓</span>
          Realidad · {String(data.numero).padStart(2, '0')} / {String(data.total).padStart(2, '0')}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, fontSize: 110, lineHeight: 1, color: C.crema, letterSpacing: -2, marginBottom: 0 }}>
          {data.titulo}{' '}
          <span style={{ background: 'linear-gradient(135deg, #c026a8 0%, #7c3aed 100%)', color: C.crema, padding: '0 18px', borderRadius: 8, display: 'inline' }}>
            {data.destacado}
          </span>{' '}
          {data.titulo_post}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 32, color: 'rgba(245,241,234,0.85)', lineHeight: 1.45, marginTop: 'auto', paddingTop: 40, maxWidth: '90%' }}>
          {parts.map((p, i) => i % 2 === 0
            ? p
            : <strong key={i} style={{ color: C.lima, fontWeight: 600 }}>{p}</strong>
          )}
        </div>
      </div>
      <Lockup dark counter={`${String(slideNum).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}

export function SlideCTAComp({ data, totalSlides }: { data: SlideCTA; totalSlides: number }) {
  return (
    <div style={{ ...baseSlide, background: C.navy, padding: '110px 80px 200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <BgLines dark />
      <Dots dark />
      <div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 22, letterSpacing: 4, textTransform: 'uppercase', color: C.lima, marginBottom: 16 }}>
          {data.eyebrow}
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 28, color: 'rgba(245,241,234,0.7)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 12 }}>
          {data.label}
        </div>
        <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 800, fontSize: 200, lineHeight: 0.92, letterSpacing: -8, color: C.crema }}>
          <span style={{ background: `linear-gradient(180deg, transparent 76%, ${C.lima} 76%, ${C.lima} 93%, transparent 93%)`, padding: '0 16px' }}>
            {data.palabra}
          </span>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 28, color: 'rgba(245,241,234,0.82)', marginTop: 38, maxWidth: 700, lineHeight: 1.4 }}>
          {data.subtext}
        </div>
      </div>
      <Lockup dark counter={`${String(totalSlides).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`} />
    </div>
  )
}
