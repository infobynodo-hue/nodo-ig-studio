// _fs: manual font-size overrides — keys are field names (e.g. 'titulo', 'stat')
// Values are px sizes. If absent, the component auto-computes the size.
type FS = { _fs?: Record<string, number> }

export type SlidePortada = FS & {
  tipo: 'portada'
  eyebrow: string
  big_num: string
  titulo_pre: string
  titulo_tachado: string
  titulo_post: string
  titulo_lima: string
}

export type SlideMito = FS & {
  tipo: 'mito'
  numero: number
  total: number
  tachado: string
  continuacion: string
  contexto: string
  contexto_negrita: string
}

export type SlideRealidad = FS & {
  tipo: 'realidad'
  numero: number
  total: number
  titulo: string
  destacado: string
  titulo_post: string
  contexto: string
  contexto_negrita: string
}

export type SlideCTA = FS & {
  tipo: 'cta'
  eyebrow: string
  label: string
  palabra: string
  subtext: string
}

export type SlideItem = FS & {
  tipo: 'item'
  numero: number
  total: number
  titulo: string
  descripcion: string
  descripcion_negrita: string
}

export type SlideDato = FS & {
  tipo: 'dato'
  numero: number
  total: number
  stat: string
  stat_label: string
  contexto: string
  contexto_negrita: string
}

export type SlideComparacion = FS & {
  tipo: 'comparacion'
  numero: number
  total: number
  label_a: string
  texto_a: string
  label_b: string
  texto_b: string
  diferencia: string
}

export type Slide =
  | SlidePortada
  | SlideMito
  | SlideRealidad
  | SlideCTA
  | SlideItem
  | SlideDato
  | SlideComparacion

export type CarouselData = {
  tema: string
  slides: Slide[]
  arquetipo?: string
  razon_arquetipo?: string
}
